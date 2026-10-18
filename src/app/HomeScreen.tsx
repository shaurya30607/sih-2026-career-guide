import React from 'react';
import {
  Compass,
  TrendingUp,
  Users,
  ArrowRight,
  MessageSquareQuote,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ROUTES } from './routes';

export interface HomeScreenProps {
  onNavigate: (route: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="home-screen">
      {/* Welcoming Hero Section */}
      <section className="home-hero" aria-labelledby="home-hero-heading">
        <div className="home-hero-badge-row">
          <Badge variant="primary" size="md" icon={<Sparkles size={14} />}>
            Vocational Education · NSQF & NCVET Aligned
          </Badge>
        </div>

        <h1 id="home-hero-heading" className="home-hero-title">
          Every career begins with the right guidance.
        </h1>

        <p className="home-hero-description">
          SkillSaathi brings students and parents together to explore high-growth vocational
          skills, discover accredited technical courses, and understand authentic industry earnings
          and career ladders in India.
        </p>

        <div className="home-hero-actions">
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
            onClick={() => onNavigate(ROUTES.COURSES)}
          >
            Explore Courses
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={<MessageSquareQuote size={18} />}
            onClick={() => onNavigate(ROUTES.COUNSELLING)}
          >
            Family Career Guidance
          </Button>

          <Button
            variant="outline"
            size="lg"
            icon={<Compass size={18} />}
            onClick={() => onNavigate(ROUTES.ONBOARDING)}
          >
            Start 1-Min Profiling
          </Button>
        </div>
      </section>

      {/* Feature Pillars: 3 Small Feature Cards */}
      <section aria-labelledby="features-heading">
        <div className="home-features-heading-area">
          <h2 id="features-heading" className="home-features-title">
            How SkillSaathi Works for Families
          </h2>
          <p className="home-features-desc">
            Empowering students and parents with clarity, credibility, and shared decision-making.
          </p>
        </div>

        <div className="home-features-grid">
          {/* Card 1: Discover Your Path */}
          <Card
            interactive
            padding="lg"
            onClick={() => onNavigate(ROUTES.COURSES)}
            icon={<Compass size={22} />}
            badge={<Badge variant="primary" size="sm">Step 1</Badge>}
            title="Discover Your Path"
            subtitle="Accredited technical skills"
            footer={
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                Browse vocational courses <ArrowRight size={14} />
              </span>
            }
          >
            Discover hands-on courses in EV diagnostics, solar PV technology, healthcare, and IT.
            Compare transparent eligibility, government affiliations, and verified practical training centers.
          </Card>

          {/* Card 2: Understand Career Opportunities */}
          <Card
            interactive
            padding="lg"
            onClick={() => onNavigate(ROUTES.CAREER_PATHWAYS)}
            icon={<TrendingUp size={22} />}
            badge={<Badge variant="secondary" size="sm">Step 2</Badge>}
            title="Understand Career Opportunities"
            subtitle="Verified earnings & mobility"
            footer={
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                Inspect career trajectories <ArrowRight size={14} />
              </span>
            }
          >
            Gain complete visibility into initial entry wages, apprentice stipends, and rapid
            promotion ladders leading to supervisory roles and degree pathways under NEP credit frameworks.
          </Card>

          {/* Card 3: Make Decisions Together */}
          <Card
            interactive
            padding="lg"
            onClick={() => onNavigate(ROUTES.COUNSELLING)}
            icon={<Users size={22} />}
            badge={<Badge variant="info" size="sm">Step 3</Badge>}
            title="Make Decisions Together"
            subtitle="Joint family consensus"
            footer={
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-info-text)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                Start family dialogue <ArrowRight size={14} />
              </span>
            }
          >
            Bridge parental concerns regarding job stability and social prestige with student
            interests. Facilitate collaborative dialogues in your preferred regional language.
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
