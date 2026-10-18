import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { en } from './locales/en';
import { mr } from './locales/mr';
import { hi } from './locales/hi';

export type SupportedLanguageCode = 'en' | 'mr' | 'hi';

export interface LanguageOption {
  code: SupportedLanguageCode;
  label: string;
  nativeName: string;
}

/**
 * Centrally registered supported languages for SkillSaathi:
 * English (en), Marathi (mr), and Hindi (hi).
 */
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी' },
];

const LOCAL_STORAGE_KEY = 'skillsaathi_language';

type LocaleDictionary = typeof en;

const LOCALES: Record<SupportedLanguageCode, LocaleDictionary> = {
  en,
  mr,
  hi,
};

interface I18nContextValue {
  language: SupportedLanguageCode;
  changeLanguage: (lang: SupportedLanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  supportedLanguages: LanguageOption[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

/**
 * Helper to resolve nested keys like "home.heroTitle" from a dictionary
 */
function resolvePath(obj: unknown, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY) as SupportedLanguageCode;
      if (stored && (stored === 'en' || stored === 'mr' || stored === 'hi')) {
        return stored;
      }
    }
    return 'en';
  });

  // Keep HTML lang attribute synchronized for screen readers and search engines
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const changeLanguage = useCallback((newLang: SupportedLanguageCode) => {
    if (newLang === 'en' || newLang === 'mr' || newLang === 'hi') {
      setLanguageState(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, newLang);
      }
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // 1. Try active language dictionary
      let text = resolvePath(LOCALES[language], key);

      // 2. Fall back to English dictionary if missing
      if (text === undefined && language !== 'en') {
        text = resolvePath(LOCALES.en, key);
      }

      // 3. If still missing, return the raw key
      if (text === undefined) {
        return key;
      }

      // 4. Interpolate variables e.g. {count}, {wage}
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text?.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }

      return text;
    },
    [language]
  );

  const value = useMemo(
    () => ({
      language,
      changeLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, changeLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

/**
 * Global hook to access translations and change language in any component
 */
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

export default useTranslation;
