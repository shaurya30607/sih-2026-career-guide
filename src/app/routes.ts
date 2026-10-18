/**
 * Application route definitions for SkillSaathi
 */

export const ROUTES = {
  HOME: '/',
  ONBOARDING: '/onboarding',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  COUNSELLING: '/counselling',
  CAREER_PATHWAYS: '/career-pathways',
  COUNSELLOR_SUPPORT: '/counsellor-support',
  ADMIN_DASHBOARD: '/admin',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
