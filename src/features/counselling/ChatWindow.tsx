import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  GraduationCap,
  Sparkles,
  ExternalLink,
  X,
  UserCheck,
  Bot,
} from 'lucide-react';
import { Course } from '../../types/course';
import { CounsellingMessage } from '../../types/counselling';
import { CounsellingLanguage, CounsellingPerspective } from './counsellingContent';
import { counsellingService } from './counsellingService';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { Badge } from '../../components/common/Badge';

export interface ChatWindowProps {
  messages: CounsellingMessage[];
  isTyping: boolean;
  perspective: CounsellingPerspective;
  language: CounsellingLanguage;
  course?: Course | null;
  onSendMessage: (text: string) => void;
  onClearCourseContext?: () => void;
  onViewCourseDetails?: (courseId: string) => void;
  onOpenCounsellorModal: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  perspective,
  language,
  course,
  onSendMessage,
  onClearCourseContext,
  onViewCourseDetails,
  onOpenCounsellorModal,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ui = counsellingService.getUIText(language);

  // Auto-scroll to latest message when message list updates or typing starts
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom(true);
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isTyping) return;
    onSendMessage(trimmed);
    setInputText('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto adjust height up to 120px
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const isMarathi = language === 'mr';

  return (
    <div
      className="chat-window"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '560px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      {/* Course Context Banner (if pinned) */}
      {course && (
        <div
          role="region"
          aria-label={ui.courseContextPrefix}
          style={{
            backgroundColor: 'var(--color-primary-subtle)',
            borderBottom: '1px solid var(--color-border)',
            padding: '0.625rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: '200px', flex: 1 }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <GraduationCap size={16} aria-hidden="true" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'var(--color-primary)',
                  }}
                >
                  {ui.courseContextPrefix}
                </span>
                <Badge variant="neutral" size="sm">
                  {course.durationMonths} {isMarathi ? 'महिने' : 'Months'}
                </Badge>
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '380px',
                }}
              >
                {course.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {onViewCourseDetails && (
              <button
                type="button"
                onClick={() => onViewCourseDetails(course.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.3125rem 0.625rem',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  cursor: 'pointer',
                  transition: 'background-color 150ms ease',
                }}
              >
                <span>{ui.viewCourseDetails}</span>
                <ExternalLink size={12} aria-hidden="true" />
              </button>
            )}

            {onClearCourseContext && (
              <button
                type="button"
                onClick={onClearCourseContext}
                title={ui.clearCourseContext}
                aria-label={ui.clearCourseContext}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '26px',
                  height: '26px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'transparent',
                  border: '1px solid transparent',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                  e.currentTarget.style.color = 'var(--color-error)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Message History Container */}
      <div
        className="chat-message-list"
        role="log"
        aria-live="polite"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Animated Typing Indicator */}
        {isTyping && (
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'flex-start',
              maxWidth: '85%',
              animation: 'fadeIn 200ms ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={18} aria-hidden="true" />
            </div>

            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-surface)',
                borderRadius: '0 var(--radius-lg) var(--radius-lg) var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'inline-block',
                    animation: 'bounce 1.4s infinite ease-in-out both',
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'inline-block',
                    animation: 'bounce 1.4s infinite ease-in-out both 0.2s',
                  }}
                />
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    display: 'inline-block',
                    animation: 'bounce 1.4s infinite ease-in-out both 0.4s',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                  fontStyle: 'italic',
                }}
              >
                {ui.typingText}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} style={{ height: '1px' }} />
      </div>

      {/* Suggested Questions Section */}
      <div
        style={{
          padding: '0.5rem 1.25rem 0.25rem',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border-subtle)',
        }}
      >
        <SuggestedQuestions
          perspective={perspective}
          language={language}
          onSelectQuestion={(qText) => onSendMessage(qText)}
          disabled={isTyping}
        />
      </div>

      {/* Input Form & Action Footer */}
      <div
        style={{
          padding: '0.75rem 1.25rem 1rem',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-end',
            backgroundColor: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.625rem',
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
          }}
          onFocusCapture={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-subtle)';
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={inputText}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={ui.inputPlaceholder}
            disabled={isTyping}
            aria-label={ui.inputPlaceholder}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
              color: 'var(--color-text-primary)',
              lineHeight: 1.4,
              resize: 'none',
              minHeight: '24px',
              maxHeight: '120px',
              fontFamily: 'inherit',
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            aria-label={ui.sendButton}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor:
                !inputText.trim() || isTyping
                  ? 'var(--color-border)'
                  : 'var(--color-primary)',
              color: '#ffffff',
              border: 'none',
              cursor: !inputText.trim() || isTyping ? 'not-allowed' : 'pointer',
              transition: 'background-color 150ms ease, transform 100ms ease',
              flexShrink: 0,
            }}
            onMouseDown={(e) => {
              if (inputText.trim() && !isTyping) {
                e.currentTarget.style.transform = 'scale(0.96)';
              }
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Send size={15} aria-hidden="true" />
          </button>
        </div>

        {/* Bottom Helper Bar: Escalate to Human Counsellor & Disclaimer Notice */}
        <div
          style={{
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Sparkles size={12} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span>
              {isMarathi
                ? 'स्थानिक नियमाधारित सिमुलेशन · अचूक मार्गदर्शनासाठी'
                : 'Rule-based prototype engine · Enter to send, Shift+Enter for newline'}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenCounsellorModal}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-secondary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            <UserCheck size={13} aria-hidden="true" />
            <span>{ui.humanCounsellorBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
