import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  User,
  GraduationCap,
  RotateCcw,
  Languages,
  AlertTriangle,
} from 'lucide-react';
import { Course } from '../../types/course';
import { CounsellingMessage } from '../../types/counselling';
import {
  CounsellingPerspective,
  CounsellingLanguage,
} from './counsellingContent';
import { counsellingService } from './counsellingService';
import { courseService } from '../../services/courses/courseService';
import { ChatWindow } from './ChatWindow';
import { EvidencePanel } from './EvidencePanel';
import { CounsellorRequestForm } from './CounsellorRequestForm';
import { Button } from '../../components/common/Button';
import { ROUTES } from '../../app/routes';
import { useTranslation, SupportedLanguageCode } from '../../i18n';

export interface CounsellingScreenProps {
  courseId?: string | null;
  onNavigate?: (route: string) => void;
  onClearCourseContext?: () => void;
  onViewCourseDetails?: (courseId: string) => void;
}

export const CounsellingScreen: React.FC<CounsellingScreenProps> = ({
  courseId,
  onNavigate,
  onClearCourseContext,
  onViewCourseDetails,
}) => {
  const { language: globalLang, changeLanguage } = useTranslation();
  const [language, setLanguage] = useState<CounsellingLanguage>((globalLang as CounsellingLanguage) || 'en');
  const [perspective, setPerspective] = useState<CounsellingPerspective>('joint');
  const [course, setCourse] = useState<Course | null>(null);
  const [messages, setMessages] = useState<CounsellingMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showCounsellorModal, setShowCounsellorModal] = useState<boolean>(false);

  const ui = counsellingService.getUIText(language);

  // Sync with global language selector
  useEffect(() => {
    if (globalLang && (globalLang === 'en' || globalLang === 'mr' || globalLang === 'hi')) {
      setLanguage(globalLang as CounsellingLanguage);
      if (messages.length === 1 && messages[0].senderRole === 'counsellor') {
        const welcome = counsellingService.getInitialWelcomeMessage(perspective, globalLang as CounsellingLanguage, course);
        setMessages([welcome]);
      }
    }
  }, [globalLang, course, messages, perspective]);

  // Load course details if courseId is passed
  useEffect(() => {
    let isMounted = true;
    if (courseId) {
      courseService.getCourseById(courseId).then((found) => {
        if (isMounted) {
          setCourse(found || null);
        }
      });
    } else {
      setCourse(null);
    }
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  // Initialize or update initial welcome message when session begins or course is pinned
  useEffect(() => {
    // Only set initial message if conversation is empty
    if (messages.length === 0) {
      const welcome = counsellingService.getInitialWelcomeMessage(perspective, language, course);
      setMessages([welcome]);
    }
  }, [course, language, perspective, messages.length]);

  // Handle language toggle
  const handleToggleLanguage = (newLang: CounsellingLanguage) => {
    setLanguage(newLang);
    changeLanguage(newLang as SupportedLanguageCode);
    // If only the welcome message exists, update it to the new language
    if (messages.length === 1 && messages[0].senderRole === 'counsellor') {
      const welcome = counsellingService.getInitialWelcomeMessage(perspective, newLang, course);
      setMessages([welcome]);
    }
  };

  // Handle user sending a question
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg = counsellingService.createUserMessage(text, perspective, language);
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      try {
        const responseMsg = await counsellingService.generateResponse(
          text,
          perspective,
          language,
          course
        );
        setMessages((prev) => [...prev, responseMsg]);
      } catch (err) {
        console.error('Error generating simulated response', err);
      } finally {
        setIsTyping(false);
      }
    },
    [isTyping, perspective, language, course]
  );

  // Handle starting a fresh conversation session
  const handleConfirmReset = () => {
    const welcome = counsellingService.getInitialWelcomeMessage(perspective, language, course);
    setMessages([welcome]);
    setShowResetModal(false);
  };

  const handleClearCourse = () => {
    setCourse(null);
    if (onClearCourseContext) {
      onClearCourseContext();
    }
  };

  const handleViewCourse = (id: string) => {
    if (onViewCourseDetails) {
      onViewCourseDetails(id);
    } else if (onNavigate) {
      onNavigate(ROUTES.COURSE_DETAIL);
    }
  };

  return (
    <div className="counselling-screen" style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Top Banner / Header */}
      <header
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
              <h1
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                {ui.headerTitle}
              </h1>
            </div>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-secondary)',
                margin: 0,
                maxWidth: '680px',
                lineHeight: 1.5,
              }}
            >
              {ui.headerSubtitle}
            </p>
          </div>

          {/* Header Controls: Language Selector & Reset Session Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Language Switcher */}
            <div
              role="group"
              aria-label="Language Selector"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '2px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ padding: '0 0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                <Languages size={14} aria-hidden="true" />
              </div>
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                style={{
                  padding: '0.3125rem 0.625rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: language === 'en' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'en' ? '#ffffff' : 'var(--color-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease, color 150ms ease',
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => handleToggleLanguage('mr')}
                style={{
                  padding: '0.3125rem 0.625rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: language === 'mr' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'mr' ? '#ffffff' : 'var(--color-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease, color 150ms ease',
                }}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => handleToggleLanguage('hi')}
                style={{
                  padding: '0.3125rem 0.625rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: language === 'hi' ? 'var(--color-primary)' : 'transparent',
                  color: language === 'hi' ? '#ffffff' : 'var(--color-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease, color 150ms ease',
                }}
              >
                हिंदी
              </button>
            </div>

            {/* Reset Conversation Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
              }}
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>{ui.resetButton}</span>
            </Button>
          </div>
        </div>

        {/* Perspective Mode Switcher */}
        <div
          role="region"
          aria-label={ui.perspectiveLabel}
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
              }}
            >
              {ui.perspectiveLabel}
            </span>
          </div>

          <div
            role="tablist"
            aria-label="Counselling Perspective Modes"
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Student Perspective */}
            <button
              type="button"
              role="tab"
              aria-selected={perspective === 'student'}
              onClick={() => setPerspective('student')}
              style={{
                padding: '0.4375rem 0.875rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor:
                  perspective === 'student' ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor:
                  perspective === 'student' ? 'var(--color-primary-subtle)' : 'var(--color-bg)',
                color:
                  perspective === 'student'
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                transition: 'all 150ms ease',
              }}
            >
              <User size={14} aria-hidden="true" />
              <span>{ui.perspectives.student}</span>
            </button>

            {/* Parent Perspective */}
            <button
              type="button"
              role="tab"
              aria-selected={perspective === 'parent'}
              onClick={() => setPerspective('parent')}
              style={{
                padding: '0.4375rem 0.875rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor:
                  perspective === 'parent' ? 'var(--color-secondary)' : 'var(--color-border)',
                backgroundColor:
                  perspective === 'parent'
                    ? 'var(--color-secondary-subtle)'
                    : 'var(--color-bg)',
                color:
                  perspective === 'parent'
                    ? 'var(--color-secondary)'
                    : 'var(--color-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                transition: 'all 150ms ease',
              }}
            >
              <Users size={14} aria-hidden="true" />
              <span>{ui.perspectives.parent}</span>
            </button>

            {/* Explore Together / Joint */}
            <button
              type="button"
              role="tab"
              aria-selected={perspective === 'joint'}
              onClick={() => setPerspective('joint')}
              style={{
                padding: '0.4375rem 0.875rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor:
                  perspective === 'joint' ? 'var(--color-primary, #1f2b4d)' : 'var(--color-border)',
                backgroundColor:
                  perspective === 'joint' ? 'var(--color-primary-subtle, #e0e7ff)' : 'var(--color-bg)',
                color:
                  perspective === 'joint' ? 'var(--color-primary, #1f2b4d)' : 'var(--color-text-secondary)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                transition: 'all 150ms ease',
              }}
            >
              <GraduationCap size={14} aria-hidden="true" />
              <span>{ui.perspectives.joint}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid: Interactive Chat Window + Supporting Evidence Panel */}
      <main className="counselling-grid-layout">
        <section aria-label="Interactive Counselling Dialogue">
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            perspective={perspective}
            language={language}
            course={course}
            onSendMessage={handleSendMessage}
            onClearCourseContext={handleClearCourse}
            onViewCourseDetails={handleViewCourse}
            onOpenCounsellorModal={() => setShowCounsellorModal(true)}
          />
        </section>

        <section aria-label="Course Evidence and Verified Outcomes">
          <EvidencePanel
            course={course}
            language={language}
            onExploreCourses={() => onNavigate && onNavigate(ROUTES.COURSES)}
            onViewCourseDetails={handleViewCourse}
          />
        </section>
      </main>

      {/* Human Counsellor Escalation Modal */}
      <CounsellorRequestForm
        isOpen={showCounsellorModal}
        onClose={() => setShowCounsellorModal(false)}
        language={language}
        courseTitle={course?.title}
      />

      {/* Reset Confirmation Dialog */}
      {showResetModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
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
              padding: '1.5rem',
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
                  backgroundColor: 'var(--color-warning-bg)',
                  color: 'var(--color-warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertTriangle size={20} aria-hidden="true" />
              </div>
              <h2
                id="reset-modal-title"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {ui.resetConfirmTitle}
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
              {ui.resetConfirmDesc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowResetModal(false)}
              >
                {ui.cancelButton}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmReset}
                style={{
                  backgroundColor: 'var(--color-error)',
                  borderColor: 'var(--color-error)',
                }}
              >
                {ui.resetConfirmButton}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
