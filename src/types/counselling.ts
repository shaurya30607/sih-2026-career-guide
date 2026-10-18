/**
 * Counselling session and message types for SkillSaathi
 */

export type ParticipantRole = 'student' | 'parent' | 'counsellor' | 'system';

export interface CounsellingMessage {
  id: string;
  sessionId: string;
  senderRole: ParticipantRole;
  senderName: string;
  content: string;
  timestamp: string;
  language: string;
  meta?: {
    intent?: string;
    identifiedConcerns?: string[];
    suggestedAction?: string;
    referencedCourseIds?: string[];
  };
}

export interface FamilyProfile {
  studentName: string;
  studentAge: number;
  currentEducation: string;
  studentInterests: string[];
  parentName?: string;
  parentOccupation?: string;
  parentPrimaryConcerns?: string[];
  preferredLocation?: string;
  monthlyBudgetInr?: number;
}

export interface PathwayRecommendation {
  id: string;
  streamTitle: string;
  fitScore: number;
  keySkills: string[];
  rationaleForStudent: string;
  rationaleForParent: string;
  estimatedTimelineMonths: number;
  expectedSalaryRangeInr: {
    min: number;
    max: number;
  };
  recommendedCourseIds: string[];
}

export interface CounsellingSession {
  id: string;
  familyProfile: FamilyProfile;
  status: 'active' | 'scheduled' | 'completed';
  startedAt: string;
  updatedAt: string;
  messages: CounsellingMessage[];
  recommendations: PathwayRecommendation[];
}
