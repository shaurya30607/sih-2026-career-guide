import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNavigation from './MobileNavigation';
import { NAVIGATION_ITEMS } from './navigationConfig';
import { ROUTES } from '../../app/routes';
import { useTranslation } from '../../i18n';

export interface AppShellProps {
  currentRoute: string;
  onRouteChange: (route: string) => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentRoute,
  onRouteChange,
  children,
}) => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Derive current section title from NAVIGATION_ITEMS or fallback
  let sectionTitle = 'SkillSaathi';
  if (currentRoute === ROUTES.ONBOARDING) {
    sectionTitle = t('nav.onboarding');
  } else {
    const currentItem = NAVIGATION_ITEMS.find((item) => item.route === currentRoute);
    if (currentItem) {
      sectionTitle = t(currentItem.translationKey) || currentItem.label;
    }
  }

  return (
    <div className="app-shell">
      {/* Desktop Persistent Sidebar */}
      <Sidebar currentRoute={currentRoute} onRouteChange={onRouteChange} />

      {/* Main Content Area */}
      <div className="app-main-wrapper">
        <Topbar
          sectionTitle={sectionTitle}
          onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <main id="main-content" className="app-content" tabIndex={-1}>
          {children}
        </main>
      </div>

      {/* Mobile Drawer & Bottom Navigation */}
      <MobileNavigation
        currentRoute={currentRoute}
        onRouteChange={onRouteChange}
        isDrawerOpen={isMobileMenuOpen}
        onCloseDrawer={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default AppShell;
