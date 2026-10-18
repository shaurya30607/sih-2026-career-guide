import React, { useState } from 'react';
import {
  Compass,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  RotateCcw,
  Play,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useTranslation, SupportedLanguageCode } from '../../i18n';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CounsellorRequestForm } from './CounsellorRequestForm';

export interface CareerGuidanceIntroProps {
  hasSavedSession: boolean;
  savedQuestionNumber?: number;
  totalQuestions?: number;
  onStart: () => void;
  onResume: () => void;
  onRestartNew: () => void;
  onNavigateToCounsellor?: () => void;
}

export const CareerGuidanceIntro: React.FC<CareerGuidanceIntroProps> = ({
  hasSavedSession,
  savedQuestionNumber = 1,
  totalQuestions = 8,
  onStart,
  onResume,
  onRestartNew,
}) => {
  const { language, t } = useTranslation();
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);
  const [showCounsellorModal, setShowCounsellorModal] = useState<boolean>(false);

  const isMr = language === 'mr';
  const isHi = language === 'hi';

  const heading = t('assessment.introHeading');
  const subtitle = t('assessment.introSubtitle');
  const description = t('assessment.introDescription');

  const journeySteps = [
    {
      num: 1,
      title: t('assessment.step1Title'),
      desc: t('assessment.step1Desc'),
      icon: <Sparkles size={20} aria-hidden="true" />,
    },
    {
      num: 2,
      title: t('assessment.step2Title'),
      desc: t('assessment.step2Desc'),
      icon: <FileText size={20} aria-hidden="true" />,
    },
    {
      num: 3,
      title: t('assessment.step3Title'),
      desc: t('assessment.step3Desc'),
      icon: <Compass size={20} aria-hidden="true" />,
    },
  ];

  const reassuringPoints = [
    {
      icon: <Clock size={18} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />,
      text: t('assessment.pointTime'),
    },
    {
      icon: <CheckCircle2 size={18} aria-hidden="true" style={{ color: 'var(--color-success)' }} />,
      text: t('assessment.pointNoWrong'),
    },
    {
      icon: <Compass size={18} aria-hidden="true" style={{ color: 'var(--color-secondary)' }} />,
      text: t('assessment.pointNoPriorKnowledge'),
    },
    {
      icon: <ShieldCheck size={18} aria-hidden="true" style={{ color: 'var(--color-primary)' }} />,
      text: t('assessment.pointEmpower'),
    },
  ];

  return (
    <div
      className="career-guidance-intro-container"
      style={{
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        paddingBottom: '3.5rem',
      }}
    >
      {/* Hero Welcome Card */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl, 16px)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-sm)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Badge variant="primary" size="md">
            <Compass size={14} aria-hidden="true" style={{ marginRight: '5px' }} />
            <span>{isHi ? 'करियर मार्गदर्शन' : isMr ? 'करिअर मार्गदर्शन' : 'Career Guidance'}</span>
          </Badge>
          <Badge variant="neutral" size="sm">
            <span>{isHi ? 'स्व-अन्वेषण यात्रा' : isMr ? 'स्व-शोध प्रवास' : 'Self-Discovery Journey'}</span>
          </Badge>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.025em',
            lineHeight: 1.25,
            margin: 0,
            maxWidth: '680px',
          }}
        >
          {heading}
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--color-primary)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>

        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '640px',
            margin: 0,
          }}
        >
          {description}
        </p>

        {/* Visual 3-Step Journey */}
        <div
          style={{
            width: '100%',
            maxWidth: '720px',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {journeySteps.map((step) => (
            <div
              key={step.num}
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg, 12px)',
                padding: '1.125rem 1rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary-subtle)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                  }}
                >
                  {step.num}
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>{step.icon}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                {step.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring Information Points */}
        <div
          style={{
            width: '100%',
            maxWidth: '720px',
            backgroundColor: 'var(--color-surface-muted, #f8fafc)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '1rem 1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.75rem',
            textAlign: 'left',
          }}
        >
          {reassuringPoints.map((pt, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
              <span style={{ marginTop: '2px', flexShrink: 0 }}>{pt.icon}</span>
              <span style={{ fontSize: '0.84375rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                {pt.text}
              </span>
            </div>
          ))}
        </div>

        {/* Primary & Secondary Call to Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.875rem',
            width: '100%',
            marginTop: '0.75rem',
          }}
        >
          {hasSavedSession ? (
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<Play size={18} />}
                onClick={onResume}
                style={{ minHeight: '48px', minWidth: '220px', fontSize: '1rem', fontWeight: 700 }}
              >
                {t('assessment.btnResumeProgress', { current: savedQuestionNumber, total: totalQuestions })}
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<RotateCcw size={16} />}
                onClick={() => setShowConfirmReset(true)}
                style={{ minHeight: '48px' }}
              >
                {t('assessment.btnStartNew')}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              onClick={onStart}
              style={{
                minHeight: '50px',
                minWidth: '240px',
                fontSize: '1.0625rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {t('assessment.btnStart')}
            </Button>
          )}

          {/* Secondary Action: Talk to Counsellor directly */}
          <button
            type="button"
            onClick={() => setShowCounsellorModal(true)}
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem 1rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              minHeight: '44px',
            }}
          >
            <PhoneCall size={15} />
            <span>{t('assessment.btnTalkCounsellor')}</span>
          </button>
        </div>
      </section>

      {/* Reset Confirmation Dialog */}
      {showConfirmReset && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-modal-title"
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
                  backgroundColor: 'var(--color-warning-subtle, #fef3c7)',
                  color: 'var(--color-warning, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={20} aria-hidden="true" />
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
                {t('assessment.resetConfirmTitle')}
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
              {t('assessment.resetConfirmDesc')}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowConfirmReset(false)}
                style={{ minHeight: '44px' }}
              >
                {t('assessment.btnCancel')}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setShowConfirmReset(false);
                  onRestartNew();
                }}
                style={{ minHeight: '44px' }}
              >
                {t('assessment.btnConfirmNew')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Human Counsellor Modal */}
      <CounsellorRequestForm
        isOpen={showCounsellorModal}
        onClose={() => setShowCounsellorModal(false)}
        language={language as SupportedLanguageCode}
      />
    </div>
  );
};

export default CareerGuidanceIntro;
