import { Course, CourseFilter, VocationalStream, EducationLevelRequired } from '../../types/course';
import { MOCK_COURSES } from '../mocks/courses';

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

class CourseService {
  /**
   * Fetch all courses (simulated async to mirror future API)
   */
  async getAllCourses(): Promise<Course[]> {
    return Promise.resolve([...MOCK_COURSES]);
  }

  /**
   * Find a single course by its unique ID
   */
  async getCourseById(id: string): Promise<Course | undefined> {
    const course = MOCK_COURSES.find((c) => c.id === id);
    return Promise.resolve(course);
  }

  /**
   * Filter and search courses in memory
   */
  async filterCourses(filter: CourseFilter, bookmarkedIds?: Set<string>): Promise<Course[]> {
    let result = [...MOCK_COURSES];

    // Filter by Search Query (title, description, provider, skills, roles)
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

    // Filter by Sector / Stream
    if (filter.stream) {
      result = result.filter((c) => c.stream === filter.stream);
    }

    // Filter by Minimum Education Requirement
    if (filter.minEducation) {
      result = result.filter((c) => c.eligibility.minEducation === filter.minEducation);
    }

    // Filter by Training Mode
    if (filter.trainingMode) {
      result = result.filter((c) => c.trainingMode === filter.trainingMode);
    }

    // Filter by Maximum Duration (Months)
    if (filter.maxDurationMonths) {
      result = result.filter((c) => c.durationMonths <= filter.maxDurationMonths!);
    }

    // Filter by Financial Aid Availability
    if (filter.financialAidOnly) {
      result = result.filter((c) => c.financialAidAvailable);
    }

    // Filter by Bookmarked Only
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
