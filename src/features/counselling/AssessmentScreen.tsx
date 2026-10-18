import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  AssessmentAnswers,
  AnswerValue,
} from './assessmentTypes';
import { assessmentService } from './assessmentService';
import { AssessmentProgress } from './AssessmentProgress';
import { QuestionRenderer } from './QuestionRenderer';
import { AssessmentResults } from './AssessmentResults';
import { CareerGuidanceIntro } from './CareerGuidanceIntro';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../app/routes';
import { useTranslation, SupportedLanguageCode } from '../../i18n';

export interface AssessmentScreenProps {
  courseId?: string | null;
  onNavigate?: (route: string) => void;
  onClearCourseContext?: () => void;
  onViewCourseDetails?: (courseId: string) => void;
}

export type GuidanceViewMode = 'intro' | 'assessment' | 'results';

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  courseId,
  onNavigate,
  onClearCourseContext,
  onViewCourseDetails,
}) => {
  const { language, changeLanguage, t } = useTranslation();
  const [viewMode, setViewMode] = useState<GuidanceViewMode>('intro');
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<number[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [hasSavedSession, setHasSavedSession] = useState<boolean>(false);

  // Restore saved session or pre-seed course context on initial mount
  useEffect(() => {
    const saved = assessmentService.loadSession();
    if (saved && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      setActiveQuestionIndex(saved.activeQuestionIndex || 0);
      setHasSavedSession(true);
    } else if (courseId) {
      // If user directly clicked "Ask counsellor about this course"
      setAnswers({ q_target_course: courseId });
    }
  }, [courseId]);

  // Compute active question list dynamically based on current answers
  const activeQuestions = assessmentService.getActiveQuestions(answers);
  const totalQuestions = activeQuestions.length;

  // Ensure activeQuestionIndex is within bounds if branching changes length
  const safeIndex = Math.min(activeQuestionIndex, Math.max(0, totalQuestions - 1));
  const currentQuestion = activeQuestions[safeIndex];

  // Handle answer change
  const handleAnswerChange = useCallback(
    (newVal: AnswerValue) => {
      setValidationError(null);
      setAnswers((prev) => {
        const next = { ...prev, [currentQuestion?.id]: newVal };
        // Clean out answers that may no longer be applicable if an earlier answer changed
        const cleaned = assessmentService.cleanIrrelevantAnswers(next);
        // Persist progress to session
        assessmentService.saveSession(cleaned, safeIndex);
        setHasSavedSession(true);
        return cleaned;
      });
    },
    [currentQuestion?.id, safeIndex]
  );

  // Start fresh assessment
  const handleStartFresh = () => {
    assessmentService.clearSession();
    setAnswers({});
    setActiveQuestionIndex(0);
    setHistoryStack([]);
    setHasSavedSession(false);
    setValidationError(null);
    setViewMode('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resume saved assessment
  const handleResume = () => {
    setViewMode('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Continue to next question or complete
  const handleContinue = () => {
    if (!currentQuestion) return;

    const isValid = assessmentService.isAnswerValid(currentQuestion, answers);
    if (!isValid) {
      if (currentQuestion.responseType === 'multiple_choice') {
        setValidationError(t('assessment.selectMultiError'));
      } else if (currentQuestion.responseType === 'rating_scale') {
        setValidationError(t('assessment.selectRatingError'));
      } else {
        setValidationError(t('assessment.selectOptionError'));
      }
      return;
    }

    setValidationError(null);

    // Save session snapshot
    assessmentService.saveSession(answers, safeIndex + 1);
    setHasSavedSession(true);

    if (safeIndex < totalQuestions - 1) {
      setHistoryStack((prev) => [...prev, safeIndex]);
      setActiveQuestionIndex(safeIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all applicable questions -> move directly to Results
      setViewMode('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Back button
  const handleBack = () => {
    setValidationError(null);

    // If at Question 1, back navigation returns to the welcome screen
    if (safeIndex === 0 && historyStack.length === 0) {
      setViewMode('intro');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (historyStack.length > 0) {
      const prevIndex = historyStack[historyStack.length - 1];
      setHistoryStack((prev) => prev.slice(0, -1));
      setActiveQuestionIndex(prevIndex);
    } else {
      setActiveQuestionIndex(Math.max(0, safeIndex - 1));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Save and Exit
  const handleConfirmExit = () => {
    assessmentService.saveSession(answers, safeIndex);
    setShowExitModal(false);
    if (onNavigate) {
      onNavigate(ROUTES.HOME);
    }
  };

  // Handle Restart Assessment from results or dialog
  const handleRestart = () => {
    assessmentService.clearSession();
    setAnswers({});
    setActiveQuestionIndex(0);
    setHistoryStack([]);
    setHasSavedSession(false);
    setValidationError(null);
    if (onClearCourseContext) {
      onClearCourseContext();
    }
    setViewMode('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Change Answers from results
  const handleChangeAnswers = () => {
    setViewMode('assessment');
    setActiveQuestionIndex(0);
    setHistoryStack([]);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMr = language === 'mr';
  const isHi = language === 'hi';

  // 1. INTRO / GET STARTED VIEW
  if (viewMode === 'intro') {
    return (
      <div className="assessment-intro-wrapper" style={{ width: '100%', padding: '0.5rem 0' }}>
        <CareerGuidanceIntro
          hasSavedSession={hasSavedSession}
          savedQuestionNumber={safeIndex + 1}
          totalQuestions={totalQuestions}
          onStart={handleStartFresh}
          onResume={handleResume}
          onRestartNew={handleStartFresh}
          onNavigateToCounsellor={() => onNavigate && onNavigate(ROUTES.COUNSELLOR_SUPPORT)}
        />
      </div>
    );
  }

  // 2. RESULTS VIEW
  if (viewMode === 'results') {
    const resultsData = assessmentService.generateResults(answers);
    return (
      <div className="assessment-results-wrapper" style={{ width: '100%', paddingBottom: '3.5rem' }}>
        <AssessmentResults
          results={resultsData}
          language={language}
          onExploreCourses={() => onNavigate && onNavigate(ROUTES.COURSES)}
          onViewCourseDetails={(cId) => {
            if (onViewCourseDetails) onViewCourseDetails(cId);
            else if (onNavigate) onNavigate(ROUTES.COURSE_DETAIL);
          }}
          onChangeAnswers={handleChangeAnswers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // 3. ONE-QUESTION-AT-A-TIME DISCOVERY ASSESSMENT VIEW
  if (!currentQuestion) {
    return null;
  }

  return (
    <div
      className="assessment-screen"
      style={{
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        paddingBottom: '4rem',
      }}
    >
      {/* Assessment Header & Progress Bar */}
      <AssessmentProgress
        currentIndex={safeIndex}
        totalQuestions={totalQuestions}
        categoryLabel={currentQuestion.categoryLabel}
        language={language}
        onLanguageToggle={(lang) => changeLanguage(lang as SupportedLanguageCode)}
        onExit={() => setShowExitModal(true)}
      />

      {/* Main Question Card */}
      <main>
        <QuestionRenderer
          question={currentQuestion}
          currentAnswer={answers[currentQuestion.id]}
          language={language}
          onAnswerChange={handleAnswerChange}
          validationError={validationError}
        />
      </main>

      {/* Navigation Controls Bar */}
      <nav
        aria-label={isHi ? 'मूल्यांकन नेविगेशन' : isMr ? 'मूल्यांकन नेव्हिगेशन' : 'Assessment Navigation'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.75rem',
          gap: '1rem',
        }}
      >
        <Button
          variant="outline"
          size="md"
          icon={<ArrowLeft size={16} />}
          onClick={handleBack}
          style={{
            minHeight: '46px',
            padding: '0 1.25rem',
          }}
        >
          {safeIndex === 0 && historyStack.length === 0
            ? isHi ? 'शुरुआती पृष्ठ' : isMr ? 'प्रारंभिक पान' : 'Welcome Page'
            : t('assessment.btnBack')}
        </Button>

        <Button
          variant="primary"
          size="lg"
          icon={safeIndex === totalQuestions - 1 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
          iconPosition="right"
          onClick={handleContinue}
          style={{ minWidth: '170px', minHeight: '46px', fontWeight: 700 }}
        >
          {safeIndex === totalQuestions - 1
            ? t('assessment.btnFinish')
            : t('assessment.btnContinue')}
        </Button>
      </nav>

      {/* Exit Confirmation Dialog */}
      {showExitModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.75rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary-subtle)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={20} aria-hidden="true" />
              </div>
              <h2
                id="exit-modal-title"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {t('assessment.exitModalTitle')}
              </h2>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
              }}
            >
              {t('assessment.exitModalDesc')}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowExitModal(false)}
                style={{ minHeight: '44px' }}
              >
                {isHi ? 'सत्र जारी रखें' : isMr ? 'सत्र सुरू ठेवा' : 'Continue Assessment'}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmExit}
                style={{ minHeight: '44px' }}
              >
                {t('assessment.btnSaveExit')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentScreen;
