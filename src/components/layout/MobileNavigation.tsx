import React from 'react';
import {
  Home,
  BookOpen,
  MessageSquareQuote,
  Route,
  X,
  GraduationCap,
  Globe,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from './navigationConfig';
import { ROUTES } from '../../app/routes';
import { IconButton } from '../common/IconButton';
import { useTranslation, SupportedLanguageCode } from '../../i18n';

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
  const { t, language, changeLanguage, supportedLanguages } = useTranslation();

  // Top 4 primary tabs for bottom navigation
  const bottomNavItems = [
    { key: 'nav.home', route: ROUTES.HOME, icon: Home },
    { key: 'nav.findCourse', route: ROUTES.COURSES, icon: BookOpen },
    { key: 'nav.familyGuidance', route: ROUTES.COUNSELLING, icon: MessageSquareQuote },
    { key: 'nav.careerOptions', route: ROUTES.CAREER_PATHWAYS, icon: Route },
  ];

  const primaryItems = NAVIGATION_ITEMS.filter((item) => !item.isAdmin);
  const adminItems = NAVIGATION_ITEMS.filter((item) => item.isAdmin);

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
                  style={{ width: '100%', background: 'none', border: 'none', minHeight: '44px' }}
                >
                  <Icon size={20} aria-hidden="true" />
                  <span style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>{t(item.key)}</span>
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
                width: 34,
                height: 34,
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary, #1f2b4d)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GraduationCap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary, #1f2b4d)' }}>
                SkillSaathi
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                {t('nav.tagline')}
              </div>
            </div>
          </div>

          <IconButton
            icon={<X size={20} />}
            ariaLabel={t('nav.closeMenu')}
            onClick={onCloseDrawer}
            variant="ghost"
            size="sm"
          />
        </div>

        {/* Mobile Language Selector inside Drawer */}
        <div style={{ padding: '12px 16px', backgroundColor: 'var(--color-surface, #f4f4f2)', margin: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={18} style={{ color: 'var(--color-primary, #1f2b4d)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              {t('nav.chooseLanguage')}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    backgroundColor: language === lang.code ? 'var(--color-primary, #1f2b4d)' : '#ffffff',
                    color: language === lang.code ? '#ffffff' : 'var(--color-text-primary)',
                    cursor: 'pointer',
                  }}
                  onClick={() => changeLanguage(lang.code as SupportedLanguageCode)}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <nav style={{ padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
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
                  onCloseDrawer();
                }}
                aria-current={isActive ? 'page' : undefined}
                style={{ width: '100%', minHeight: '44px' }}
              >
                <Icon size={18} aria-hidden={true} />
                <span style={{ flex: 1, textAlign: 'left' }}>{t(item.translationKey)}</span>
              </button>
            );
          })}

          {/* Separated Admin Section */}
          {adminItems.length > 0 && (
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border, #e3e1dc)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', padding: '0 12px 6px 12px' }}>
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
                    style={{ width: '100%', opacity: 0.8, minHeight: '44px' }}
                    onClick={() => {
                      onRouteChange(item.route);
                      onCloseDrawer();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={16} aria-hidden={true} />
                    <span style={{ flex: 1, textAlign: 'left', fontSize: '0.8125rem' }}>{t(item.translationKey)}</span>
                  </button>
                );
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default MobileNavigation;
