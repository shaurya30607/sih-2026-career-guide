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

export interface NavItemConfig {
  id: string;
  label: string;
  route: string;
  icon: LucideIcon;
  badge?: string;
}

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  {
    id: 'home',
    label: 'Home',
    route: ROUTES.HOME,
    icon: Home,
  },
  {
    id: 'courses',
    label: 'Explore Courses',
    route: ROUTES.COURSES,
    icon: BookOpen,
  },
  {
    id: 'counselling',
    label: 'AI Counsellor',
    route: ROUTES.COUNSELLING,
    icon: MessageSquareQuote,
    badge: 'AI',
  },
  {
    id: 'career-pathways',
    label: 'Career Pathways',
    route: ROUTES.CAREER_PATHWAYS,
    icon: Route,
  },
  {
    id: 'counsellor-support',
    label: 'Counsellor Support',
    route: ROUTES.COUNSELLOR_SUPPORT,
    icon: Users,
  },
  {
    id: 'admin',
    label: 'Admin Dashboard',
    route: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboard,
  },
];

export interface LanguageOption {
  code: string;
  label: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
];
