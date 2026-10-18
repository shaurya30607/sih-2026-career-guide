import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  className = '',
}) => {
  return (
    <header className={`page-header ${className}`.trim()}>
      <div className="page-header-top">
        <div className="page-header-title-area">
          <h1 className="page-header-title">{title}</h1>
          {badge}
        </div>
        {actions && <div className="page-header-actions">{actions}</div>}
      </div>
      {description && <p className="page-header-desc">{description}</p>}
    </header>
  );
};

export default PageHeader;
