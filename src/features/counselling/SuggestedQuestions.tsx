import React from 'react';
import { HelpCircle } from 'lucide-react';
import { CounsellingLanguage, CounsellingPerspective } from './counsellingContent';
import { counsellingService } from './counsellingService';

export interface SuggestedQuestionsProps {
  perspective: CounsellingPerspective;
  language: CounsellingLanguage;
  onSelectQuestion: (questionText: string) => void;
  disabled?: boolean;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  perspective,
  language,
  onSelectQuestion,
  disabled = false,
}) => {
  const questions = counsellingService.getSuggestedQuestions(perspective, language);
  const ui = counsellingService.getUIText(language);

  return (
    <div className="suggested-questions-container" style={{ margin: '0.75rem 0' }}>
      <div
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
        }}
      >
        <HelpCircle size={13} aria-hidden="true" />
        <span>{ui.suggestedHeading}</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {questions.map((q) => (
          <button
            key={q.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(q.text)}
            style={{
              padding: '0.4375rem 0.875rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border-strong)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: disabled ? 'not-allowed' : 'pointer',
              textAlign: 'left',
              transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              opacity: disabled ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-subtle)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }
            }}
          >
            <span>{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
