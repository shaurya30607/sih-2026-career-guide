import {
  LucideIcon,
  Home,
  BookOpen,
  MessageSquareQuote,
  Route,
  Users,
  LayoutDashboard,
} from 'lucide-react';
import { ROUTES } from '../../app/routes';
import { SUPPORTED_LANGUAGES as I18N_SUPPORTED_LANGUAGES, LanguageOption } from '../../i18n';

export interface NavItemConfig {
  id: string;
  label: string;
  translationKey: string;
  route: string;
  icon: LucideIcon;
  badge?: string;
  isAdmin?: boolean;
}

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Home',
    translationKey: 'nav.home',
    route: ROUTES.HOME,
    icon: Home,
  },
  {
    id: 'courses',
    label: 'Find a Course',
    translationKey: 'nav.findCourse',
    route: ROUTES.COURSES,
    icon: BookOpen,
  },
  {
    id: 'counselling',
    label: 'Family Career Guidance',
    translationKey: 'nav.familyGuidance',
    route: ROUTES.COUNSELLING,
    icon: MessageSquareQuote,
  },
  {
    id: 'career-pathways',
    label: 'Career Options',
    translationKey: 'nav.careerOptions',
    route: ROUTES.CAREER_PATHWAYS,
    icon: Route,
  },
  {
    id: 'counsellor-support',
    label: 'Talk to a Counsellor',
    translationKey: 'nav.talkToCounsellor',
    route: ROUTES.COUNSELLOR_SUPPORT,
    icon: Users,
  },
  {
    id: 'admin',
    label: 'Admin Dashboard',
    translationKey: 'nav.adminDashboard',
    route: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboard,
    isAdmin: true,
  },
];

export { I18N_SUPPORTED_LANGUAGES as SUPPORTED_LANGUAGES };
export type { LanguageOption };
