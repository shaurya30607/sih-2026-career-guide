import React from 'react';
import { Menu, Globe, User } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { useTranslation, SupportedLanguageCode } from '../../i18n';

export interface TopbarProps {
  sectionTitle: string;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  sectionTitle,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => {
  const { language, changeLanguage, supportedLanguages, t } = useTranslation();

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <div className="topbar-mobile-toggle">
          <IconButton
            icon={<Menu size={20} />}
            ariaLabel={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={onMobileMenuToggle}
            variant="ghost"
            size="sm"
          />
        </div>
        <span className="topbar-section-title">{sectionTitle}</span>
      </div>

      <div className="topbar-right">
        {/* Global Language Selector */}
        <div className="language-selector" title={t('nav.chooseLanguage')}>
          <Globe size={18} aria-hidden="true" style={{ color: 'var(--color-primary, #1f2b4d)', flexShrink: 0 }} />
          <label htmlFor="language-select" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
            {t('nav.chooseLanguage')}
          </label>
          <select
            id="language-select"
            className="language-select-input"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as SupportedLanguageCode)}
            aria-label={t('nav.chooseLanguage')}
            style={{ fontWeight: 600, fontSize: '0.9375rem', cursor: 'pointer' }}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.label})
              </option>
            ))}
          </select>
        </div>

        {/* Demo User Pill */}
        <div
          className="demo-user-pill"
          title={t('nav.demoNote')}
        >
          <div className="demo-user-avatar" aria-hidden="true">
            <User size={12} />
          </div>
          <span style={{ fontWeight: 500 }}>{t('nav.demoUser')}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
