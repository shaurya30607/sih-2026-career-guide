import React, { useState } from 'react';
import { ArrowRight, Compass, Users } from 'lucide-react';
import { ROUTES } from './routes';

export interface HomeScreenProps {
  onNavigate: (route: string) => void;
}

interface TradeLedgerItem {
  id: string;
  name: string;
  nsqfLevel: string;
  stipend: string;
  threeYearWage: string;
  degreeBridge: string;
  description: string;
}

const TRADE_LEDGER_DATA: TradeLedgerItem[] = [
  {
    id: 'ev-tech',
    name: 'Electric Vehicle Diagnostics',
    nsqfLevel: 'NSQF Level 5',
    stipend: '₹16,500 / month',
    threeYearWage: '₹42,000 / month',
    degreeBridge: 'Direct lateral entry into Year 2 B.Voc Automobile Engineering',
    description: 'Battery health management, motor controllers, regenerative braking systems, and EV powertrain inspection.',
  },
  {
    id: 'solar-pv',
    name: 'Solar Photovoltaic Grid Systems',
    nsqfLevel: 'NSQF Level 4',
    stipend: '₹14,000 / month',
    threeYearWage: '₹36,000 / month',
    degreeBridge: 'Lateral entry into Polytechnic Electrical & Renewable Energy Diploma',
    description: 'Grid-tied solar array commissioning, rooftop inverter diagnostics, string monitoring, and industrial safety.',
  },
  {
    id: 'cnc-robotics',
    name: 'Precision CNC & Industrial Robotics',
    nsqfLevel: 'NSQF Level 5',
    stipend: '₹17,500 / month',
    threeYearWage: '₹45,000 / month',
    degreeBridge: 'Direct lateral entry into Year 2 B.Voc Mechatronics & Automation',
    description: 'Multi-axis CNC programming, collaborative robotic arm maintenance, tolerance checking, and shop-floor automation.',
  },
  {
    id: 'health-tech',
    name: 'Clinical Medical Lab Technology',
    nsqfLevel: 'NSQF Level 4',
    stipend: '₹13,500 / month',
    threeYearWage: '₹35,000 / month',
    degreeBridge: 'Lateral admission into B.Sc Medical Laboratory Technology',
    description: 'Automated haematology analyzers, clinical pathology sample prep, molecular testing protocols, and lab quality standards.',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [selectedTrade, setSelectedTrade] = useState<TradeLedgerItem>(TRADE_LEDGER_DATA[0]);

  return (
    <div className="taste-home-wrapper">
      {/* 1. HERO: Two-by-Two Board (blueprint: two-by-two-board) */}
      <section className="taste-hero-board" aria-label="SkillSaathi Gazette Board">
        {/* Top 54px row of tiles */}
        <div className="taste-hero-top-row">
          <div className="taste-tile-mark" title="SkillSaathi Authority Mark">
            SS
          </div>
          <nav className="taste-tile-nav" aria-label="Hero navigation">
            <button
              type="button"
              className="taste-tile-nav-link"
              onClick={() => onNavigate(ROUTES.COURSES)}
            >
              Courses
            </button>
            <button
              type="button"
              className="taste-tile-nav-link"
              onClick={() => onNavigate(ROUTES.CAREER_PATHWAYS)}
            >
              Career Pathways
            </button>
            <button
              type="button"
              className="taste-tile-nav-link"
              onClick={() => onNavigate(ROUTES.COUNSELLING)}
            >
              Family Guidance
            </button>
            <button
              type="button"
              className="taste-tile-nav-link"
              onClick={() => onNavigate(ROUTES.ONBOARDING)}
            >
              Aptitude Profile
            </button>
          </nav>
          <button
            type="button"
            className="taste-tile-action"
            onClick={() => onNavigate(ROUTES.COURSES)}
          >
            Explore Courses
          </button>
        </div>

        {/* Two-by-Two Main Grid */}
        <div className="taste-hero-grid">
          {/* Top-Left: Paper tile with title */}
          <div className="taste-hero-tile-name">
            <h1 className="taste-hero-brand-title">SkillSaathi</h1>
            <p className="taste-hero-brand-sub">
              The National Vocational Qualification &amp; Career Pathway Gazette for Indian students and families.
            </p>
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
              <span className="taste-hero-tag-text">Accredited Standard</span>
              <p>Every technical trade verified against NCVET qualification frameworks.</p>
            </div>
            <div className="taste-hero-statement-accent">
              <span className="taste-hero-tag-text">Academic Mobility</span>
              <p>State apprenticeships that bridge directly into university degrees.</p>
            </div>
          </div>
        </div>

        {/* Hero Actions Bar */}
        <div className="taste-hero-action-bar">
          <button
            type="button"
            className="taste-btn-primary"
            onClick={() => onNavigate(ROUTES.COURSES)}
          >
            <Compass size={18} />
            Explore Vocational Courses
          </button>
          <button
            type="button"
            className="taste-btn-accent"
            onClick={() => onNavigate(ROUTES.COUNSELLING)}
          >
            <Users size={18} />
            Join Family Career Guidance
          </button>
        </div>
      </section>

      {/* 2. INTRO: Lead Over Four Columns (blueprint: intro-lead-over-four-columns) */}
      <section className="taste-intro-section" aria-labelledby="intro-lead-heading">
        <p id="intro-lead-heading" className="taste-intro-lead">
          India’s industrial modernization requires two million accredited technicians every year. We provide students and parents with verified blueprints for high-earning trades, state apprenticeships, and university credit bridges.
        </p>

        <div className="taste-intro-columns-grid">
          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">Who it serves. </span>
            Secondary school students and families weighing hands-on vocational technical careers against traditional academic coaching tracks.
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">What is certified. </span>
            Government NSQF qualifications, registered training institutes, and verified entry stipends from hiring industrial firms.
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">Where it advances. </span>
            From hands-on technician apprentice to shopfloor supervisor, with direct credit transfer into accredited B.Voc degrees under NCrF.
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">How families align. </span>
            Bilingual joint counselling dialogues designed to resolve parent questions regarding career prestige, job safety, and lifelong wage growth.
          </p>
        </div>
      </section>

      {/* 3. THE LIVE THING: Qualification & Stipend Ledger */}
      <section className="taste-ledger-section" aria-labelledby="ledger-heading">
        <div className="taste-ledger-header">
          <h2 id="ledger-heading" className="taste-ledger-heading">
            Live Qualification &amp; Stipend Ledger
          </h2>
          <p className="taste-ledger-subtitle">
            Select a verified technical specialization to inspect regulated stipends, skill levels, and degree mobility.
          </p>
        </div>

        {/* Trade Selector Tabs */}
        <div className="taste-ledger-tabs" role="tablist" aria-label="Trade sectors">
          {TRADE_LEDGER_DATA.map((trade) => (
            <button
              key={trade.id}
              type="button"
              role="tab"
              aria-selected={selectedTrade.id === trade.id}
              className={`taste-ledger-tab-btn ${selectedTrade.id === trade.id ? 'active' : ''}`}
              onClick={() => setSelectedTrade(trade)}
            >
              {trade.name}
            </button>
          ))}
        </div>

        {/* Selected Trade Data Board */}
        <div className="taste-ledger-board">
          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">Specialization Details</span>
            <p className="taste-ledger-title">{selectedTrade.name}</p>
            <p className="taste-ledger-desc">{selectedTrade.description}</p>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">Accreditation</span>
            <p className="taste-ledger-val-primary">{selectedTrade.nsqfLevel}</p>
            <span className="taste-ledger-subtext">NCVET Aligned</span>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">Entry Stipend</span>
            <p className="taste-ledger-val-accent">{selectedTrade.stipend}</p>
            <span className="taste-ledger-subtext">3-Yr Median: {selectedTrade.threeYearWage}</span>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">NCrF Degree Bridge</span>
            <p className="taste-ledger-bridge-title">Lateral Degree Path</p>
            <p className="taste-ledger-bridge-desc">{selectedTrade.degreeBridge}</p>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS: Lines that Step Across (blueprint: how-it-works-lines-that-step-across) */}
      <section className="taste-steps-section" aria-label="How SkillSaathi works">
        <div className="taste-steps-list">
          <div className="taste-step-stage taste-step-stage-0">
            <p className="taste-step-heading">First you discover.</p>
            <p className="taste-step-desc">
              Search accredited polytechnics, industrial training institutes, and skill universities across all Indian states.
            </p>
          </div>

          <div className="taste-step-stage taste-step-stage-1">
            <p className="taste-step-heading">Then parents align.</p>
            <p className="taste-step-desc">
              Participate in joint guided counselling sessions to compare verified earnings, employer demand, and career stability.
            </p>
          </div>

          <div className="taste-step-stage taste-step-stage-2">
            <p className="taste-step-heading">Credit bridges connect.</p>
            <p className="taste-step-desc">
              Accumulate academic credits under the National Credit Framework for direct transfer into formal degrees.
            </p>
          </div>

          <div className="taste-step-stage taste-step-stage-3">
            <p className="taste-step-heading accent">Apprenticeship begins.</p>
            <p className="taste-step-desc">
              Enter paid industrial training under government-regulated dual system contracts with registered monthly stipends.
            </p>
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE: One Image Across Tiles (blueprint: showcase-one-image-across-tiles) */}
      <section className="taste-mosaic-section" aria-label="Vocational Pillars Showcase">
        <div className="taste-mosaic-grid">
          <div className="taste-mosaic-tile">
            <img
              src="/images/showcase_solar.jpg"
              alt="Indian solar technician inspecting rooftop photovoltaic equipment"
            />
          </div>

          <div className="taste-mosaic-tile taste-mosaic-tile-info dark">
            <p className="taste-mosaic-lead-title">Green Energy &amp; EV</p>
            <p className="taste-mosaic-lead-desc">
              Solar microgrids, battery fabrication, and electric vehicle service hubs across 28 states.
            </p>
          </div>

          <div className="taste-mosaic-tile">
            <img
              src="/images/showcase_health.jpg"
              alt="Indian medical technician working with laboratory equipment"
            />
          </div>

          <div className="taste-mosaic-tile taste-mosaic-tile-info accent">
            <p className="taste-mosaic-lead-title">1,400+ Centers</p>
            <p className="taste-mosaic-lead-desc">
              Government and industry verified training workshops with modern toolchains.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PROOF: Plain Names in Columns (blueprint: proof-plain-columns) */}
      <section className="taste-proof-section" aria-labelledby="proof-heading">
        <div>
          <h2 id="proof-heading" className="taste-proof-heading">
            National Standards
          </h2>
        </div>

        <div className="taste-proof-columns">
          <div>
            <p className="taste-proof-col-kind">Regulatory Framework</p>
            <p className="taste-proof-item">NCVET Council</p>
            <p className="taste-proof-item">NSQF Framework</p>
            <p className="taste-proof-item">NCrF Credit System</p>
            <p className="taste-proof-item">Dual System Training</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">Sector Skill Councils</p>
            <p className="taste-proof-item">Automotive Skills Council</p>
            <p className="taste-proof-item">Green Jobs Council</p>
            <p className="taste-proof-item">Healthcare Sector Council</p>
            <p className="taste-proof-item">Electronics Sector Council</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">Employer Networks</p>
            <p className="taste-proof-item">Tata Motors EV</p>
            <p className="taste-proof-item">Larsen &amp; Toubro</p>
            <p className="taste-proof-item">Schneider Electric</p>
            <p className="taste-proof-item">Maruti Suzuki</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">State Missions</p>
            <p className="taste-proof-item">Kaushalya Karnataka</p>
            <p className="taste-proof-item">Maharashtra SSDI</p>
            <p className="taste-proof-item">UP Skill Mission</p>
            <p className="taste-proof-item">Gujarat Kaushalya</p>
          </div>
        </div>
      </section>

      {/* 7. CTA: The Idea Again, Inverted (blueprint: cta-idea-restated-inverted) */}
      <section className="taste-cta-section" aria-label="Closing Call to Action">
        <h2 className="taste-cta-headline">
          The skill is real. The degree is open.
        </h2>

        <div className="taste-cta-baseline">
          <p className="taste-cta-sentence">
            Begin your family’s guided vocational exploration today with verified accredited paths.
          </p>
          <button
            type="button"
            className="taste-btn-accent"
            onClick={() => onNavigate(ROUTES.COURSES)}
          >
            Explore Courses Now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
