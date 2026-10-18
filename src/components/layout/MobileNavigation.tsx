import React from 'react';
import {
  Home,
  BookOpen,
  MessageSquareQuote,
  Route,
  X,
  GraduationCap,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';
import { ROUTES } from '../../app/routes';
import { IconButton } from '../common/IconButton';

export interface MobileNavigationProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentRoute,
  onRouteChange,
  isDrawerOpen,
  onCloseDrawer,
}) => {
  // Top 4 primary tabs for bottom navigation
  const bottomNavItems = [
    { label: 'Home', route: ROUTES.HOME, icon: Home },
    { label: 'Courses', route: ROUTES.COURSES, icon: BookOpen },
    { label: 'AI Counsellor', route: ROUTES.COUNSELLING, icon: MessageSquareQuote },
    { label: 'Pathways', route: ROUTES.CAREER_PATHWAYS, icon: Route },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile bottom navigation">
        <ul className="mobile-nav-list" style={{ width: '100%', padding: 0, margin: 0 }}>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;

            return (
              <li key={item.route} style={{ flex: 1, display: 'flex' }}>
                <button
                  type="button"
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onRouteChange(item.route)}
                  aria-current={isActive ? 'page' : undefined}
                  style={{ width: '100%', background: 'none', border: 'none' }}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={onCloseDrawer}
        aria-hidden={!isDrawerOpen}
      />

      {/* Slide-out Drawer */}
      <aside
        className={`mobile-drawer-menu ${isDrawerOpen ? 'open' : ''}`}
        aria-label="Mobile navigation drawer"
        aria-hidden={!isDrawerOpen}
      >
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                SkillSaathi
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                Vocational Guide
              </div>
            </div>
          </div>

          <IconButton
            icon={<X size={20} />}
            ariaLabel="Close navigation drawer"
            onClick={onCloseDrawer}
            variant="ghost"
            size="sm"
          />
        </div>

        <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
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
                  onCloseDrawer();
                }}
                aria-current={isActive ? 'page' : undefined}
                style={{ width: '100%' }}
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
    </>
  );
};

export default MobileNavigation;
