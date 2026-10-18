import { Course } from '../../types/course';

export type AssessmentLanguage = 'en' | 'mr' | 'hi';

export type AssessmentResponseType =
  | 'single_choice'
  | 'multiple_choice'
  | 'free_text'
  | 'numeric_range'
  | 'rating_scale'
  | 'yes_no_unsure';

export interface LocalizedString {
  en: string;
  mr: string;
  hi?: string;
}

export interface QuestionOption {
  id: string;
  label: LocalizedString;
  description?: LocalizedString;
  icon?: string;
  streamKey?: string;
  value?: string;
}

export interface NumericRangeConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  prefix?: string;
  suffix?: string;
  minLabel?: LocalizedString;
  maxLabel?: LocalizedString;
  helperText?: LocalizedString;
}

export interface RatingScaleConfig {
  min: number;
  max: number;
  labels: Record<number, LocalizedString>;
}

export type QuestionCategory =
  | 'participant'
  | 'education'
  | 'interests'
  | 'strengths'
  | 'environment'
  | 'learning_style'
  | 'priorities'
  | 'followup'
  | 'confidence'
  | 'concerns'
  | 'deep_dive'
  | 'progression'
  | 'course_explore'
  | 'additional';

export interface AssessmentQuestion {
  id: string;
  category: QuestionCategory;
  categoryLabel: LocalizedString;
  question: LocalizedString;
  description?: LocalizedString;
  responseType: AssessmentResponseType;
  required: boolean;
  options?: QuestionOption[];
  maxSelections?: number;
  placeholder?: LocalizedString;
  numericConfig?: NumericRangeConfig;
  ratingConfig?: RatingScaleConfig;
  isApplicable?: (answers: AssessmentAnswers) => boolean;
}

export type AnswerValue = string | string[] | number;

export type AssessmentAnswers = Record<string, AnswerValue>;

export interface CareerRecommendation {
  course: Course;
  matchReason: LocalizedString;
  skillsTaught: string[];
  jobRoles: string;
  durationAndMode: string;
  eligibility: string;
  whatToVerify: LocalizedString;
}

export interface InterestsSummaryData {
  sentences: LocalizedString[];
  tags: LocalizedString[];
}

export interface AssessmentResultsData {
  participantRole: string;
  educationLevel: string;
  interestStreams: string[];
  keyPriorities: string[];
  primaryConcernId: string;
  primaryConcernLabel: string;
  deepDiveAnswer?: string | string[] | number;
  confidenceScore: number;
  learningStyle: string;
  preferredEnvironments: string[];
  furtherStudyIntent: string;
  selectedCourseId?: string;
  additionalNotes?: string;
  recommendedCourses: Course[];
  discussionPoints: LocalizedString[];
  nextSteps: LocalizedString[];
  // Extended properties for Redesigned Career Discovery Journey
  summary?: InterestsSummaryData;
  recommendations?: CareerRecommendation[];
  activitiesSelected?: string[];
  strengthsSelected?: string[];
}
