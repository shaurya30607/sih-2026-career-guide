import React from 'react';
import { Check, Info } from 'lucide-react';
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

  // Multiple Choice Handler
  const handleMultipleSelect = (optionId: string) => {
    const currentList = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
    if (currentList.includes(optionId)) {
      onAnswerChange(currentList.filter((id) => id !== optionId));
    } else {
      if (question.maxSelections && currentList.length >= question.maxSelections) {
        return; // Selection limit reached
      }
      onAnswerChange([...currentList, optionId]);
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
  const multiLimitNotice = isHi
    ? `अधिकतम ${question.maxSelections} विकल्प चुन सकते हैं (चुने गए: ${selectedCount}/${question.maxSelections})`
    : isMr
    ? `कमाल ${question.maxSelections} पर्याय निवडू शकता (निवडले: ${selectedCount}/${question.maxSelections})`
    : `Select up to ${question.maxSelections} priorities (selected: ${selectedCount}/${question.maxSelections})`;

  return (
    <div
      className="question-renderer-card"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      {/* Question Heading & Guidance */}
      <div>
        <h2
          id={`question-title-${question.id}`}
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.35,
            marginBottom: '0.5rem',
          }}
        >
          {getLocalized(question.question, language)}
        </h2>

        {question.description && (
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {getLocalized(question.description, language)}
          </p>
        )}

        {/* Multi-select limit notice */}
        {question.responseType === 'multiple_choice' && question.maxSelections && (
          <div style={{ marginTop: '0.625rem' }}>
            <Badge variant="neutral" size="sm">
              {multiLimitNotice}
            </Badge>
          </div>
        )}
      </div>

      {/* Answer Controls by Response Type */}
      <div>
        {/* A. Single Choice */}
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
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSingleSelect(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 150ms ease',
                    boxShadow: isSelected ? '0 0 0 1px var(--color-primary)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'var(--color-border-strong)';
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
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
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

        {/* B. Multiple Choice */}
        {question.responseType === 'multiple_choice' && question.options && (
          <div
            role="group"
            aria-labelledby={`question-title-${question.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {question.options.map((opt) => {
              const selectedList = Array.isArray(currentAnswer) ? (currentAnswer as string[]) : [];
              const isSelected = selectedList.includes(opt.id);
              const isMaxReached = Boolean(
                question.maxSelections && selectedList.length >= question.maxSelections && !isSelected
              );

              return (
                <button
                  key={opt.id}
                  type="button"
                  role="checkbox"
                  aria-checked={isSelected}
                  disabled={isMaxReached}
                  onClick={() => handleMultipleSelect(opt.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.875rem',
                    padding: '0.875rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                    cursor: isMaxReached ? 'not-allowed' : 'pointer',
                    opacity: isMaxReached ? 0.6 : 1,
                    textAlign: 'left',
                    transition: 'all 150ms ease',
                    boxShadow: isSelected ? '0 0 0 1px var(--color-primary)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected && !isMaxReached) {
                      e.currentTarget.style.borderColor = 'var(--color-border-strong)';
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
                  {/* Checkbox Box */}
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: 'var(--radius-xs)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border-strong)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                      transition: 'all 150ms ease',
                      color: '#ffffff',
                    }}
                    aria-hidden="true"
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.875rem',
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
                          fontSize: '0.75rem',
                          color: 'var(--color-text-secondary)',
                          marginTop: '0.25rem',
                          lineHeight: 1.35,
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

        {/* C. Rating Scale (1 to 5 with full labels) */}
        {question.responseType === 'rating_scale' && question.ratingConfig && (
          <div
            role="radiogroup"
            aria-labelledby={`question-title-${question.id}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.625rem',
              }}
            >
              {[1, 2, 3, 4, 5].map((score) => {
                const isSelected = currentAnswer === score;
                const labelObj = question.ratingConfig?.labels[score];
                const scoreLabel = labelObj ? getLocalized(labelObj, language) : `Score ${score}`;

                return (
                  <button
                    key={score}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onAnswerChange(score)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '1rem 0.5rem',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                      textAlign: 'center',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
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
                    <span
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        lineHeight: 1,
                        marginBottom: '0.5rem',
                      }}
                    >
                      {score}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: isSelected ? 700 : 500,
                        lineHeight: 1.3,
                        color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {scoreLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                padding: '0 0.25rem',
              }}
            >
              <span>← {isHi ? 'कम आत्मविश्वास / शुरुआत' : isMr ? 'कमी आत्मविश्वास / सुरुवात' : 'Least confident / Just starting'}</span>
              <span>{isHi ? 'पूर्णतः आश्वस्त / शुरुआत के लिए तैयार' : isMr ? 'खूप स्पष्ट / तयार' : 'Very confident / Ready to start'} →</span>
            </div>
          </div>
        )}

        {/* D. Numeric Range / Slider */}
        {question.responseType === 'numeric_range' && question.numericConfig && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              padding: '1rem',
              backgroundColor: 'var(--color-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            {/* Live Value Display Badge */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.375rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                {question.numericConfig.prefix}
                {(typeof currentAnswer === 'number'
                  ? currentAnswer
                  : question.numericConfig.defaultValue
                ).toLocaleString('en-IN')}
              </span>
              <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isHi ? ' / माह' : isMr ? ' / महिना' : question.numericConfig.suffix}
              </span>
            </div>

            {/* Slider Input */}
            <input
              type="range"
              min={question.numericConfig.min}
              max={question.numericConfig.max}
              step={question.numericConfig.step}
              value={typeof currentAnswer === 'number' ? currentAnswer : question.numericConfig.defaultValue}
              onChange={handleNumericChange}
              aria-label={getLocalized(question.question, language)}
              style={{
                width: '100%',
                cursor: 'pointer',
                accentColor: 'var(--color-primary)',
              }}
            />

            {/* Min and Max Range Labels */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
              }}
            >
              <span>{question.numericConfig.minLabel ? getLocalized(question.numericConfig.minLabel, language) : question.numericConfig.min}</span>
              <span>{question.numericConfig.maxLabel ? getLocalized(question.numericConfig.maxLabel, language) : question.numericConfig.max}</span>
            </div>

            {/* Benchmark Guidance Note */}
            {question.numericConfig.helperText && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-secondary)',
                  backgroundColor: 'var(--color-surface)',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Info size={15} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
                <span>
                  {getLocalized(question.numericConfig.helperText, language)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* E. Yes / No / Unsure */}
        {question.responseType === 'yes_no_unsure' && (
          <div
            role="radiogroup"
            aria-labelledby={`question-title-${question.id}`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
            }}
          >
            {[
              { id: 'yes', label: { en: 'Yes', mr: 'होय', hi: 'हाँ' } },
              { id: 'no', label: { en: 'No', mr: 'नाही', hi: 'नहीं' } },
              { id: 'unsure', label: { en: 'Not Sure', mr: 'निश्चित नाही', hi: 'निश्चित नहीं' } },
            ].map((item) => {
              const isSelected = currentAnswer === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => onAnswerChange(item.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                    color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.9375rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 150ms ease',
                  }}
                >
                  {getLocalized(item.label, language)}
                </button>
              );
            })}
          </div>
        )}

        {/* F. Free Text */}
        {question.responseType === 'free_text' && (
          <div>
            <textarea
              rows={4}
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={handleTextChange}
              placeholder={
                question.placeholder
                  ? getLocalized(question.placeholder, language)
                  : isHi
                  ? 'अपने विचार यहाँ लिखें...'
                  : isMr
                  ? 'आपले विचार येथे लिहा...'
                  : 'Enter your response here...'
              }
              aria-label={getLocalized(question.question, language)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.875rem',
                color: 'var(--color-text-primary)',
                lineHeight: 1.5,
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-bg)';
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                marginTop: '0.375rem',
              }}
            >
              <span>
                {question.required
                  ? isHi
                    ? '* आवश्यक जानकारी'
                    : isMr
                    ? '* आवश्यक माहिती'
                    : '* Required response'
                  : isHi
                  ? 'ऐच्छिक (खाली छोड़ सकते हैं)'
                  : isMr
                  ? 'ऐच्छिक (वगळू शकता)'
                  : 'Optional (may leave blank)'}
              </span>
              <span>
                {typeof currentAnswer === 'string' ? currentAnswer.length : 0} {isHi ? 'अक्षर' : isMr ? 'अक्षरे' : 'characters'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Validation Error Message if user clicked Continue prematurely */}
      {validationError && (
        <div
          role="alert"
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-error)',
            backgroundColor: 'var(--color-error-bg)',
            border: '1px solid var(--color-error-border)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 500,
          }}
        >
          {validationError}
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;
