/**
 * Course and vocational training types for SkillSaathi
 */

export type VocationalStream =
  | 'it_tech'
  | 'healthcare'
  | 'renewable_energy'
  | 'manufacturing_engineering'
  | 'hospitality_tourism'
  | 'automotive'
  | 'agriculture_allied'
  | 'construction_infrastructure'
  | 'creative_media';

export type EducationLevelRequired =
  | 'below_8th'
  | '8th_pass'
  | '10th_pass'
  | '12th_pass'
  | 'diploma'
  | 'graduate';

export type CertificationBody =
  | 'NSDC'
  | 'NCVET'
  | 'DGT_ITI'
  | 'Polytechnic'
  | 'State_Skill_Mission'
  | 'Industry_Partner';

export interface CourseEligibility {
  minAge: number;
  maxAge?: number;
  minEducation: EducationLevelRequired;
  priorExperienceRequired: boolean;
}

export interface CareerOutcome {
  roleTitle: string;
  averageStartingSalaryInr: number;
  industryDemand: 'medium' | 'high' | 'very_high';
  potentialEmployers: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  provider: string;
  stream: VocationalStream;
  durationMonths: number;
  trainingMode: 'offline' | 'online' | 'hybrid';
  certificationBody: CertificationBody;
  eligibility: CourseEligibility;
  description: string;
  highlights: string[];
  location: string;
  feesInr: number;
  financialAidAvailable: boolean;
  careerOutcome: CareerOutcome;
  rating: number;
  enrolledCount: number;
  // Optional detailed fields for course exploration
  nsqfLevel?: number;
  skillsAcquired?: string[];
  careerProgression?: string;
  practicalHours?: number;
}

export interface CourseFilter {
  stream?: VocationalStream;
  minEducation?: EducationLevelRequired;
  trainingMode?: 'offline' | 'online' | 'hybrid';
  maxDurationMonths?: number;
  maxFeesInr?: number;
  financialAidOnly?: boolean;
  searchQuery?: string;
  bookmarkedOnly?: boolean;
}
