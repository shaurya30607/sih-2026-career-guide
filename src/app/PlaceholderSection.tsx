import React from 'react';
import {
  LucideIcon,
  ArrowLeft,
  Sparkles,
  MessageSquareQuote,
  Route,
  Users,
  LayoutDashboard,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ROUTES } from './routes';

export interface PlaceholderSectionProps {
  route: string;
  onNavigate: (route: string) => void;
  contextCourse?: { id: string; title: string } | null;
  onClearContextCourse?: () => void;
}

interface SectionMeta {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  plannedFeatures: { title: string; desc: string }[];
  icon: LucideIcon;
}

const SECTION_DETAILS: Record<string, SectionMeta> = {
  [ROUTES.COUNSELLING]: {
    title: 'AI Family Career Counsellor',
    subtitle: 'Joint Career Dialogues for Students and Parents',
    badge: 'Conversational Core Architecture',
    description:
      'A multi-turn counselling space built to resolve the tension between student vocational passions and parent concerns regarding social status, permanent jobs, and return on investment.',
    plannedFeatures: [
      {
        title: 'Dual-Perspective Dialogue',
        desc: 'Tailored explanations addressing student hands-on interests and parent security questions in tandem.',
      },
      {
        title: 'Multilingual Guidance',
        desc: 'Conversations in Hindi, English, and regional Indian languages with natural conversational nuance.',
      },
      {
        title: 'NEP & Credit Transfer Bridges',
        desc: 'Explaining how NCVET certification transfers into formal B.Voc and university degrees under NEP 2020.',
      },
    ],
    icon: MessageSquareQuote,
  },
  [ROUTES.CAREER_PATHWAYS]: {
    title: 'Career Progression Pathways',
    subtitle: 'From Apprentice to Senior Specialist & Entrepreneur',
    badge: 'Curriculum & Mobility Roadmap',
    description:
      'Visual roadmaps illustrating how vocational training leads to supervisory roles, certified master-craftsman levels, and entrepreneurial opportunities.',
    plannedFeatures: [
      {
        title: 'Step-by-Step Ladders',
        desc: 'Visualize 1-year, 3-year, and 5-year career timelines with expected wage milestones.',
      },
      {
        title: 'Credit Mobility Paths',
        desc: 'Clear academic paths from Certificate -> ITI -> Diploma -> B.Voc / B.Tech degrees.',
      },
      {
        title: 'Industry Certifications',
        desc: 'National skills framework levels (NSQF Levels 3 to 7) mapped directly to role seniority.',
      },
    ],
    icon: Route,
  },
  [ROUTES.COUNSELLOR_SUPPORT]: {
    title: 'Certified Human Counsellor Support',
    subtitle: 'Connect with Vocational Guidance Specialists',
    badge: 'Escalation & Support Desk',
    description:
      'Schedule dedicated 1-on-1 virtual or regional center sessions with certified vocational career counsellors for complex family situations and scholarship guidance.',
    plannedFeatures: [
      {
        title: 'District Skill Experts',
        desc: 'Connect with advisors knowledgeable about local district industrial clusters and vacancies.',
      },
      {
        title: 'Financial Aid & Scholarship Help',
        desc: 'Direct help applying for PMKVY, state stipend programs, and skill development loans.',
      },
      {
        title: 'Family Group Sessions',
        desc: 'Guided 30-minute video or audio calls with both student and guardians.',
      },
    ],
    icon: Users,
  },
  [ROUTES.ADMIN_DASHBOARD]: {
    title: 'Scheme Administration & Analytics',
    subtitle: 'Aggregated Family Decision Insights',
    badge: 'Policy & Monitoring Portal',
    description:
      'Empower skill missions and educational administrators to monitor vocational interest, identify regional demand shifts, and analyze parent hesitation factors.',
    plannedFeatures: [
      {
        title: 'Parent Consensus Tracking',
        desc: 'Analyze common hesitations (degree prestige, financial constraints, safety) across regions.',
      },
      {
        title: 'Stream Popularity Trends',
        desc: 'Real-time telemetry on student aspirations versus regional industry labor shortages.',
      },
      {
        title: 'Partner Training Centers',
        desc: 'Audit course completion rates, batch capacity, and placement verification ratios.',
      },
    ],
    icon: LayoutDashboard,
  },
};

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  route,
  onNavigate,
  contextCourse,
  onClearContextCourse,
}) => {
  const details = SECTION_DETAILS[route] || {
    title: 'SkillSaathi Section',
    subtitle: 'Under Development',
    badge: 'Upcoming Screen',
    description: 'This feature module will be implemented in subsequent phases.',
    plannedFeatures: [],
    icon: Sparkles,
  };

  const Icon = details.icon;

  return (
    <div className="placeholder-view">
      <div className="placeholder-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Icon size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {details.title}
              </h1>
              <Badge variant="primary" size="sm">
                {details.badge}
              </Badge>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)' }}>
              {details.subtitle}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={() => onNavigate(ROUTES.HOME)}
        >
          Back to Home
        </Button>
      </div>

      <div className="placeholder-body">
        {/* If user navigated from a course with active course context */}
        {route === ROUTES.COUNSELLING && contextCourse && (
          <div
            style={{
              backgroundColor: 'var(--color-primary-subtle)',
              border: '1px solid #bfdbfe',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                  Preserved Consultation Context
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {contextCourse.title}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  The AI Counsellor will address family concerns, wage benchmarks, and NEP credit transfer specifically for this course.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate(ROUTES.COURSES)}
              >
                Back to Courses
              </Button>
              {onClearContextCourse && (
                <button
                  type="button"
                  onClick={onClearContextCourse}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.8125rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                  }}
                >
                  Clear context
                </button>
              )}
            </div>
          </div>
        )}

        <p style={{ maxWidth: 760 }}>{details.description}</p>

        {details.plannedFeatures.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '1rem',
              }}
            >
              Planned Module Capabilities
            </h2>
            <div className="placeholder-card-grid">
              {details.plannedFeatures.map((feat) => (
                <Card key={feat.title} padding="md" as="article">
                  <h3
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.375rem',
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {feat.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1.25rem',
            backgroundColor: 'var(--color-surface-muted)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
              Ready for Next Phase Implementation
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Local mock datasets (`src/services/mocks/`) and TypeScript models are ready to power this screen.
            </div>
          </div>

          <Button variant="primary" size="sm" onClick={() => onNavigate(ROUTES.HOME)}>
            Return to Overview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderSection;
