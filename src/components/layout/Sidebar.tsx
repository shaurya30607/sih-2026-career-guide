import React from 'react';
import { GraduationCap } from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';

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
  return (
    <aside className={`app-sidebar ${className}`.trim()} aria-label="Main sidebar">
      <div className="sidebar-brand-container">
        <div className="sidebar-logo-icon" aria-hidden="true">
          <GraduationCap size={22} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">SkillSaathi</span>
          <span className="sidebar-brand-tagline">Vocational Career Guide</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {NAVIGATION_ITEMS.map((item) => {
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
              <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                    color: isActive ? '#ffffff' : 'var(--color-primary)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
