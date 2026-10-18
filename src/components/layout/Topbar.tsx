import React from 'react';
import { Menu, Globe, User } from 'lucide-react';
import { IconButton } from '../common/IconButton';
import { SUPPORTED_LANGUAGES } from './navigationConfig';

export interface TopbarProps {
  sectionTitle: string;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  sectionTitle,
  selectedLanguage,
  onLanguageChange,
  onMobileMenuToggle,
  isMobileMenuOpen,
}) => {
  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <div className="topbar-mobile-toggle">
          <IconButton
            icon={<Menu size={20} />}
            ariaLabel={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={onMobileMenuToggle}
            variant="ghost"
            size="sm"
          />
        </div>
        <span className="topbar-section-title">{sectionTitle}</span>
      </div>

      <div className="topbar-right">
        {/* Language Selector */}
        <div className="language-selector">
          <Globe size={16} aria-hidden="true" style={{ color: 'var(--color-text-muted)' }} />
          <label htmlFor="language-select" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
            Choose language
          </label>
          <select
            id="language-select"
            className="language-select-input"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            aria-label="Select application language"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Demo User Pill */}
        <div
          className="demo-user-pill"
          title="Demo account session. Authentication is simulated for this prototype."
        >
          <div className="demo-user-avatar" aria-hidden="true">
            <User size={12} />
          </div>
          <span style={{ fontWeight: 500 }}>Rahul (Student Demo)</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
