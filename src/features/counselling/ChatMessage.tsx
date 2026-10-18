import React from 'react';
import { User, Users, GraduationCap, ShieldCheck } from 'lucide-react';
import { CounsellingMessage } from '../../types/counselling';

export interface ChatMessageProps {
  message: CounsellingMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isCounsellor = message.senderRole === 'counsellor' || message.senderRole === 'system';
  const isParent = message.senderRole === 'parent';

  // Format simple markdown-like bold (**text**) and bullet points
  const formatContent = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, idx) => {
      // Check for table header / row
      if (line.trim().startsWith('|')) {
        return (
          <div
            key={idx}
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              overflowX: 'auto',
              whiteSpace: 'pre',
              backgroundColor: 'rgba(0, 0, 0, 0.03)',
              padding: '2px 4px',
              borderRadius: '3px',
              margin: '2px 0',
            }}
          >
            {line}
          </div>
        );
      }

      // Format bullet lines
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Simple parser for bold **text**
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
            <span style={{ flex: 1 }}>{renderedParts}</span>
          </div>
        );
      }

      return line.trim() === '' ? (
        <div key={idx} style={{ height: '0.5rem' }} />
      ) : (
        <p key={idx} style={{ marginBottom: idx === lines.length - 1 ? 0 : '0.5rem' }}>
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div
      className={`chat-message-row ${isCounsellor ? 'counsellor-row' : 'user-row'}`}
      style={{
        display: 'flex',
        flexDirection: isCounsellor ? 'row' : 'row-reverse',
        gap: '0.75rem',
        alignItems: 'flex-start',
        marginBottom: '1rem',
      }}
    >
      {/* Sender Avatar */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          backgroundColor: isCounsellor
            ? 'var(--color-primary)'
            : isParent
            ? 'var(--color-secondary)'
            : 'var(--color-info)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
        }}
        aria-hidden="true"
      >
        {isCounsellor ? (
          <GraduationCap size={18} />
        ) : isParent ? (
          <Users size={17} />
        ) : (
          <User size={17} />
        )}
      </div>

      {/* Message Card Bubble */}
      <div
        style={{
          maxWidth: '82%',
          backgroundColor: isCounsellor ? 'var(--color-surface)' : 'var(--color-primary-subtle)',
          color: 'var(--color-text-primary)',
          border: `1px solid ${isCounsellor ? 'var(--color-border)' : '#bfdbfe'}`,
          borderRadius: isCounsellor ? '0 14px 14px 14px' : '14px 0 14px 14px',
          padding: '0.875rem 1.125rem',
          boxShadow: isCounsellor ? 'var(--shadow-sm)' : 'none',
        }}
      >
        {/* Sender Name & Timestamp Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.375rem',
            borderBottom: '1px solid var(--color-border-subtle)',
            paddingBottom: '0.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isCounsellor ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>
              {message.senderName}
            </span>
            {isCounsellor && (
              <span
                style={{
                  fontSize: '10px',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success-text)',
                  border: '1px solid var(--color-success-border)',
                  borderRadius: '9999px',
                  padding: '1px 5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontWeight: 600,
                }}
              >
                <ShieldCheck size={10} /> Verified Guide
              </span>
            )}
          </div>

          <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
            {message.timestamp}
          </span>
        </div>

        {/* Message Content */}
        <div style={{ fontSize: '0.90625rem', lineHeight: 1.55 }}>
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
