import { EducationLevelRequired, VocationalStream } from '../../types/course';

export type OnboardingRole = 'student' | 'parent' | 'joint';

export interface OnboardingPreferences {
  role?: OnboardingRole;
  educationLevel?: EducationLevelRequired;
  state?: string;
  district?: string;
  careerInterests: VocationalStream[];
  completed: boolean;
}

export const MAHARASHTRA_DISTRICTS = [
  'Pune',
  'Mumbai Suburban',
  'Nagpur',
  'Nashik',
  'Chhatrapati Sambhajinagar (Aurangabad)',
  'Thane',
  'Kolhapur',
  'Solapur',
  'Amravati',
  'Other / Across India',
];
