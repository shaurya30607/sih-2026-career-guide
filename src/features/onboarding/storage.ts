import { OnboardingPreferences } from './types';

const STORAGE_KEY = 'skillsaathi_demo_onboarding_prefs_v1';

export function saveOnboardingPreferences(prefs: OnboardingPreferences): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    }
  } catch (e) {
    console.warn('Unable to persist onboarding preferences to sessionStorage', e);
  }
}

export function getOnboardingPreferences(): OnboardingPreferences | null {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as OnboardingPreferences;
      }
    }
  } catch (e) {
    console.warn('Unable to read onboarding preferences from sessionStorage', e);
  }
  return null;
}

export function clearOnboardingPreferences(): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Unable to clear onboarding preferences', e);
  }
}
