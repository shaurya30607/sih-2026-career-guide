/**
 * Centralised API endpoints definition for SkillSaathi
 */

export const ENDPOINTS = {
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    CATEGORIES: '/courses/categories',
    FEATURED: '/courses/featured',
  },
  COUNSELLING: {
    SESSIONS: '/counselling/sessions',
    SESSION_DETAIL: (id: string) => `/counselling/sessions/${id}`,
    MESSAGES: (sessionId: string) => `/counselling/sessions/${sessionId}/messages`,
    RECOMMENDATIONS: (sessionId: string) => `/counselling/sessions/${sessionId}/recommendations`,
  },
  CAREER_PATHWAYS: {
    EXPLORE: '/career-pathways/explore',
    DETAIL: (id: string) => `/career-pathways/${id}`,
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    STREAMS: '/analytics/streams',
    CONSENSUS: '/analytics/consensus',
  },
} as const;
