import React from 'react';
import { Languages, LogOut, CheckCircle2 } from 'lucide-react';
import { AssessmentLanguage, LocalizedString } from './assessmentTypes';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export interface AssessmentProgressProps {
  currentIndex: number;
  totalQuestions: number;
  categoryLabel: LocalizedString;
  language: AssessmentLanguage;
  onLanguageToggle: (lang: AssessmentLanguage) => void;
  onExit: () => void;
}

export const AssessmentProgress: React.FC<AssessmentProgressProps> = ({
  currentIndex,
  totalQuestions,
  categoryLabel,
  language,
  onLanguageToggle,
  onExit,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';
  const progressPercent = Math.min(100, Math.round(((currentIndex + 1) / totalQuestions) * 100));

  const title = isHi
    ? 'करियर मार्गदर्शन'
    : isMr
    ? 'करिअर मार्गदर्शन'
    : 'Career Guidance';

  const badgeText = isHi
    ? 'करियर खोज'
    : isMr
    ? 'करिअर शोध'
    : 'Career Discovery';

  const subtitle = isHi
    ? 'अपनी रुचियों और प्राथमिकताओं को समझें और अपने अनुकूल व्यावसायिक करियर के रास्ते खोजें।'
    : isMr
    ? 'आपल्या आवडी आणि प्राधान्यक्रम समजून घ्या आणि योग्य व्यावसायिक करिअरचे मार्ग शोधा.'
    : 'Discover your interests and explore vocational career pathways suited to you.';

  const resolvedCategoryLabel =
    isHi && categoryLabel.hi
      ? categoryLabel.hi
      : isMr
      ? categoryLabel.mr
      : categoryLabel.en;

  return (
    <header className="assessment-header" style={{ marginBottom: '2rem' }}>
      {/* Top Banner Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem',
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
              {title}
            </h1>
            <Badge variant="primary" size="sm">
              <CheckCircle2 size={12} aria-hidden="true" style={{ marginRight: '4px' }} />
              <span>{badgeText}</span>
            </Badge>
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
            {subtitle}
          </p>
        </div>

        {/* Top Controls: Language Switcher and Save & Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Language Toggle: English, Marathi, Hindi */}
          <div
            role="group"
            aria-label="Language Selector"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full, 9999px)',
              padding: '2px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ padding: '0 0.5rem', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
              <Languages size={14} aria-hidden="true" />
            </div>
            <button
              type="button"
              onClick={() => onLanguageToggle('en')}
              style={{
                padding: '0.3125rem 0.625rem',
                borderRadius: 'var(--radius-full, 9999px)',
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
              onClick={() => onLanguageToggle('mr')}
              style={{
                padding: '0.3125rem 0.625rem',
                borderRadius: 'var(--radius-full, 9999px)',
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
              onClick={() => onLanguageToggle('hi')}
              style={{
                padding: '0.3125rem 0.625rem',
                borderRadius: 'var(--radius-full, 9999px)',
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

          {/* Exit Action */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            icon={<LogOut size={14} />}
            style={{ color: 'var(--color-text-muted)', minHeight: '36px' }}
          >
            {isHi ? 'सहेजें और बाहर निकलें' : isMr ? 'जतन करा आणि बाहेर पडा' : 'Save & Exit'}
          </Button>
        </div>
      </div>

      {/* Progress Bar & Step Label Card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md, 8px)',
          padding: '0.875rem 1.25rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.625rem',
            fontSize: '0.8125rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontWeight: 700,
                color: 'var(--color-primary)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
              }}
            >
              {isHi
                ? `प्रश्न ${currentIndex + 1} / ${totalQuestions}`
                : isMr
                ? `प्रश्न ${currentIndex + 1} / ${totalQuestions}`
                : `Question ${currentIndex + 1} of ${totalQuestions}`}
            </span>
            <span style={{ color: 'var(--color-border-strong)' }}>•</span>
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
              {resolvedCategoryLabel}
            </span>
          </div>

          <span style={{ fontWeight: 600, color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
            {progressPercent}% {isHi ? 'पूर्ण' : isMr ? 'पूर्ण' : 'completed'}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={isHi ? 'मूल्यांकन प्रगति' : isMr ? 'मूल्यांकन प्रगती' : 'Assessment progress'}
          style={{
            height: '8px',
            backgroundColor: 'var(--color-surface-muted, #f1f5f9)',
            borderRadius: 'var(--radius-full, 9999px)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-full, 9999px)',
              transition: 'width 250ms ease-in-out',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default AssessmentProgress;
