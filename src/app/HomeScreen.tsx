import React from 'react';
import { Compass, Users, PhoneCall } from 'lucide-react';
import { ROUTES } from './routes';
import { useTranslation } from '../i18n';

export interface HomeScreenProps {
  onNavigate: (route: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="taste-home-wrapper">
      {/* HERO: Two-by-Two Board */}
      <section className="taste-hero-board" aria-label="SkillSaathi Hero Board">
        {/* Two-by-Two Main Grid */}
        <div className="taste-hero-grid">
          {/* Top-Left: Paper tile with title */}
          <div className="taste-hero-tile-name">
            <h1 className="taste-hero-brand-title">{t('home.heroTitle')}</h1>
            <p className="taste-hero-brand-sub">{t('home.heroDescription')}</p>
          </div>

          {/* Top-Right: Real Documentary Photograph with Shutter Entrance */}
          <div className="taste-hero-tile-photo taste-shutter-anim">
            <img
              src="/images/hero_tech_1.jpg"
              alt="Indian engineering technician in a clean modern vocational laboratory working with electronic diagnostics"
            />
          </div>

          {/* Bottom-Left: Real Technical Workshop Photograph */}
          <div className="taste-hero-tile-photo">
            <img
              src="/images/hero_tech_2.jpg"
              alt="Indian apprentices and instructor inspecting industrial robotics in a technical institute"
            />
          </div>

          {/* Bottom-Right: Split Solid Statement Tiles */}
          <div className="taste-hero-tile-split">
            <div className="taste-hero-statement-dark">
              <span className="taste-hero-tag-text">{t('home.tileAccreditedTitle')}</span>
              <p>{t('home.tileAccreditedDesc')}</p>
            </div>
            <div className="taste-hero-statement-accent">
              <span className="taste-hero-tag-text">{t('home.tileMobilityTitle')}</span>
              <p>{t('home.tileMobilityDesc')}</p>
            </div>
          </div>
        </div>

        {/* Hero Actions Bar - 3 clear next steps */}
        <div className="taste-hero-action-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            className="taste-btn-primary"
            onClick={() => onNavigate(ROUTES.COURSES)}
            style={{ minHeight: '44px' }}
          >
            <Compass size={18} />
            {t('home.actionFindCourse')}
          </button>
          <button
            type="button"
            className="taste-btn-accent"
            onClick={() => onNavigate(ROUTES.COUNSELLING)}
            style={{ minHeight: '44px' }}
          >
            <Users size={18} />
            {t('home.actionStartGuidance')}
          </button>
          <button
            type="button"
            className="taste-btn-outline"
            onClick={() => onNavigate(ROUTES.COUNSELLOR_SUPPORT)}
            style={{
              minHeight: '44px',
              padding: '0 20px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.9375rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              color: 'var(--color-ink, #1f2b4d)',
              cursor: 'pointer',
            }}
          >
            <PhoneCall size={18} />
            {t('home.actionTalkCounsellor')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
