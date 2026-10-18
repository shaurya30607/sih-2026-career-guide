import React, { useState } from 'react';
import { ArrowRight, Compass, Users, PhoneCall, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ROUTES } from './routes';
import { useTranslation } from '../i18n';

export interface HomeScreenProps {
  onNavigate: (route: string) => void;
}

interface TradeLedgerItem {
  id: string;
  nameEn: string;
  nameMr: string;
  nameHi: string;
  nsqfLevel: string;
  stipendEn: string;
  stipendMr: string;
  stipendHi: string;
  threeYearWageEn: string;
  threeYearWageMr: string;
  threeYearWageHi: string;
  degreeBridgeEn: string;
  degreeBridgeMr: string;
  degreeBridgeHi: string;
  descriptionEn: string;
  descriptionMr: string;
  descriptionHi: string;
}

const TRADE_LEDGER_DATA: TradeLedgerItem[] = [
  {
    id: 'ev-tech',
    nameEn: 'Electric Vehicle Diagnostics',
    nameMr: 'इलेक्ट्रिक वाहन (EV) तंत्रज्ञान व तपासणी',
    nameHi: 'इलेक्ट्रिक वाहन (EV) डायग्नोस्टिक्स व मरम्मत',
    nsqfLevel: 'NSQF Level 5',
    stipendEn: '₹16,500 / month',
    stipendMr: '₹१६,५०० / महिना',
    stipendHi: '₹१६,५०० / माह',
    threeYearWageEn: '₹42,000 / month',
    threeYearWageMr: '₹४२,००० / महिना',
    threeYearWageHi: '₹४२,००० / माह',
    degreeBridgeEn: 'Direct lateral entry into Year 2 B.Voc Automobile Engineering',
    degreeBridgeMr: 'बी.व्होक (B.Voc) ऑटोमोबाईल अभियांत्रिकीच्या दुसऱ्या वर्षात थेट प्रवेश',
    degreeBridgeHi: 'बी.वॉक (B.Voc) ऑटोमोबाइल इंजीनियरिंग के दूसरे वर्ष में सीधा लेटरल प्रवेश',
    descriptionEn: 'Battery health management, motor controllers, regenerative braking systems, and EV powertrain inspection.',
    descriptionMr: 'बॅटरी व्यवस्थापन, मोटर कंट्रोलर, ब्रेकिंग सिस्टीम आणि इलेक्ट्रिक वाहनांचे प्रत्यक्ष परीक्षण व दुरुस्ती.',
    descriptionHi: 'बैटरी स्वास्थ्य प्रबंधन, मोटर नियंत्रक, रीजेनरेटिव ब्रेकिंग सिस्टम और ईवी पावरट्रेन का प्रत्यक्ष निरीक्षण व मरम्मत।',
  },
  {
    id: 'solar-pv',
    nameEn: 'Solar Photovoltaic Grid Systems',
    nameMr: 'सौर ऊर्जा (Solar PV) ग्रीड यंत्रणा',
    nameHi: 'सौर ऊर्जा (Solar PV) ग्रिड प्रणालियां',
    nsqfLevel: 'NSQF Level 4',
    stipendEn: '₹14,000 / month',
    stipendMr: '₹१४,००० / महिना',
    stipendHi: '₹१४,००० / माह',
    threeYearWageEn: '₹36,000 / month',
    threeYearWageMr: '₹३६,००० / महिना',
    threeYearWageHi: '₹३६,००० / माह',
    degreeBridgeEn: 'Lateral entry into Polytechnic Electrical & Renewable Energy Diploma',
    degreeBridgeMr: 'पॉलिटेक्निक इलेक्ट्रिकल आणि अक्षय ऊर्जा डिप्लोमामध्ये थेट प्रवेश',
    degreeBridgeHi: 'पॉलीटेक्निक इलेक्ट्रिकल व नवीकरणीय ऊर्जा डिप्लोमा में सीधा लेटरल प्रवेश',
    descriptionEn: 'Grid-tied solar array commissioning, rooftop inverter diagnostics, string monitoring, and industrial safety.',
    descriptionMr: 'रूफटॉप सोलर पॅनेल बसवणे, इन्व्हर्टर दुरुस्ती, ग्रीड जोडणी आणि औद्योगिक सुरक्षितता मानके.',
    descriptionHi: 'रूफटॉप सोलर पैनल कमीशनिंग, इन्वर्टर डायग्नोस्टिक्स, ग्रिड सिंक्रोनाइज़ेशन और औद्योगिक सुरक्षा मानक।',
  },
  {
    id: 'cnc-robotics',
    nameEn: 'Precision CNC & Industrial Robotics',
    nameMr: 'प्रिसिजन सीएनसी (CNC) व औद्योगिक रोबोटिक्स',
    nameHi: 'प्रिसिजन सीएनसी (CNC) व औद्योगिक रोबोटिक्स',
    nsqfLevel: 'NSQF Level 5',
    stipendEn: '₹17,500 / month',
    stipendMr: '₹१७,५०० / महिना',
    stipendHi: '₹१७,५०० / माह',
    threeYearWageEn: '₹45,000 / month',
    threeYearWageMr: '₹४५,००० / महिना',
    threeYearWageHi: '₹४५,००० / माह',
    degreeBridgeEn: 'Direct lateral entry into Year 2 B.Voc Mechatronics & Automation',
    degreeBridgeMr: 'बी.व्होक (B.Voc) मेकॅट्रॉनिक्स व ऑटोमेशनच्या दुसऱ्या वर्षात थेट प्रवेश',
    degreeBridgeHi: 'बी.वॉक (B.Voc) मेकाट्रॉनिक्स व ऑटोमेशन के दूसरे वर्ष में सीधा लेटरल प्रवेश',
    descriptionEn: 'Multi-axis CNC programming, collaborative robotic arm maintenance, tolerance checking, and shop-floor automation.',
    descriptionMr: 'मल्टि-अ‍ॅक्सिस सीएनसी मशीन प्रोग्रामिंग, रोबोटिक आर्म देखभाल आणि कारखान्यातील स्वयंचलित यंत्रणा हाताळणी.',
    descriptionHi: 'मल्टी-एक्सिस सीएनसी प्रोग्रामिंग, सहयोगात्मक रोबोटिक आर्म रखरखाव और आधुनिक शॉप-फ्लोर ऑटोमेशन।',
  },
  {
    id: 'health-tech',
    nameEn: 'Clinical Medical Lab Technology',
    nameMr: 'क्लिनिकल मेडिकल लॅब तंत्रज्ञान',
    nameHi: 'क्लिनिकल मेडिकल लैब टेक्नोलॉजी',
    nsqfLevel: 'NSQF Level 4',
    stipendEn: '₹13,500 / month',
    stipendMr: '₹१३,५०० / महिना',
    stipendHi: '₹१३,५०० / माह',
    threeYearWageEn: '₹35,000 / month',
    threeYearWageMr: '₹३५,००० / महिना',
    threeYearWageHi: '₹३५,००० / माह',
    degreeBridgeEn: 'Lateral admission into B.Sc Medical Laboratory Technology',
    degreeBridgeMr: 'बी.एस्सी मेडिकल लॅबोरेटरी टेक्नॉलॉजी (B.Sc MLT) मध्ये थेट प्रवेश',
    degreeBridgeHi: 'बी.एससी मेडिकल लेबोरेटरी टेक्नोलॉजी (B.Sc MLT) में सीधा लेटरल प्रवेश',
    descriptionEn: 'Automated haematology analyzers, clinical pathology sample prep, molecular testing protocols, and lab quality standards.',
    descriptionMr: 'रक्त व पॅथॉलॉजी नमुने तपासणी, ऑटोमेटेड विश्लेषक यंत्रे चालवणे आणि लॅब दर्जा मानके.',
    descriptionHi: 'स्वचालित हेमेटोलॉजी विश्लेषक, पैथोलॉजी सैंपल तैयारी, डायग्नोस्टिक परीक्षण प्रोटोकॉल और लैब गुणवत्ता मानक।',
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { t, language } = useTranslation();
  const [selectedTrade, setSelectedTrade] = useState<TradeLedgerItem>(TRADE_LEDGER_DATA[0]);
  const [showTermExplainer, setShowTermExplainer] = useState<boolean>(false);

  const isMr = language === 'mr';
  const isHi = language === 'hi';
  const tradeName = isHi ? selectedTrade.nameHi : isMr ? selectedTrade.nameMr : selectedTrade.nameEn;
  const tradeDesc = isHi ? selectedTrade.descriptionHi : isMr ? selectedTrade.descriptionMr : selectedTrade.descriptionEn;
  const tradeStipend = isHi ? selectedTrade.stipendHi : isMr ? selectedTrade.stipendMr : selectedTrade.stipendEn;
  const tradeThreeYearWage = isHi ? selectedTrade.threeYearWageHi : isMr ? selectedTrade.threeYearWageMr : selectedTrade.threeYearWageEn;
  const tradeDegreeBridge = isHi ? selectedTrade.degreeBridgeHi : isMr ? selectedTrade.degreeBridgeMr : selectedTrade.degreeBridgeEn;

  return (
    <div className="taste-home-wrapper">
      {/* 1. HERO: Two-by-Two Board */}
      <section className="taste-hero-board" aria-label="SkillSaathi Hero Board">
        {/* Top 54px row of tiles - Clean brand bar without redundant nav */}
        <div className="taste-hero-top-row">
          <div className="taste-tile-mark" title="SkillSaathi Authority Mark">
            SS
          </div>
          <div className="taste-tile-nav" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)' }}>
              {t('home.heroTagline')}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'rgba(31, 43, 77, 0.08)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              {t('common.demoBadge')}
            </span>
          </div>
          <button
            type="button"
            className="taste-tile-action"
            onClick={() => onNavigate(ROUTES.COURSES)}
          >
            {t('home.actionFindCourse')}
          </button>
        </div>

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

      {/* 2. INTRO: Lead Over Four Columns */}
      <section className="taste-intro-section" aria-labelledby="intro-lead-heading">
        <p id="intro-lead-heading" className="taste-intro-lead">
          {t('home.introLead')}
        </p>

        <div className="taste-intro-columns-grid">
          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">{t('home.colWhoTitle')} </span>
            {t('home.colWhoDesc')}
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">{t('home.colCertTitle')} </span>
            {t('home.colCertDesc')}
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">{t('home.colAdvanceTitle')} </span>
            {t('home.colAdvanceDesc')}
          </p>

          <p className="taste-intro-col-text">
            <span className="taste-intro-run-in">{t('home.colAlignTitle')} </span>
            {t('home.colAlignDesc')}
          </p>
        </div>
      </section>

      {/* 3. THE LIVE THING: Qualification & Stipend Ledger */}
      <section className="taste-ledger-section" aria-labelledby="ledger-heading">
        <div className="taste-ledger-header">
          <h2 id="ledger-heading" className="taste-ledger-heading">
            {t('home.ledgerHeading')}
          </h2>
          <p className="taste-ledger-subtitle">
            {t('home.ledgerSubtitle')}
          </p>
        </div>

        {/* Trade Selector Tabs */}
        <div className="taste-ledger-tabs" role="tablist" aria-label={t('common.allSectors')}>
          {TRADE_LEDGER_DATA.map((trade) => {
            const label = isHi ? trade.nameHi : isMr ? trade.nameMr : trade.nameEn;
            const isSelected = selectedTrade.id === trade.id;
            return (
              <button
                key={trade.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`taste-ledger-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedTrade(trade)}
                style={{ minHeight: '44px' }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Selected Trade Data Board */}
        <div className="taste-ledger-board">
          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">{t('home.ledgerDetailLabel')}</span>
            <p className="taste-ledger-title">{tradeName}</p>
            <p className="taste-ledger-desc">{tradeDesc}</p>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">{t('home.ledgerAccreditationLabel')}</span>
            <p className="taste-ledger-val-primary">{selectedTrade.nsqfLevel}</p>
            <span className="taste-ledger-subtext">NCVET Aligned</span>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">{t('home.ledgerStipendLabel')}</span>
            <p className="taste-ledger-val-accent">{tradeStipend}</p>
            <span className="taste-ledger-subtext">
              {t('home.ledgerMedianSalary', { wage: tradeThreeYearWage })}
            </span>
          </div>

          <div className="taste-ledger-cell">
            <span className="taste-ledger-label">{t('home.ledgerBridgeLabel')}</span>
            <p className="taste-ledger-bridge-title">
              {isHi ? 'उच्च शिक्षा का मार्ग' : isMr ? 'उच्च शिक्षणाचा मार्ग' : 'Lateral Degree Path'}
            </p>
            <p className="taste-ledger-bridge-desc">{tradeDegreeBridge}</p>
          </div>
        </div>

        {/* Explainer Toggle: What do these terms mean? */}
        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            onClick={() => setShowTermExplainer((prev) => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: 'var(--color-primary, #1f2b4d)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              padding: '6px 0',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
            aria-expanded={showTermExplainer}
          >
            <HelpCircle size={16} />
            {t('common.whatDoesThisMean')}
            {showTermExplainer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showTermExplainer && (
            <div
              style={{
                marginTop: '12px',
                padding: '16px 20px',
                backgroundColor: 'var(--color-surface, #f4f4f2)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--color-primary, #1f2b4d)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                display: 'grid',
                gap: '10px',
              }}
            >
              <div>
                <strong>NSQF: </strong>
                {t('common.nsqfExplanation')}
              </div>
              <div>
                <strong>NCVET: </strong>
                {t('common.ncvetExplanation')}
              </div>
              <div>
                <strong>NCrF: </strong>
                {t('common.ncrfExplanation')}
              </div>
              <div style={{ color: '#666', fontStyle: 'italic', fontSize: '0.8125rem', marginTop: '4px' }}>
                * {t('common.demoDisclaimer')}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. HOW IT WORKS: Lines that Step Across */}
      <section className="taste-steps-section" aria-label={t('home.stepsHeading')}>
        <div className="taste-steps-list">
          <div className="taste-step-stage taste-step-stage-0">
            <p className="taste-step-heading">{t('home.step1Title')}</p>
            <p className="taste-step-desc">{t('home.step1Desc')}</p>
          </div>

          <div className="taste-step-stage taste-step-stage-1">
            <p className="taste-step-heading">{t('home.step2Title')}</p>
            <p className="taste-step-desc">{t('home.step2Desc')}</p>
          </div>

          <div className="taste-step-stage taste-step-stage-2">
            <p className="taste-step-heading">{t('home.step3Title')}</p>
            <p className="taste-step-desc">{t('home.step3Desc')}</p>
          </div>

          <div className="taste-step-stage taste-step-stage-3">
            <p className="taste-step-heading accent">{t('home.step4Title')}</p>
            <p className="taste-step-desc">{t('home.step4Desc')}</p>
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE: One Image Across Tiles */}
      <section className="taste-mosaic-section" aria-label={t('home.showcaseTitle')}>
        <div className="taste-mosaic-grid">
          <div className="taste-mosaic-tile">
            <img
              src="/images/showcase_solar.jpg"
              alt="Indian solar technician inspecting rooftop photovoltaic equipment"
            />
          </div>

          <div className="taste-mosaic-tile taste-mosaic-tile-info dark">
            <p className="taste-mosaic-lead-title">{t('home.showcaseSolarTitle')}</p>
            <p className="taste-mosaic-lead-desc">{t('home.showcaseSolarDesc')}</p>
          </div>

          <div className="taste-mosaic-tile">
            <img
              src="/images/showcase_health.jpg"
              alt="Indian medical technician working with laboratory equipment"
            />
          </div>

          <div className="taste-mosaic-tile taste-mosaic-tile-info accent">
            <p className="taste-mosaic-lead-title">{t('home.showcaseCentersTitle')}</p>
            <p className="taste-mosaic-lead-desc">{t('home.showcaseCentersDesc')}</p>
          </div>
        </div>
      </section>

      {/* 6. PROOF: Plain Names in Columns */}
      <section className="taste-proof-section" aria-labelledby="proof-heading">
        <div>
          <h2 id="proof-heading" className="taste-proof-heading">
            {t('home.proofHeading')}
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#666', marginTop: '6px' }}>
            {t('home.proofDisclaimer')}
          </p>
        </div>

        <div className="taste-proof-columns">
          <div>
            <p className="taste-proof-col-kind">{t('home.proofRegulatory')}</p>
            <p className="taste-proof-item">NCVET Council</p>
            <p className="taste-proof-item">NSQF Framework</p>
            <p className="taste-proof-item">NCrF Credit System</p>
            <p className="taste-proof-item">Dual System Training (DST)</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">{t('home.proofCouncils')}</p>
            <p className="taste-proof-item">Automotive Skills Council (ASDC)</p>
            <p className="taste-proof-item">Skill Council for Green Jobs (SCGJ)</p>
            <p className="taste-proof-item">Healthcare Sector Skill Council (HSSC)</p>
            <p className="taste-proof-item">Electronics Sector Skills Council (ESSCI)</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">{t('home.proofEmployers')}</p>
            <p className="taste-proof-item">Tata Motors EV Division</p>
            <p className="taste-proof-item">Larsen &amp; Toubro Construction</p>
            <p className="taste-proof-item">Schneider Electric India</p>
            <p className="taste-proof-item">Maruti Suzuki Training Academy</p>
          </div>

          <div>
            <p className="taste-proof-col-kind">{t('home.proofMissions')}</p>
            <p className="taste-proof-item">Kaushalya Karnataka</p>
            <p className="taste-proof-item">Maharashtra SSDI (MSSDS)</p>
            <p className="taste-proof-item">UP Skill Development Mission</p>
            <p className="taste-proof-item">Gujarat Kaushalya Vikas</p>
          </div>
        </div>
      </section>

      {/* 7. CTA: The Idea Again, Inverted */}
      <section className="taste-cta-section" aria-label="Closing Call to Action">
        <h2 className="taste-cta-headline">
          {t('home.ctaHeadline')}
        </h2>

        <div className="taste-cta-baseline">
          <p className="taste-cta-sentence">
            {t('home.ctaBaseline')}
          </p>
          <button
            type="button"
            className="taste-btn-accent"
            onClick={() => onNavigate(ROUTES.COURSES)}
            style={{ minHeight: '44px' }}
          >
            {t('home.actionExploreNow')}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
