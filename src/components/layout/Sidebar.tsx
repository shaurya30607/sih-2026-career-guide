import React from 'react';
import { GraduationCap } from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';
import { useTranslation } from '../../i18n';

export interface SidebarProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  className?: string;
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  className = '',
  onItemClick,
}) => {
  const { t } = useTranslation();

  const primaryItems = NAVIGATION_ITEMS.filter((item) => !item.isAdmin);
  const adminItems = NAVIGATION_ITEMS.filter((item) => item.isAdmin);

  return (
    <aside className={`app-sidebar ${className}`.trim()} aria-label="Main sidebar">
      <div className="sidebar-brand-container">
        <div className="sidebar-logo-icon" aria-hidden="true">
          <GraduationCap size={22} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">SkillSaathi</span>
          <span className="sidebar-brand-tagline">{t('nav.tagline')}</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onRouteChange(item.route);
                if (onItemClick) {
                  onItemClick();
                }
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden={true} />
              <span style={{ flex: 1, textAlign: 'left' }}>{t(item.translationKey)}</span>
            </button>
          );
        })}

        {/* Separated Administrative Area */}
        {adminItems.length > 0 && (
          <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                color: 'var(--color-muted, #6a7186)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '0 12px 8px 12px',
              }}
            >
              Staff Portal
            </div>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  style={{ opacity: 0.8 }}
                  onClick={() => {
                    onRouteChange(item.route);
                    if (onItemClick) {
                      onItemClick();
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={16} aria-hidden={true} />
                  <span style={{ flex: 1, textAlign: 'left', fontSize: '0.8125rem' }}>
                    {t(item.translationKey)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
