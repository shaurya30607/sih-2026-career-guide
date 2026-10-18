import {
  AssessmentAnswers,
  AssessmentQuestion,
  AssessmentResultsData,
} from './assessmentTypes';
import { ASSESSMENT_QUESTIONS } from './assessmentQuestions';
import { careerRecommendationService } from './careerRecommendationService';

const STORAGE_KEY = 'skillsaathi_career_guidance_session';

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
   * Deterministically transform completed assessment answers into personalized career discovery results
   */
  generateResults(answers: AssessmentAnswers): AssessmentResultsData {
    // 1. Core Profile
    const participantRole = (answers.q_participant as string) || 'myself';
    const educationLevel = (answers.q_education as string) || 'completed_10';
    const activitiesSelected = Array.isArray(answers.q_activities) ? (answers.q_activities as string[]) : [];
    const strengthsSelected = Array.isArray(answers.q_strengths) ? (answers.q_strengths as string[]) : [];
    const preferredEnvironments = Array.isArray(answers.q_environment)
      ? (answers.q_environment as string[])
      : ['open_environment'];
    const learningStyle = (answers.q_learning_style as string) || 'practical_hands_on';
    const keyPriorities = Array.isArray(answers.q_priorities) ? (answers.q_priorities as string[]) : [];

    // Followup & Additional Notes
    let deepDiveAnswer: string | string[] | number | undefined;
    if (answers.q_followup_affordable) deepDiveAnswer = answers.q_followup_affordable;
    else if (answers.q_followup_employment) deepDiveAnswer = answers.q_followup_employment;
    else if (answers.q_followup_further_study) deepDiveAnswer = answers.q_followup_further_study;
    else if (answers.q_followup_other) deepDiveAnswer = answers.q_followup_other;

    const additionalNotes = typeof answers.q_additional_notes === 'string' ? answers.q_additional_notes : undefined;

    // 2. Generate Interests Summary via dedicated service
    const summary = careerRecommendationService.generateInterestsSummary(answers);

    // 3. Match Career Paths via dedicated service
    const recommendations = careerRecommendationService.matchCareerPaths(answers);
    const recommendedCourses = recommendations.map((r) => r.course);

    // 4. Discussion Points & Next Steps
    const discussionPoints = careerRecommendationService.generateDiscussionPoints(answers);
    const nextSteps = careerRecommendationService.generateNextSteps();

    return {
      participantRole,
      educationLevel,
      interestStreams: activitiesSelected,
      keyPriorities,
      primaryConcernId: 'career_discovery',
      primaryConcernLabel: 'Career Discovery & Accredited Courses',
      deepDiveAnswer,
      confidenceScore: 4,
      learningStyle,
      preferredEnvironments,
      furtherStudyIntent: keyPriorities.includes('study_further') ? 'degree_path' : 'practical_earning',
      additionalNotes,
      recommendedCourses,
      discussionPoints,
      nextSteps,
      summary,
      recommendations,
      activitiesSelected,
      strengthsSelected,
    };
  }
}

export const assessmentService = new AssessmentService();
