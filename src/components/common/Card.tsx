import React from 'react';

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'article' | 'section';
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  badge,
  footer,
  padding = 'md',
  interactive = false,
  onClick,
  className = '',
  children,
  as: Component = 'div',
}) => {
  const hasHeader = Boolean(title || subtitle || icon || badge);

  const classes = [
    'card',
    `card-padding-${padding}`,
    interactive ? 'card-interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      className={classes}
      onClick={onClick}
      role={interactive && onClick ? 'button' : undefined}
      tabIndex={interactive && onClick ? 0 : undefined}
      onKeyDown={
        interactive && onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {hasHeader && (
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon && <div className="card-icon-wrapper" aria-hidden="true">{icon}</div>}
            {(title || subtitle) && (
              <div className="card-title-group">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
              </div>
            )}
          </div>
          {badge && <div>{badge}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </Component>
  );
};

export default Card;
