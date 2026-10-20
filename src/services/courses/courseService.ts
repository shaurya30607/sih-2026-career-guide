import { Course, CourseFilter, VocationalStream, EducationLevelRequired, CertificationBody } from '../../types/course';
import { MOCK_COURSES } from '../mocks/courses';
import { apiClient } from '../api/client';

export interface StreamMeta {
  key: VocationalStream;
  label: string;
  shortLabel: string;
  colorVar: string;
}

export const VOCATIONAL_STREAMS: StreamMeta[] = [
  { key: 'renewable_energy', label: 'Solar & Renewable Energy', shortLabel: 'Solar & Green', colorVar: '--color-success' },
  { key: 'automotive', label: 'Electric Vehicle & Auto Tech', shortLabel: 'EV & Auto', colorVar: '--color-primary' },
  { key: 'healthcare', label: 'Healthcare & Patient Care', shortLabel: 'Healthcare', colorVar: '--color-secondary' },
  { key: 'it_tech', label: 'IT & Digital Web Development', shortLabel: 'IT & Software', colorVar: '--color-info' },
  { key: 'manufacturing_engineering', label: 'Precision Manufacturing & CNC', shortLabel: 'CNC & Tooling', colorVar: '--color-warning' },
  { key: 'agriculture_allied', label: 'Agriculture & Drone Sensing', shortLabel: 'Agri & Drone', colorVar: '--color-success' },
];

export const EDUCATION_LEVEL_LABELS: Record<EducationLevelRequired, string> = {
  below_8th: 'Below 8th Standard',
  '8th_pass': '8th Pass',
  '10th_pass': '10th Pass (SSC)',
  '12th_pass': '12th Pass (HSC)',
  diploma: 'ITI / Polytechnic Diploma',
  graduate: 'Graduate / Degree',
};

export interface BackendCoursePayload {
  id: string;
  title: string;
  slug: string;
  provider: string;
  stream: string;
  duration_months?: number;
  durationMonths?: number;
  training_mode?: string;
  trainingMode?: string;
  certification_body?: string;
  certificationBody?: string;
  eligibility?: {
    min_age?: number;
    minAge?: number;
    max_age?: number;
    maxAge?: number;
    min_education?: string;
    minEducation?: string;
    prior_experience_required?: boolean;
    priorExperienceRequired?: boolean;
  };
  description: string;
  highlights?: string[];
  location: string;
  fees_inr?: number;
  feesInr?: number;
  financial_aid_available?: boolean;
  financialAidAvailable?: boolean;
  career_outcome?: {
    role_title?: string;
    roleTitle?: string;
    average_starting_salary_inr?: number;
    averageStartingSalaryInr?: number;
    industry_demand?: string;
    industryDemand?: string;
    potential_employers?: string[];
    potentialEmployers?: string[];
  };
  rating?: number;
  enrolled_count?: number;
  enrolledCount?: number;
  nsqf_level?: number;
  nsqfLevel?: number;
  skills_acquired?: string[];
  skillsAcquired?: string[];
  career_progression?: string;
  careerProgression?: string;
  practical_hours?: number;
  practicalHours?: number;
  district?: string;
  state?: string;
  source_name?: string;
  sourceName?: string;
  source_url?: string;
  sourceUrl?: string;
  verification_status?: string;
  verificationStatus?: string;
  last_updated?: string;
  lastUpdated?: string;
  missing_evidence_flags?: string[];
  missingEvidenceFlags?: string[];
}

class CourseService {
  private cachedCourses: Course[] = [];
  public isBackendLive = false;

  async checkLiveStatus(): Promise<boolean> {
    try {
      const res = await apiClient.get<{ status: string }>('/health');
      this.isBackendLive = Boolean(res && res.status === 'ok');
    } catch {
      this.isBackendLive = false;
    }
    return this.isBackendLive;
  }

  private mapBackendCourse(c: BackendCoursePayload): Course {
    return {
      id: c.id,
      title: c.title,
      slug: c.slug,
      provider: c.provider,
      stream: c.stream as VocationalStream,
      durationMonths: c.duration_months ?? c.durationMonths ?? 6,
      trainingMode: (c.training_mode ?? c.trainingMode ?? 'offline') as Course['trainingMode'],
      certificationBody: (c.certification_body ?? c.certificationBody ?? 'NCVET') as CertificationBody,
      eligibility: {
        minAge: c.eligibility?.min_age ?? c.eligibility?.minAge ?? 14,
        maxAge: c.eligibility?.max_age ?? c.eligibility?.maxAge,
        minEducation: (c.eligibility?.min_education ?? c.eligibility?.minEducation ?? '10th_pass') as EducationLevelRequired,
        priorExperienceRequired: c.eligibility?.prior_experience_required ?? c.eligibility?.priorExperienceRequired ?? false,
      },
      description: c.description,
      highlights: c.highlights || [],
      location: c.location,
      feesInr: c.fees_inr ?? c.feesInr ?? 0,
      financialAidAvailable: c.financial_aid_available ?? c.financialAidAvailable ?? true,
      careerOutcome: {
        roleTitle: c.career_outcome?.role_title ?? c.career_outcome?.roleTitle ?? '',
        averageStartingSalaryInr: c.career_outcome?.average_starting_salary_inr ?? c.career_outcome?.averageStartingSalaryInr ?? 0,
        industryDemand: (c.career_outcome?.industry_demand ?? c.career_outcome?.industryDemand ?? 'high') as 'medium' | 'high' | 'very_high',
        potentialEmployers: c.career_outcome?.potential_employers ?? c.career_outcome?.potentialEmployers ?? [],
      },
      rating: c.rating ?? 4.5,
      enrolledCount: c.enrolled_count ?? c.enrolledCount ?? 0,
      nsqfLevel: c.nsqf_level ?? c.nsqfLevel,
      skillsAcquired: c.skills_acquired ?? c.skillsAcquired,
      careerProgression: c.career_progression ?? c.careerProgression,
      practicalHours: c.practical_hours ?? c.practicalHours,
      district: c.district,
      state: c.state,
      sourceName: c.source_name ?? c.sourceName,
      sourceUrl: c.source_url ?? c.sourceUrl,
      verificationStatus: c.verification_status ?? c.verificationStatus ?? 'verified_curriculum_framework',
      lastUpdated: c.last_updated ?? c.lastUpdated ?? '2026-10-19',
      missingEvidenceFlags: c.missing_evidence_flags ?? c.missingEvidenceFlags ?? [],
    };
  }

  /**
   * Fetch all courses from FastAPI backend with resilient mock fallback
   */
  async getAllCourses(): Promise<Course[]> {
    try {
      const data = await apiClient.get<BackendCoursePayload[]>('/courses');
      if (Array.isArray(data) && data.length > 0) {
        this.isBackendLive = true;
        this.cachedCourses = data.map((item) => this.mapBackendCourse(item));
        return this.cachedCourses;
      }
    } catch {
      this.isBackendLive = false;
    }
    this.cachedCourses = [...MOCK_COURSES];
    return Promise.resolve(this.cachedCourses);
  }

  /**
   * Find a single course by its unique ID
   */
  async getCourseById(id: string): Promise<Course | undefined> {
    const list = this.cachedCourses.length > 0 ? this.cachedCourses : MOCK_COURSES;
    const course = list.find((c) => c.id === id);
    return Promise.resolve(course);
  }

  /**
   * Filter and search courses via backend /courses endpoint with in-memory fallback
   */
  async filterCourses(filter: CourseFilter, bookmarkedIds?: Set<string>): Promise<Course[]> {
    try {
      const params: Record<string, string | number | undefined> = {};
      if (filter.stream) params.stream = filter.stream;
      if (filter.minEducation) params.min_education = filter.minEducation;
      if (filter.maxFeesInr) params.max_fees = filter.maxFeesInr;
      if (filter.district) params.district = filter.district;
      if (filter.state) params.state = filter.state;
      if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
        params.search = filter.searchQuery.trim();
      }

      const data = await apiClient.get<BackendCoursePayload[]>('/courses', { params });
      if (Array.isArray(data)) {
        this.isBackendLive = true;
        let result = data.map((item) => this.mapBackendCourse(item));

        if (filter.trainingMode) {
          result = result.filter((c) => c.trainingMode === filter.trainingMode);
        }
        if (filter.maxDurationMonths) {
          result = result.filter((c) => c.durationMonths <= filter.maxDurationMonths!);
        }
        if (filter.financialAidOnly) {
          result = result.filter((c) => c.financialAidAvailable);
        }
        if (filter.bookmarkedOnly && bookmarkedIds) {
          result = result.filter((c) => bookmarkedIds.has(c.id));
        }
        return result;
      }
    } catch {
      this.isBackendLive = false;
    }

    // In-memory fallback
    const source = this.cachedCourses.length > 0 ? this.cachedCourses : MOCK_COURSES;
    let result = [...source];

    if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
      const q = filter.searchQuery.trim().toLowerCase();
      result = result.filter((course) => {
        const titleMatch = course.title.toLowerCase().includes(q);
        const descMatch = course.description.toLowerCase().includes(q);
        const providerMatch = course.provider.toLowerCase().includes(q);
        const roleMatch = course.careerOutcome.roleTitle.toLowerCase().includes(q);
        const skillsMatch = (course.skillsAcquired || []).some((s) => s.toLowerCase().includes(q));
        const highlightsMatch = course.highlights.some((h) => h.toLowerCase().includes(q));

        return titleMatch || descMatch || providerMatch || roleMatch || skillsMatch || highlightsMatch;
      });
    }

    if (filter.district) {
      const distLower = filter.district.toLowerCase();
      result = result.filter(
        (c) =>
          (c.district && c.district.toLowerCase().includes(distLower)) ||
          c.location.toLowerCase().includes(distLower)
      );
    }

    if (filter.stream) {
      result = result.filter((c) => c.stream === filter.stream);
    }

    if (filter.minEducation) {
      result = result.filter((c) => c.eligibility.minEducation === filter.minEducation);
    }

    if (filter.trainingMode) {
      result = result.filter((c) => c.trainingMode === filter.trainingMode);
    }

    if (filter.maxDurationMonths) {
      result = result.filter((c) => c.durationMonths <= filter.maxDurationMonths!);
    }

    if (filter.financialAidOnly) {
      result = result.filter((c) => c.financialAidAvailable);
    }

    if (filter.bookmarkedOnly && bookmarkedIds) {
      result = result.filter((c) => bookmarkedIds.has(c.id));
    }

    return Promise.resolve(result);
  }

  getStreamMeta(stream: VocationalStream): StreamMeta {
    const found = VOCATIONAL_STREAMS.find((s) => s.key === stream);
    return (
      found || {
        key: stream,
        label: stream.replace(/_/g, ' '),
        shortLabel: stream.replace(/_/g, ' '),
        colorVar: '--color-primary',
      }
    );
  }
}

export const courseService = new CourseService();
