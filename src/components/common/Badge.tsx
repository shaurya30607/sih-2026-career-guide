import React from 'react';

export interface BadgeProps {
  variant?: 'neutral' | 'success' | 'warning' | 'info' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const classes = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
      {icon && <span aria-hidden="true" style={{ display: 'inline-flex', flexShrink: 0 }}>{icon}</span>}
      <span style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>{children}</span>
    </span>
  );
};

export default Badge;
