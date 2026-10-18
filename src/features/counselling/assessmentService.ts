import { MOCK_COURSES } from '../../services/mocks/courses';
import { Course } from '../../types/course';
import {
  AssessmentAnswers,
  AssessmentQuestion,
  AssessmentResultsData,
  LocalizedString,
} from './assessmentTypes';
import { ASSESSMENT_QUESTIONS } from './assessmentQuestions';

const STORAGE_KEY = 'skillsaathi_assessment_session';

export class AssessmentService {
  /**
   * Returns only questions applicable given the current answers
   */
  getActiveQuestions(answers: AssessmentAnswers): AssessmentQuestion[] {
    return ASSESSMENT_QUESTIONS.filter((q) => {
      if (!q.isApplicable) return true;
      return q.isApplicable(answers);
    });
  }

  /**
   * When an earlier answer changes, remove answers to questions that are no longer applicable
   */
  cleanIrrelevantAnswers(answers: AssessmentAnswers): AssessmentAnswers {
    const activeQuestions = this.getActiveQuestions(answers);
    const activeIds = new Set(activeQuestions.map((q) => q.id));

    const cleaned: AssessmentAnswers = {};
    for (const [key, val] of Object.entries(answers)) {
      if (activeIds.has(key)) {
        cleaned[key] = val;
      }
    }
    return cleaned;
  }

  /**
   * Save assessment progress to session storage
   */
  saveSession(answers: AssessmentAnswers, activeQuestionIndex: number): void {
    if (typeof window === 'undefined') return;
    try {
      const payload = {
        answers,
        activeQuestionIndex,
        updatedAt: Date.now(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage errors handled gracefully
    }
  }

  /**
   * Load saved assessment progress from session storage
   */
  loadSession(): { answers: AssessmentAnswers; activeQuestionIndex: number } | null {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data && typeof data === 'object' && data.answers) {
        return {
          answers: data.answers,
          activeQuestionIndex: typeof data.activeQuestionIndex === 'number' ? data.activeQuestionIndex : 0,
        };
      }
    } catch {
      // Fallback
    }
    return null;
  }

  /**
   * Clear session storage
   */
  clearSession(): void {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  /**
   * Validate if current question's answer is acceptable to advance
   */
  isAnswerValid(question: AssessmentQuestion, answers: AssessmentAnswers): boolean {
    if (!question.required) return true;
    const val = answers[question.id];

    if (val === undefined || val === null) return false;

    if (question.responseType === 'multiple_choice') {
      if (!Array.isArray(val) || val.length === 0) return false;
      if (question.maxSelections && val.length > question.maxSelections) return false;
      return true;
    }

    if (question.responseType === 'single_choice' || question.responseType === 'yes_no_unsure') {
      return typeof val === 'string' && val.trim().length > 0;
    }

    if (question.responseType === 'numeric_range') {
      return typeof val === 'number' && !isNaN(val);
    }

    if (question.responseType === 'rating_scale') {
      return typeof val === 'number' && val >= 1 && val <= 5;
    }

    if (question.responseType === 'free_text') {
      return typeof val === 'string' && val.trim().length > 0;
    }

    return true;
  }

  /**
   * Deterministically transform completed assessment answers into personalized family guidance
   */
  generateResults(answers: AssessmentAnswers): AssessmentResultsData {
    // 1. Participant
    const participantRole = (answers.q_participant as string) || 'joint';

    // 2. Education
    const educationLevel = (answers.q_education as string) || 'completed_10';

    // 3. Technical stream interests
    const interestStreams = Array.isArray(answers.q_interests)
      ? (answers.q_interests as string[]).filter((k) => k !== 'unsure_sector')
      : [];

    // 4. Priorities
    const keyPriorities = Array.isArray(answers.q_priorities) ? (answers.q_priorities as string[]) : [];

    // 5. Confidence
    const confidenceScore = typeof answers.q_confidence === 'number' ? answers.q_confidence : 3;

    // 6. Primary Concern
    const primaryConcernId = (answers.q_concern as string) || 'employment';

    // 7. Concern Deep Dive answer
    let deepDiveAnswer: string | string[] | number | undefined;
    if (primaryConcernId === 'employment') deepDiveAnswer = answers.q_deepdive_employment;
    else if (primaryConcernId === 'earnings') deepDiveAnswer = answers.q_deepdive_earnings;
    else if (primaryConcernId === 'stability') deepDiveAnswer = answers.q_deepdive_stability;
    else if (primaryConcernId === 'social_respect') deepDiveAnswer = answers.q_deepdive_social;
    else if (primaryConcernId === 'recognition') deepDiveAnswer = answers.q_deepdive_recognition;
    else if (primaryConcernId === 'progression') deepDiveAnswer = answers.q_deepdive_progression;
    else if (primaryConcernId === 'affordability') deepDiveAnswer = answers.q_deepdive_affordability;
    else if (primaryConcernId === 'unsure_path' || primaryConcernId === 'other_concern') {
      deepDiveAnswer = answers.q_deepdive_other;
    }

    // 8. Learning style
    const learningStyle = (answers.q_learning_style as string) || 'mostly_hands_on';

    // 9. Environment
    const preferredEnvironments = Array.isArray(answers.q_environment)
      ? (answers.q_environment as string[])
      : ['open_environment'];

    // 10. Further study
    const furtherStudyIntent = (answers.q_progression_importance as string) || 'work_and_study_later';

    // 11. Target course preference
    const targetCourse = (answers.q_target_course as string) || 'not_sure_course';
    const selectedCourseId = targetCourse !== 'not_sure_course' ? targetCourse : undefined;

    // 12. Additional notes
    const additionalNotes = typeof answers.q_additional_notes === 'string' ? answers.q_additional_notes : undefined;

    // 13. Deterministic course matching from MOCK_COURSES
    const matchedCourses: Course[] = [];
    const usedIds = new Set<string>();

    // Priority 1: User explicitly wanted to explore a particular course
    if (selectedCourseId) {
      const explicitCourse = MOCK_COURSES.find((c) => c.id === selectedCourseId);
      if (explicitCourse) {
        matchedCourses.push(explicitCourse);
        usedIds.add(explicitCourse.id);
      }
    }

    // Priority 2: Match selected interest streams
    for (const streamKey of interestStreams) {
      const streamMatches = MOCK_COURSES.filter((c) => c.stream === streamKey && !usedIds.has(c.id));
      for (const m of streamMatches) {
        matchedCourses.push(m);
        usedIds.add(m.id);
      }
    }

    // Priority 3: Match based on preferred work environment (e.g. healthcare, digital)
    if (preferredEnvironments.includes('healthcare_hospital')) {
      const hc = MOCK_COURSES.find((c) => c.stream === 'healthcare' && !usedIds.has(c.id));
      if (hc) {
        matchedCourses.push(hc);
        usedIds.add(hc.id);
      }
    }
    if (preferredEnvironments.includes('office_digital')) {
      const it = MOCK_COURSES.find((c) => c.stream === 'it_tech' && !usedIds.has(c.id));
      if (it) {
        matchedCourses.push(it);
        usedIds.add(it.id);
      }
    }
    if (preferredEnvironments.includes('workshop_plant')) {
      const autoOrCnc = MOCK_COURSES.find(
        (c) => (c.stream === 'automotive' || c.stream === 'manufacturing_engineering') && !usedIds.has(c.id)
      );
      if (autoOrCnc) {
        matchedCourses.push(autoOrCnc);
        usedIds.add(autoOrCnc.id);
      }
    }

    // Fallback: Ensure at least 2 courses are presented from catalogue
    for (const c of MOCK_COURSES) {
      if (matchedCourses.length >= 3) break;
      if (!usedIds.has(c.id)) {
        matchedCourses.push(c);
        usedIds.add(c.id);
      }
    }

    // 14. Discussion Prompts tailored to answers
    const discussionPoints: LocalizedString[] = [];

    // Add prompt balancing quick earning with further study
    if (keyPriorities.includes('job_quickly') || furtherStudyIntent === 'start_earning_asap') {
      discussionPoints.push({
        en: 'Balancing Immediate Income vs. Degree Goals: Discuss whether completing an 6–8 month technical trade allows the student to become self-reliant while keeping lateral entry into a B.Voc degree open after 1 year.',
        mr: 'तातडीचे उत्पन्न आणि पदवीचे ध्येय: ६ ते ८ महिन्यांचे तांत्रिक प्रशिक्षण घेऊन आधी नोकरी सुरू करणे आणि १ वर्षानंतर स्वतःच्या कमाईवर पुढील बी.व्होक पदवी करणे यावर चर्चा करा.',
        hi: 'त्वरित आय बनाम डिग्री का लक्ष्य: चर्चा करें कि क्या 6-8 महीने का तकनीकी कोर्स पूरा करके छात्र आत्मनिर्भर बन सकता है और 1 वर्ष बाद अपनी कमाई से बी.वॉक (B.Voc) डिग्री में प्रवेश ले सकता है।',
      });
    } else {
      discussionPoints.push({
        en: 'Exploring Practical Apprenticeship Options: Evaluate how combining 70% workshop lab training with government NAPS monthly stipends creates direct company job security.',
        mr: 'प्रॅक्टिकल आणि शासकीय अप्रेंटिसशिप: ७०% प्रॅक्टिकल वर्कशॉप आणि शासकीय विद्यावेतन (NAPS) नोकरीची सुरक्षितता कशी देतात हे समजून घ्या.',
        hi: 'प्रैक्टिकल और सरकारी अप्रेंटिसशिप: 70% वर्कशॉप लैब ट्रेनिंग और सरकारी वजीफा (NAPS) सीधे कंपनी में रोजगार सुरक्षा कैसे प्रदान करते हैं, इसे समझें।',
      });
    }

    // Add prompt addressing the specific concern
    if (primaryConcernId === 'earnings') {
      discussionPoints.push({
        en: 'Income Growth Trajectory: Certified technicians typically start at ₹16,000–₹24,000/month, with skilled operators advancing to ₹35,000+ within 3–4 years as they master automation controls.',
        mr: 'पगारवाढीचा आलेख: सुरुवातीचा पगार ₹१६,००० ते ₹२४,००० असला तरी ३-४ वर्षांच्या अनुभवानंतर प्रगत मशिनिंग किंवा ईव्हीमध्ये पगार ₹३५,०००+ पर्यंत वाढतो.',
        hi: 'वेतन वृद्धि का ग्राफ: प्रमाणित तकनीशियन आमतौर पर ₹16,000–₹24,000/माह से शुरू करते हैं और 3–4 वर्षों के अनुभव के साथ स्वचालन व ईवी में वेतन ₹35,000+ तक पहुंच जाता है।',
      });
    } else if (primaryConcernId === 'social_respect') {
      discussionPoints.push({
        en: 'Prestige of Modern Engineering Trades: Highlight to relatives that modern sectors like EV diagnostics and Solar engineering carry high industry demand and professional technical respect.',
        mr: 'आधुनिक तंत्रज्ञानाचा सन्मान: ईव्ही, सोलर किंवा आयटी यांसारख्या आधुनिक तंत्रज्ञानामुळे आज कुशल तंत्रज्ञाला समाजात आणि उद्योगात मोठा मान मिळतो.',
        hi: 'आधुनिक तकनीकों का सम्मान: ईवी डायग्नोस्टिक्स, सोलर और आईटी जैसे आधुनिक क्षेत्रों में आज कुशल तकनीशियनों को उद्योग और समाज में बड़ा सम्मान मिलता है।',
      });
    } else if (primaryConcernId === 'employment') {
      discussionPoints.push({
        en: 'Reviewing Employer MoUs: Look together at the training center’s documented campus placement partners and signed corporate tie-ups before paying any admission fees.',
        mr: 'संस्थेचे प्लेसमेंट रेकॉर्ड: प्रवेश घेण्यापूर्वी प्रशिक्षण केंद्राचे अधिकृत प्लेसमेंट भागीदार आणि कंपन्यांशी झालेले करार तपासा.',
        hi: 'प्लेसमेंट रिकॉर्ड की जांच: प्रवेश लेने से पहले प्रशिक्षण केंद्र के आधिकारिक प्लेसमेंट पार्टनर और कंपनियों से हुए अनुबंधों की समीक्षा करें।',
      });
    } else {
      discussionPoints.push({
        en: 'Shared Decision Checklist: Agree on which 2 factors matter most to both of you (e.g. proximity to home vs. starting stipend) so decisions feel unified.',
        mr: 'एकत्रित निर्णयाची रूपरेषा: घराजवळील केंद्र, फी सवलत किंवा नोकरीची संधी यांपैकी कोणत्या दोन बाबी दोघांसाठी महत्त्वाच्या आहेत हे ठरवा.',
        hi: 'संयुक्त निर्णय चेकलिस्ट: घर से दूरी, फीस छूट या शुरुआती वजीफा — तय करें कि दोनों के लिए कौन से 2 कारक सबसे महत्वपूर्ण हैं ताकि निर्णय सर्वसम्मत हो।',
      });
    }

    discussionPoints.push({
      en: 'Visiting a Training Center Together: Schedule an in-person visit to a nearby ITI or NSDC training hub to observe the workshop equipment, tools, and batch instructors firsthand.',
      mr: 'प्रशिक्षण केंद्राला प्रत्यक्ष भेट: नजीकच्या अधिकृत केंद्राला विद्यार्थी आणि पालकांनी एकत्र भेट देऊन तेथील लॅब, साधने आणि शिक्षकांशी चर्चा करा.',
      hi: 'प्रशिक्षण केंद्र का प्रत्यक्ष दौरा: नजदीकी आईटीआई (ITI) या एनएसडीसी केंद्र पर छात्र और अभिभावक साथ जाकर वहां की लैब, टूल्स और प्रशिक्षकों से प्रत्यक्ष मिलें।',
    });

    // 15. Concrete Next Steps
    const nextSteps: LocalizedString[] = [
      {
        en: 'Inspect verified NCVET and NSQF Level accreditation details for your shortlisted courses.',
        mr: 'निवडलेल्या कोर्सेसची NCVET शासकीय मान्यता आणि NSQF स्तर तपासा.',
        hi: 'चुने गए कोर्सेज की सरकारी मान्यता (NCVET) और कौशल स्तर (NSQF Level) की जांच करें।',
      },
      {
        en: 'Check government fee subsidy eligibility under PMKVY or Maharashtra State Skill schemes.',
        mr: 'महाराष्ट्र कौशल्य विकास किंवा PMKVY अंतर्गत फी सवलत किंवा शिष्यवृत्तीची पात्रता तपासा.',
        hi: 'पीएमकेवीवाई (PMKVY) या राज्य कौशल विकास योजनाओं के तहत फीस सब्सिडी और छात्रवृत्ति पात्रता देखें।',
      },
      {
        en: 'Speak with an accredited district vocational counsellor for 1-on-1 family guidance.',
        mr: 'अधिक वैयक्तिक मार्गदर्शनासाठी जिल्हास्तरीय तज्ज्ञ समुपदेशकांशी संपर्क साधा.',
        hi: 'व्यक्तिगत मार्गदर्शन के लिए जिला स्तरीय मान्यता प्राप्त काउंसलर से 1-ऑन-1 चर्चा का समय तय करें।',
      },
    ];

    // Concern label for display
    const concernQuestion = ASSESSMENT_QUESTIONS.find((q) => q.id === 'q_concern');
    const selectedConcernOption = concernQuestion?.options?.find((o) => o.id === primaryConcernId);
    const primaryConcernLabel = selectedConcernOption?.label.en || 'Verified Employment & Stability';

    return {
      participantRole,
      educationLevel,
      interestStreams,
      keyPriorities,
      primaryConcernId,
      primaryConcernLabel,
      deepDiveAnswer,
      confidenceScore,
      learningStyle,
      preferredEnvironments,
      furtherStudyIntent,
      selectedCourseId,
      additionalNotes,
      recommendedCourses: matchedCourses.slice(0, 3),
      discussionPoints,
      nextSteps,
    };
  }
}

export const assessmentService = new AssessmentService();
