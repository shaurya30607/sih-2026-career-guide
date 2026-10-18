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
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../app/routes';
import { useTranslation, SupportedLanguageCode } from '../../i18n';

export interface AssessmentScreenProps {
  courseId?: string | null;
  onNavigate?: (route: string) => void;
  onClearCourseContext?: () => void;
  onViewCourseDetails?: (courseId: string) => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  courseId,
  onNavigate,
  onClearCourseContext,
  onViewCourseDetails,
}) => {
  const { language, changeLanguage, t } = useTranslation();
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [historyStack, setHistoryStack] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  // Restore saved session or pre-seed course context on initial mount
  useEffect(() => {
    const saved = assessmentService.loadSession();
    if (saved && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      setActiveQuestionIndex(saved.activeQuestionIndex || 0);
    } else if (courseId) {
      // Pre-seed the course exploration question if arrived from a course
      setAnswers({ q_target_course: courseId });
    }
  }, [courseId]);

  // Compute active question list based on current answers
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
        const next = { ...prev, [currentQuestion.id]: newVal };
        // Clean out answers that may no longer be applicable if an earlier answer changed
        return assessmentService.cleanIrrelevantAnswers(next);
      });
    },
    [currentQuestion?.id]
  );

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

    if (safeIndex < totalQuestions - 1) {
      setHistoryStack((prev) => [...prev, safeIndex]);
      setActiveQuestionIndex(safeIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all applicable questions
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle Back button
  const handleBack = () => {
    if (historyStack.length === 0) return;
    setValidationError(null);
    const prevIndex = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setActiveQuestionIndex(prevIndex);
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

  // Handle Restart Assessment
  const handleRestart = () => {
    assessmentService.clearSession();
    setAnswers({});
    setActiveQuestionIndex(0);
    setHistoryStack([]);
    setIsCompleted(false);
    setValidationError(null);
    if (onClearCourseContext) {
      onClearCourseContext();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMr = language === 'mr';

  // If completed, render the results screen
  if (isCompleted) {
    const resultsData = assessmentService.generateResults(answers);
    return (
      <div className="assessment-screen" style={{ width: '100%', maxWidth: '960px', margin: '0 auto', paddingBottom: '3rem' }}>
        <AssessmentResults
          results={resultsData}
          language={language}
          onExploreCourses={() => onNavigate && onNavigate(ROUTES.COURSES)}
          onViewCourseDetails={(cId) => {
            if (onViewCourseDetails) onViewCourseDetails(cId);
            else if (onNavigate) onNavigate(ROUTES.COURSE_DETAIL);
          }}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // Fallback if no questions are loaded yet
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
        aria-label={language === 'hi' ? 'मूल्यांकन नेविगेशन' : isMr ? 'मूल्यांकन नेव्हिगेशन' : 'Assessment Navigation'}
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
          disabled={safeIndex === 0 && historyStack.length === 0}
          style={{
            visibility: safeIndex === 0 && historyStack.length === 0 ? 'hidden' : 'visible',
            minHeight: '44px',
          }}
        >
          {t('assessment.btnBack')}
        </Button>

        <Button
          variant="primary"
          size="lg"
          icon={safeIndex === totalQuestions - 1 ? <CheckCircle2 size={18} /> : <ArrowRight size={18} />}
          iconPosition="right"
          onClick={handleContinue}
          style={{ minWidth: '160px', minHeight: '44px' }}
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
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
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
              borderRadius: 'var(--radius-lg)',
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
                  borderRadius: 'var(--radius-full)',
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button variant="outline" size="md" onClick={() => setShowExitModal(false)} style={{ minHeight: '44px' }}>
                {language === 'hi' ? 'सत्र जारी रखें' : isMr ? 'सत्र सुरू ठेवा' : 'Continue Assessment'}
              </Button>
              <Button variant="primary" size="md" onClick={handleConfirmExit} style={{ minHeight: '44px' }}>
                {t('assessment.btnSaveExit')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
