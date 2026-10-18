import React from 'react';
import {
  Check,
  Info,
  Wrench,
  Cpu,
  Heart,
  Sprout,
  Ruler,
  Zap,
  MessageSquare,
  Palette,
  HelpCircle,
  Lightbulb,
  Hammer,
  Monitor,
  Users,
  Target,
  CheckSquare,
  Sparkles,
  Compass,
  Factory,
  Building,
  Activity,
  Sun,
  UserCheck,
  Globe,
  User,
  AlertCircle,
} from 'lucide-react';
import {
  AssessmentLanguage,
  AssessmentQuestion,
  AnswerValue,
  LocalizedString,
} from './assessmentTypes';
import { Badge } from '../../components/common/Badge';

export interface QuestionRendererProps {
  question: AssessmentQuestion;
  currentAnswer?: AnswerValue;
  language: AssessmentLanguage;
  onAnswerChange: (value: AnswerValue) => void;
  validationError?: string | null;
}

function getLocalized(loc: LocalizedString | undefined, lang: AssessmentLanguage): string {
  if (!loc) return '';
  if (lang === 'hi' && loc.hi) return loc.hi;
  if (lang === 'mr' && loc.mr) return loc.mr;
  return loc.en || loc.mr || '';
}

function renderOptionIcon(iconName: string | undefined) {
  if (!iconName) return null;
  const iconProps = { size: 20, 'aria-hidden': true };

  switch (iconName) {
    case 'wrench':
      return <Wrench {...iconProps} />;
    case 'cpu':
      return <Cpu {...iconProps} />;
    case 'heart':
      return <Heart {...iconProps} />;
    case 'sprout':
      return <Sprout {...iconProps} />;
    case 'ruler':
      return <Ruler {...iconProps} />;
    case 'zap':
      return <Zap {...iconProps} />;
    case 'message-square':
      return <MessageSquare {...iconProps} />;
    case 'palette':
      return <Palette {...iconProps} />;
    case 'help-circle':
      return <HelpCircle {...iconProps} />;
    case 'lightbulb':
      return <Lightbulb {...iconProps} />;
    case 'hammer':
      return <Hammer {...iconProps} />;
    case 'monitor':
      return <Monitor {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'target':
      return <Target {...iconProps} />;
    case 'check-square':
      return <CheckSquare {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'compass':
      return <Compass {...iconProps} />;
    case 'factory':
      return <Factory {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'activity':
      return <Activity {...iconProps} />;
    case 'sun':
      return <Sun {...iconProps} />;
    case 'user-check':
      return <UserCheck {...iconProps} />;
    case 'globe':
      return <Globe {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    default:
      return null;
  }
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  currentAnswer,
  language,
  onAnswerChange,
  validationError,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  // Single Choice Handler
  const handleSingleSelect = (optionId: string) => {
    onAnswerChange(optionId);
  };

  // Multiple Choice Handler with intelligent "not sure yet" handling
  const handleMultipleSelect = (optionId: string) => {
    const currentList = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];

    if (optionId === 'not_sure_yet' || optionId === 'not_sure_env') {
      if (currentList.includes(optionId)) {
        onAnswerChange([]);
      } else {
        // If selecting "not sure yet", set as only choice
        onAnswerChange([optionId]);
      }
      return;
    }

    // If currently has "not sure yet" and user clicks another option, remove "not sure yet"
    const cleaned = currentList.filter((id) => id !== 'not_sure_yet' && id !== 'not_sure_env');

    if (cleaned.includes(optionId)) {
      onAnswerChange(cleaned.filter((id) => id !== optionId));
    } else {
      if (question.maxSelections && cleaned.length >= question.maxSelections) {
        return; // Selection limit reached
      }
      onAnswerChange([...cleaned, optionId]);
    }
  };

  // Numeric Slider Handler
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(Number(e.target.value));
  };

  // Textarea Handler
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange(e.target.value);
  };

  const selectedCount = Array.isArray(currentAnswer) ? currentAnswer.length : 0;

  let selectionInstructionBadge: string;
  if (question.responseType === 'single_choice' || question.responseType === 'yes_no_unsure') {
    selectionInstructionBadge = isHi
      ? 'एक विकल्प चुनें'
      : isMr
      ? 'एक पर्याय निवडा'
      : 'Choose one option';
  } else if (question.responseType === 'multiple_choice') {
    if (question.maxSelections) {
      selectionInstructionBadge = isHi
        ? `अधिकतम ${question.maxSelections} विकल्प चुन सकते हैं (${selectedCount} / ${question.maxSelections} चुने गए)`
        : isMr
        ? `जास्तीत जास्त ${question.maxSelections} पर्याय निवडू शकता (${question.maxSelections} पैकी ${selectedCount} निवडले)`
        : `Choose up to ${question.maxSelections} options (${selectedCount} of ${question.maxSelections} selected)`;
    } else {
      selectionInstructionBadge = isHi
        ? `उपयुक्त विकल्प चुनें (${selectedCount} चुने गए)`
        : isMr
        ? `लागू असणारे पर्याय निवडा (${selectedCount} निवडले)`
        : `Select all that apply (${selectedCount} selected)`;
    }
  } else {
    selectionInstructionBadge = '';
  }

  return (
    <div
      className="question-renderer-card"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl, 16px)',
        padding: '2rem 1.75rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Question Heading & Instructions */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
          <Badge variant="primary" size="sm">
            {getLocalized(question.categoryLabel, language)}
          </Badge>
          {selectionInstructionBadge && (
            <Badge variant="neutral" size="sm">
              {selectionInstructionBadge}
            </Badge>
          )}
        </div>

        <h2
          id={`question-title-${question.id}`}
          style={{
            fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.015em',
            lineHeight: 1.35,
            marginBottom: '0.5rem',
          }}
        >
          {getLocalized(question.question, language)}
        </h2>

        {question.description && (
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            {getLocalized(question.description, language)}
          </p>
        )}
      </div>

      {/* Answer Controls by Response Type */}
      <div>
        {/* A. Single Choice Options */}
        {question.responseType === 'single_choice' && question.options && (
          <div
            role="radiogroup"
            aria-labelledby={`question-title-${question.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {question.options.map((opt) => {
              const isSelected = currentAnswer === opt.id;
              const iconEl = renderOptionIcon(opt.icon);

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSingleSelect(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-lg, 12px)',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-subtle, #eff6ff)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 150ms ease',
                    boxShadow: isSelected ? '0 0 0 1px var(--color-primary)' : 'none',
                    minHeight: '52px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--color-border-strong, #94a3b8)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    }
                  }}
                >
                  {/* Radio circle */}
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border-strong, #94a3b8)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 150ms ease',
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                        }}
                      />
                    )}
                  </div>

                  {/* Optional Icon */}
                  {iconEl && (
                    <div
                      style={{
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {iconEl}
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {getLocalized(opt.label, language)}
                    </div>
                    {opt.description && (
                      <div
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--color-text-secondary)',
                          marginTop: '0.25rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {getLocalized(opt.description, language)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* B. Multiple Choice Options (Touch-friendly responsive grid) */}
        {question.responseType === 'multiple_choice' && question.options && (
          <div
            role="group"
            aria-labelledby={`question-title-${question.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '0.875rem',
            }}
          >
            {question.options.map((opt) => {
              const selectedList = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
              const isSelected = selectedList.includes(opt.id);
              const isMaxReached = Boolean(
                question.maxSelections && selectedList.length >= question.maxSelections && !isSelected
              );
              const iconEl = renderOptionIcon(opt.icon);

              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={isMaxReached}
                  onClick={() => handleMultipleSelect(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                    padding: '1.125rem',
                    borderRadius: 'var(--radius-lg, 12px)',
                    border: `2px solid ${
                      isSelected ? 'var(--color-primary)' : 'var(--color-border)'
                    }`,
                    backgroundColor: isSelected
                      ? 'var(--color-primary-subtle, #eff6ff)'
                      : isMaxReached
                      ? 'var(--color-surface-muted, #f8fafc)'
                      : 'var(--color-surface)',
                    cursor: isMaxReached ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    opacity: isMaxReached ? 0.6 : 1,
                    transition: 'all 150ms ease',
                    boxShadow: isSelected ? '0 0 0 1px var(--color-primary)' : 'none',
                    minHeight: '56px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !isMaxReached) {
                      e.currentTarget.style.borderColor = 'var(--color-border-strong, #94a3b8)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected && !isMaxReached) {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                    }
                  }}
                >
                  {/* Checkbox box */}
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: 'var(--radius-sm, 6px)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border-strong, #94a3b8)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'all 150ms ease',
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>

                  {/* Optional Icon */}
                  {iconEl && (
                    <div
                      style={{
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      {iconEl}
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: isSelected ? 700 : 600,
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                        lineHeight: 1.35,
                      }}
                    >
                      {getLocalized(opt.label, language)}
                    </div>
                    {opt.description && (
                      <div
                        style={{
                          fontSize: '0.8125rem',
                          color: 'var(--color-text-secondary)',
                          marginTop: '0.25rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {getLocalized(opt.description, language)}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* C. Free Text Area */}
        {question.responseType === 'free_text' && (
          <div>
            <textarea
              id={`textarea-${question.id}`}
              rows={4}
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={handleTextChange}
              placeholder={getLocalized(question.placeholder, language)}
              aria-label={getLocalized(question.question, language)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md, 8px)',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
                fontSize: '0.9375rem',
                fontFamily: 'inherit',
                lineHeight: 1.5,
                resize: 'vertical',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-subtle)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                marginTop: '0.5rem',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <Info size={14} aria-hidden="true" />
              <span>
                {isHi
                  ? 'यह एक स्वैच्छिक क्षेत्र है। कृपया आधार, बैंक या अन्य गोपनीय विवरण न भरें।'
                  : isMr
                  ? 'हा ऐच्छिक भाग आहे. कृपया कोणतीही गोपनीय वैयक्तिक माहिती भरू नका.'
                  : 'Optional. Do not submit sensitive personal, identification, or banking details.'}
              </span>
            </div>
          </div>
        )}

        {/* D. Numeric Range Slider */}
        {question.responseType === 'numeric_range' && question.numericConfig && (
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-md, 8px)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {getLocalized(question.numericConfig.minLabel, language)}
              </span>
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                }}
              >
                {question.numericConfig.prefix || ''}
                {(typeof currentAnswer === 'number'
                  ? currentAnswer
                  : question.numericConfig.defaultValue
                ).toLocaleString('en-IN')}
                {question.numericConfig.suffix || ''}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {getLocalized(question.numericConfig.maxLabel, language)}
              </span>
            </div>

            <input
              type="range"
              min={question.numericConfig.min}
              max={question.numericConfig.max}
              step={question.numericConfig.step}
              value={typeof currentAnswer === 'number' ? currentAnswer : question.numericConfig.defaultValue}
              onChange={handleNumericChange}
              style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>
        )}

        {/* E. Rating Scale */}
        {question.responseType === 'rating_scale' && question.ratingConfig && (
          <div
            role="radiogroup"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {[1, 2, 3, 4, 5].map((num) => {
              const isSelected = currentAnswer === num;
              const label = question.ratingConfig?.labels[num];
              return (
                <button
                  key={num}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onAnswerChange(num)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem 0.75rem',
                    borderRadius: 'var(--radius-md, 8px)',
                    border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    gap: '0.375rem',
                    minHeight: '84px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    }}
                  >
                    {num}
                  </span>
                  {label && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.3 }}>
                      {getLocalized(label, language)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Validation Alert */}
      {validationError && (
        <div
          role="alert"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md, 8px)',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#b91c1c',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          <AlertCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          <span>{validationError}</span>
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;
