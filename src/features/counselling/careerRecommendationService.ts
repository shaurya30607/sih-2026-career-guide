import { MOCK_COURSES } from '../../services/mocks/courses';
import {
  AssessmentAnswers,
  CareerRecommendation,
  InterestsSummaryData,
  LocalizedString,
} from './assessmentTypes';

export class CareerRecommendationService {
  /**
   * Generates a 2-4 sentence personalized interests summary and tags from recorded answers.
   * Only references selections actually made by the user without assigning fixed personality labels.
   */
  generateInterestsSummary(answers: AssessmentAnswers): InterestsSummaryData {
    const activities = Array.isArray(answers.q_activities) ? (answers.q_activities as string[]) : [];
    const strengths = Array.isArray(answers.q_strengths) ? (answers.q_strengths as string[]) : [];
    const learningStyle = (answers.q_learning_style as string) || '';
    const environments = Array.isArray(answers.q_environment) ? (answers.q_environment as string[]) : [];
    const priorities = Array.isArray(answers.q_priorities) ? (answers.q_priorities as string[]) : [];

    const sentences: LocalizedString[] = [];
    const tags: LocalizedString[] = [];

    // Sentence 1: Activities and Main Technical Interests
    if (activities.includes('building_fixing') || activities.includes('electricity_energy')) {
      sentences.push({
        en: 'You enjoy hands-on activities, working with tools and machines, and exploring electrical or mechanical systems.',
        mr: 'तुम्हाला प्रत्यक्ष काम करणे, साधने आणि यंत्रे वापरणे आणि विद्युत किंवा मेकॅनिकल प्रणाली समजून घेणे आवडते.',
        hi: 'आपको हाथों से प्रैक्टिकल काम करना, टूल्स और मशीनों का उपयोग करना और इलेक्ट्रिकल या मैकेनिकल प्रणालियों को समझना पसंद है।',
      });
      tags.push({ en: 'Hands-on Technical', mr: 'प्रत्यक्ष तांत्रिक', hi: 'प्रैक्टिकल तकनीकी' });
    } else if (activities.includes('computers_tech') || activities.includes('design_creativity')) {
      sentences.push({
        en: 'You are curious about digital technology, using software tools to solve problems, and creative design.',
        mr: 'तुम्हाला डिजिटल तंत्रज्ञान, कॉम्प्युटरद्वारे समस्या सोडवणे आणि सर्जनशील रचना यामध्ये विशेष रस आहे.',
        hi: 'आप डिजिटल तकनीक, कंप्यूटर के जरिए समस्याएं सुलझाने और रचनात्मक डिज़ाइन में रुचि रखते हैं।',
      });
      tags.push({ en: 'Digital & Creative', mr: 'डिजिटल आणि सर्जनशील', hi: 'डिजिटल व रचनात्मक' });
    } else if (activities.includes('helping_people')) {
      sentences.push({
        en: 'You have a natural orientation toward supporting people, patient care, and contributing to community wellbeing.',
        mr: 'तुम्हाला लोकांना मदत करणे, रुग्णांची काळजी घेणे आणि समाजोपयोगी कामात योगदान देणे आवडते.',
        hi: 'आप लोगों की सहायता करने, रोगी देखभाल और समाजोपयोगी कार्यों में योगदान देने में रुचि रखते हैं।',
      });
      tags.push({ en: 'People & Care', mr: 'सेवा आणि सहाय्य', hi: 'सेवा व देखभाल' });
    } else if (activities.includes('nature_outdoors')) {
      sentences.push({
        en: 'You are engaged by agriculture, working in open outdoor spaces, and modern field applications.',
        mr: 'तुम्हाला शेती, बाहेरील मोकळे वातावरण आणि आधुनिक तंत्रज्ञानाचा प्रत्यक्ष वापर आवडतो.',
        hi: 'आप कृषि, खुले मैदान में काम करने और आधुनिक फील्ड अनुप्रयोगों में गहरी रुचि रखते हैं।',
      });
      tags.push({ en: 'Outdoor & Agri Tech', mr: 'शेती आणि निसर्ग', hi: 'कृषि व आउटडोर' });
    } else if (activities.includes('precision_making')) {
      sentences.push({
        en: 'You appreciate working carefully with measurements, precision assembly, and operating specialized machinery.',
        mr: 'तुम्हाला सूक्ष्म मोजमापे, अचूक जोडणी आणि विशेष यंत्रसामग्री काळजीपूर्वक हाताळण्यात रस आहे.',
        hi: 'आप बारीक माप, सटीक संयोजन और विशेष मशीनों के संचालन को प्राथमिकता देते हैं।',
      });
      tags.push({ en: 'Precision & Tooling', mr: 'अचूकता आणि निर्मिती', hi: 'सटीकता व निर्माण' });
    } else {
      sentences.push({
        en: 'You are in an exploratory phase, open to discovering where your interests and practical strengths lie.',
        mr: 'तुम्ही सध्या करिअर शोध घेण्याच्या टप्प्यावर आहात आणि विविध क्षेत्रांतील संधी जाणून घेण्यास उत्सुक आहात.',
        hi: 'आप अभी खोज के चरण में हैं और यह जानने के लिए उत्सुक हैं कि आपकी रुचियां कहां सबसे अच्छी रहेंगी।',
      });
      tags.push({ en: 'Open Discovery', mr: 'मार्ग शोध टप्पा', hi: 'खुली खोज' });
    }

    // Sentence 2: Strengths & Learning Style
    if (learningStyle === 'practical_hands_on') {
      sentences.push({
        en: 'You prefer learning by doing and handling equipment directly, rather than spending all your time in lecture halls.',
        mr: 'केवळ वर्गातील व्याख्यानांऐवजी प्रत्यक्ष साधने हाताळून आणि कृती करून शिकणे तुम्हाला अधिक सोयीचे वाटते.',
        hi: 'केवल कक्षा व्याख्यानों के बजाय आप प्रत्यक्ष उपकरण संचालित करके और प्रैक्टिकल काम से सीखना पसंद करते हैं।',
      });
      tags.push({ en: 'Practical Learner', mr: 'कृतीतून शिकणारा', hi: 'प्रैक्टिकल शिक्षार्थी' });
    } else if (learningStyle === 'mix_practical_classroom') {
      sentences.push({
        en: 'You thrive with a balanced approach combining technical theory in class with hands-on workshop practice.',
        mr: 'वर्गातील तांत्रिक संकल्पना आणि वर्कशॉपमधील प्रत्यक्ष सराव या दोन्हीच्या समतोलातून तुम्ही उत्तम शिकता.',
        hi: 'कक्षा की तकनीकी थ्योरी और वर्कशॉप के प्रैक्टिकल अभ्यास के संतुलित तालमेल से आप सबसे अच्छा सीखते हैं।',
      });
      tags.push({ en: 'Theory + Practice', mr: 'थिअरी + प्रॅक्टिकल', hi: 'थ्योरी + प्रैक्टिकल' });
    } else if (learningStyle === 'classroom_theory') {
      sentences.push({
        en: 'You appreciate structured study materials, diagrams, and theoretical fundamentals.',
        mr: 'तुम्हाला पद्धतशीर अभ्यास साहित्य, संकल्पना आणि थिअरीचा अभ्यास आवडतो.',
        hi: 'आप व्यवस्थित अध्ययन सामग्री, आरेख और सैद्धांतिक मूल सिद्धांतों को प्राथमिकता देते हैं।',
      });
      tags.push({ en: 'Structured Learner', mr: 'पद्धतशीर अभ्यास', hi: 'संरचित अध्ययन' });
    } else if (strengths.includes('problem_solving') || strengths.includes('hands_on')) {
      sentences.push({
        en: 'You feel comfortable figuring out solutions by testing them out and working with real-world materials.',
        mr: 'समस्या प्रत्यक्ष सोडवून पाहणे आणि प्रत्यक्ष साहित्याशी काम करताना तुम्हाला सहज वाटते.',
        hi: 'आप समाधानों को प्रत्यक्ष आजमाकर और वास्तविक सामग्री के साथ काम करते हुए सहज महसूस करते हैं।',
      });
    }

    // Sentence 3: Priorities & Work Environment
    if (priorities.includes('work_soon') || priorities.includes('stable_employment')) {
      sentences.push({
        en: 'Finding reliable, stable employment with verified industry demand is a key priority for you.',
        mr: 'बाजारात मागणी असलेला सुरक्षित आणि शाश्वत रोजगार लवकरात लवकर मिळवणे हे तुमचे मुख्य उद्दिष्ट आहे.',
        hi: 'विश्वसनीय और स्थिर रोजगार पाना तथा उद्योग में सत्यापित मांग वाले काम से जुड़ना आपकी मुख्य प्राथमिकता है।',
      });
      tags.push({ en: 'Values Job Stability', mr: 'रोजगार सुरक्षितता', hi: 'रोजगार स्थिरता' });
    } else if (priorities.includes('earning_potential') || priorities.includes('own_business')) {
      sentences.push({
        en: 'You are motivated by strong earning potential and the opportunity to build independent trade capabilities.',
        mr: 'चांगले उत्पन्न मिळवणे आणि पुढे स्वतःचा स्वतंत्र व्यवसाय किंवा सेवा उभारण्याची क्षमता तुम्हाला महत्त्वाची वाटते.',
        hi: 'आप अच्छी कमाई की संभावना और आगे चलकर अपना स्वतंत्र व्यवसाय या सेवा स्थापित करने के प्रति प्रेरित हैं।',
      });
      tags.push({ en: 'Growth & Enterprise', mr: 'व्यवसाय व प्रगती', hi: 'उद्यमिता व विकास' });
    } else if (priorities.includes('affordable_training')) {
      sentences.push({
        en: 'Keeping training fees affordable through government subsidies or scholarships is an important consideration.',
        mr: 'शासकीय सवलत किंवा शिष्यवृत्तीच्या माध्यमातून प्रशिक्षण खर्च आवाक्यात ठेवणे तुमच्यासाठी महत्त्वाचे आहे.',
        hi: 'सरकारी सब्सिडी या छात्रवृत्ति के माध्यम से प्रशिक्षण खर्च को किफायती रखना आपके लिए महत्वपूर्ण है।',
      });
      tags.push({ en: 'Affordable Training', mr: 'परवडणारे प्रशिक्षण', hi: 'किफायती प्रशिक्षण' });
    }

    // Sentence 4: Reassuring Action Guidance
    sentences.push({
      en: 'The vocational career pathways suggested below match these preferences and offer structured, accredited options to investigate.',
      mr: 'खालील सुचवलेले व्यावसायिक अभ्यासक्रम तुमच्या या आवडींशी जुळणारे असून पडताळणी करण्यासाठी उत्तम पर्याय आहेत.',
      hi: 'नीचे दिए गए व्यावसायिक करियर विकल्प आपकी इन प्राथमिकताओं से मेल खाते हैं और विचार करने के लिए उपयोगी अवसर प्रदान करते हैं।',
    });

    // Supplementary tags from environment
    if (environments.includes('workshop_factory')) {
      tags.push({ en: 'Workshop / Plant', mr: 'वर्कशॉप / कारखाना', hi: 'वर्कशॉप / प्लांट' });
    }
    if (environments.includes('office_computer')) {
      tags.push({ en: 'Digital Desk', mr: 'डिजिटल डेस्क', hi: 'डिजिटल डेस्क' });
    }
    if (environments.includes('hospital_healthcare')) {
      tags.push({ en: 'Healthcare Center', mr: 'आरोग्य केंद्र', hi: 'स्वास्थ्य केंद्र' });
    }
    if (environments.includes('outdoor_fieldwork')) {
      tags.push({ en: 'Field / Site Work', mr: 'क्षेत्रीय / साइट काम', hi: 'फील्ड / साइट वर्क' });
    }

    return {
      sentences,
      tags: tags.slice(0, 4),
    };
  }

  /**
   * Matches answers to existing catalogue courses in MOCK_COURSES using deterministic scoring.
   * Returns up to 3 recommended courses with clear explanations and verification checklists.
   */
  matchCareerPaths(answers: AssessmentAnswers): CareerRecommendation[] {
    const activities = Array.isArray(answers.q_activities) ? (answers.q_activities as string[]) : [];
    const strengths = Array.isArray(answers.q_strengths) ? (answers.q_strengths as string[]) : [];
    const environments = Array.isArray(answers.q_environment) ? (answers.q_environment as string[]) : [];
    const learningStyle = (answers.q_learning_style as string) || '';
    const priorities = Array.isArray(answers.q_priorities) ? (answers.q_priorities as string[]) : [];

    // Score courses deterministically based on recorded preferences
    const scored = MOCK_COURSES.map((course) => {
      let score = 0;
      const reasonsEn: string[] = [];
      const reasonsMr: string[] = [];
      const reasonsHi: string[] = [];

      // 1. Activity Matches
      if (course.stream === 'automotive') {
        if (activities.includes('building_fixing')) {
          score += 15;
          reasonsEn.push('interest in building and fixing tools, machines, or vehicles');
          reasonsMr.push('यंत्रे आणि वाहने दुरुस्तीची निवड');
          reasonsHi.push('मशीनों और वाहनों की रिपेयरिंग में रुचि');
        }
      } else if (course.stream === 'renewable_energy') {
        if (activities.includes('electricity_energy')) {
          score += 15;
          reasonsEn.push('interest in electricity, wiring, and renewable energy');
          reasonsMr.push('विद्युत प्रणाली आणि सौर ऊर्जेतील रस');
          reasonsHi.push('बिजली और सौर ऊर्जा में रुचि');
        }
      } else if (course.stream === 'healthcare') {
        if (activities.includes('helping_people')) {
          score += 15;
          reasonsEn.push('interest in helping people and healthcare assistance');
          reasonsMr.push('लोकांना मदत करणे आणि रुग्णसेवेतील आवड');
          reasonsHi.push('लोगों की मदद करने और स्वास्थ्य सेवा में रुचि');
        }
      } else if (course.stream === 'it_tech') {
        if (activities.includes('computers_tech') || activities.includes('design_creativity')) {
          score += 15;
          reasonsEn.push('interest in computers, apps, and digital problem solving');
          reasonsMr.push('कॉम्प्युटर, अ‍ॅप्स आणि डिजिटल तंत्रज्ञानातील रस');
          reasonsHi.push('कंप्यूटर, ऐप्स और डिजिटल समाधानों में रुचि');
        }
      } else if (course.stream === 'manufacturing_engineering') {
        if (activities.includes('precision_making') || activities.includes('building_fixing')) {
          score += 15;
          reasonsEn.push('interest in precision measurement and operating machinery');
          reasonsMr.push('अचूक मोजमापे आणि यंत्रसामग्री चालवण्यातील रस');
          reasonsHi.push('सटीक माप और मशीनों के संचालन में रुचि');
        }
      } else if (course.stream === 'agriculture_allied') {
        if (activities.includes('nature_outdoors') || activities.includes('computers_tech')) {
          score += 15;
          reasonsEn.push('interest in agriculture, open field tasks, and drone technology');
          reasonsMr.push('शेती, मोकळे वातावरण आणि आधुनिक ड्रोन तंत्रज्ञानातील रस');
          reasonsHi.push('कृषि, खुले मैदान और ड्रोन तकनीक में रुचि');
        }
      }

      // 2. Strengths Matches
      if (strengths.includes('hands_on') && (course.stream === 'automotive' || course.stream === 'renewable_energy' || course.stream === 'manufacturing_engineering')) {
        score += 6;
      }
      if (strengths.includes('problem_solving') && (course.stream === 'it_tech' || course.stream === 'automotive')) {
        score += 6;
      }
      if (strengths.includes('using_computers') && (course.stream === 'it_tech' || course.stream === 'agriculture_allied')) {
        score += 6;
      }
      if (strengths.includes('helping_others') && course.stream === 'healthcare') {
        score += 6;
      }
      if (strengths.includes('details_measurements') && (course.stream === 'manufacturing_engineering' || course.stream === 'renewable_energy')) {
        score += 6;
      }

      // 3. Environment Matches
      if (environments.includes('workshop_factory') && (course.stream === 'automotive' || course.stream === 'manufacturing_engineering')) {
        score += 5;
        reasonsEn.push('preference for workshop and plant environments');
        reasonsMr.push('वर्कशॉप किंवा कारखान्यातील कामाची पसंती');
        reasonsHi.push('वर्कशॉप या फैक्ट्री में काम करने की पसंद');
      }
      if (environments.includes('office_computer') && course.stream === 'it_tech') {
        score += 5;
        reasonsEn.push('preference for desk and computer lab settings');
        reasonsMr.push('कम्प्युटर लॅब किंवा ऑफिसची पसंती');
        reasonsHi.push('कंप्यूटर लैब या ऑफिस वातावरण की पसंद');
      }
      if (environments.includes('hospital_healthcare') && course.stream === 'healthcare') {
        score += 5;
        reasonsEn.push('preference for healthcare and hospital settings');
        reasonsMr.push('रुग्णालय किंवा आरोग्य केंद्राची पसंती');
        reasonsHi.push('अस्पताल या स्वास्थ्य केंद्र की पसंद');
      }
      if (environments.includes('outdoor_fieldwork') && (course.stream === 'renewable_energy' || course.stream === 'agriculture_allied')) {
        score += 5;
        reasonsEn.push('preference for outdoor and field installations');
        reasonsMr.push('बाहेरील मोकळ्या जागेतील कामाची पसंती');
        reasonsHi.push('खुले मैदान या फील्ड वर्क की पसंद');
      }

      // 4. Learning style matches
      if (learningStyle === 'practical_hands_on' && (course.practicalHours || 0) >= 140) {
        score += 4;
      }

      // 5. Priorities matches
      if (priorities.includes('affordable_training') && course.feesInr <= 15000) {
        score += 4;
        reasonsEn.push('affordable course fee with scholarship eligibility');
        reasonsMr.push('कमी फी आणि शासकीय शिष्यवृत्तीची सोय');
        reasonsHi.push('किफायती फीस और छात्रवृत्ति की सुविधा');
      }
      if (priorities.includes('work_soon') && course.durationMonths <= 6) {
        score += 4;
        reasonsEn.push('fast 4–6 month duration to start earning quickly');
        reasonsMr.push('लवकर नोकरीसाठी ४ ते ६ महिन्यांचा कालावधी');
        reasonsHi.push('जल्दी काम शुरू करने के लिए 4-6 महीने की अवधि');
      }

      // Default baseline score to ensure valid ranking
      score += 1;

      // Construct localized match reason
      const matchReasonEn = reasonsEn.length > 0
        ? `Suggested because of your ${reasonsEn.join(', ')}.`
        : 'Suggested as a foundational technical track with high industry demand.';
      const matchReasonMr = reasonsMr.length > 0
        ? `तुमच्या ${reasonsMr.join(', ')} यामुळे हा पर्याय सुचवला आहे.`
        : 'बाजारातील मागणी आणि तांत्रिक पाया मजबूत करण्यासाठी हा पर्याय सुचवला आहे.';
      const matchReasonHi = reasonsHi.length > 0
        ? `आपकी ${reasonsHi.join(', ')} के आधार पर यह विकल्प सुझाया गया है।`
        : 'मजबूत तकनीकी बुनियाद और उच्च बाजार मांग के कारण यह सुझाव दिया गया है।';

      return {
        course,
        score,
        matchReason: {
          en: matchReasonEn,
          mr: matchReasonMr,
          hi: matchReasonHi,
        },
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Pick top 3 recommendations
    const topMatches = scored.slice(0, 3);

    return topMatches.map(({ course, matchReason }) => {
      const skillsTaught = course.skillsAcquired && course.skillsAcquired.length > 0
        ? course.skillsAcquired.slice(0, 4)
        : (course.highlights || []).slice(0, 3);

      const jobRoles = course.careerOutcome?.roleTitle || 'Certified Vocational Technician';

      const modeLabel = course.trainingMode === 'hybrid'
        ? 'Hybrid'
        : course.trainingMode === 'offline'
        ? 'Offline Lab'
        : 'Online / Hybrid';

      const durationAndMode = `${course.durationMonths} Months (${modeLabel}) · NSQF Level ${course.nsqfLevel}`;

      const minEdu = course.eligibility?.minEducation === '10th_pass'
        ? 'Class 10 (SSC Passed)'
        : course.eligibility?.minEducation === '12th_pass'
        ? 'Class 12 (HSC Passed)'
        : 'Class 8 / 10 Pass';

      const eligibility = `Min Age: ${course.eligibility?.minAge || 18}+ · ${minEdu}`;

      const whatToVerify: LocalizedString = {
        en: 'Verify NCVET accreditation, lab practical hours, batch fees & subsidies, and signed employer hiring tie-ups with the center.',
        mr: 'केंद्राकडे प्रत्यक्ष NCVET मान्यता, लॅबचे तास, फी व शिष्यवृत्ती आणि कंपन्यांचे प्लेसमेंट करार तपासून घ्या.',
        hi: 'केंद्र से NCVET मान्यता, प्रैक्टिकल लैब के घंटे, फीस व सब्सिडी और कंपनियों के साथ प्लेसमेंट अनुबंधों की पुष्टि करें।',
      };

      return {
        course,
        matchReason,
        skillsTaught,
        jobRoles,
        durationAndMode,
        eligibility,
        whatToVerify,
      };
    });
  }

  /**
   * Generates discussion points for student and family to discuss together
   */
  generateDiscussionPoints(answers: AssessmentAnswers): LocalizedString[] {
    const priorities = Array.isArray(answers.q_priorities) ? (answers.q_priorities as string[]) : [];

    const points: LocalizedString[] = [
      {
        en: 'Practical Workshop vs. Classroom: Discuss whether combining hands-on lab training with real equipment fits how the student learns best.',
        mr: 'प्रॅक्टिकल आणि वर्गातील शिक्षण: वर्कशॉपमधील प्रत्यक्ष सराव विद्यार्थ्याच्या शिकण्याच्या पद्धतीशी किती जुळतो यावर चर्चा करा.',
        hi: 'प्रैक्टिकल बनाम कक्षा अध्ययन: चर्चा करें कि वर्कशॉप में हाथों से प्रैक्टिकल करना छात्र के सीखने के तरीके से कितना मेल खाता है।',
      },
    ];

    if (priorities.includes('work_soon') || priorities.includes('stable_employment')) {
      points.push({
        en: 'Employment Verification: Review the training center’s documented campus placement records and government apprenticeship (NAPS) stipend options before enrolling.',
        mr: 'नोकरीची पडताळणी: प्रवेश घेण्यापूर्वी प्रशिक्षण संस्थेचा प्लेसमेंट रेकॉर्ड आणि शासकीय NAPS विद्यावेतनाची सोय तपासून घ्या.',
        hi: 'रोजगार सत्यापन: दाखिला लेने से पहले प्रशिक्षण केंद्र के कैंपस प्लेसमेंट रिकॉर्ड और सरकारी NAPS वजीफे की समीक्षा करें।',
      });
    } else {
      points.push({
        en: 'Higher Studies Flexibility: Discuss keeping credit bridges open toward a Polytechnic Diploma or B.Voc degree under national credit frameworks (NCrF).',
        mr: 'पुढील शिक्षणाची सोय: राष्ट्रीय क्रेडिट फ्रेमवर्कनुसार (NCrF) पुढे डिप्लोमा किंवा बी.व्होक पदवी घेण्याचा मार्ग खुला ठेवण्यावर चर्चा करा.',
        hi: 'उच्च शिक्षा के रास्ते: राष्ट्रीय क्रेडिट फ्रेमवर्क (NCrF) के तहत आगे पॉलिटेक्निक डिप्लोमा या बी.वॉक डिग्री के रास्ते खुले रखने पर विचार करें।',
      });
    }

    points.push({
      en: 'Visiting Training Institutes: Plan a joint visit to a nearby ITI or authorized NSDC training center to see workshop equipment and talk with batch instructors.',
      mr: 'केंद्राला प्रत्यक्ष भेट: नजीकच्या अधिकृत आयटीआय किंवा एनएसडीसी केंद्राला भेट देऊन तेथील यंत्रे व शिक्षकांशी प्रत्यक्ष चर्चा करा.',
      hi: 'प्रशिक्षण केंद्र का दौरा: नजदीकी आईटीआई या एनएसडीसी केंद्र पर जाकर वहां के वर्कशॉप उपकरण देखें और प्रशिक्षकों से बात करें।',
    });

    return points;
  }

  /**
   * Generates actionable next steps for the user
   */
  generateNextSteps(): LocalizedString[] {
    return [
      {
        en: 'Review detailed modules, eligibility, and verified certification levels in the Course Details view.',
        mr: 'कोर्स तपशील पानावर जाऊन प्रत्यक्ष अभ्यासक्रम, पात्रता आणि प्रमाणपत्र स्तर तपासा.',
        hi: 'कोर्स विवरण पृष्ठ पर जाकर विस्तृत मॉड्यूल, पात्रता और प्रमाणित स्तर की समीक्षा करें।',
      },
      {
        en: 'Check eligibility for PMKVY or state skill mission fee subsidies and installment options.',
        mr: 'शासकीय कौशल्य योजना किंवा PMKVY अंतर्गत फी सवलत आणि हप्त्यांची सोय तपासा.',
        hi: 'PMKVY या राज्य कौशल विकास योजनाओं के तहत फीस छूट और किस्तों की पात्रता जांचें।',
      },
      {
        en: 'Speak with an accredited district vocational counsellor for 1-on-1 personalized guidance.',
        mr: 'अधिक माहिती आणि वैयक्तिक मार्गदर्शनासाठी जिल्हास्तरीय तज्ज्ञ समुपदेशकांशी संपर्क साधा.',
        hi: 'व्यक्तिगत 1-ऑन-1 मार्गदर्शन के लिए जिला स्तरीय मान्यता प्राप्त काउंसलर से बातचीत करें।',
      },
    ];
  }
}

export const careerRecommendationService = new CareerRecommendationService();
