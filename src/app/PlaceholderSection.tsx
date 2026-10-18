import React, { useState } from 'react';
import {
  ArrowLeft,
  Route,
  Users,
  LayoutDashboard,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ROUTES } from './routes';
import { useTranslation } from '../i18n';

export interface PlaceholderSectionProps {
  route: string;
  onNavigate: (route: string) => void;
  contextCourse?: { id: string; title: string } | null;
  onClearContextCourse?: () => void;
}

export const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  route,
  onNavigate,
}) => {
  const { t, language } = useTranslation();
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  // State for Counsellor Support Form
  const [counsellorForm, setCounsellorForm] = useState({
    name: '',
    phone: '',
    role: 'joint',
    district: '',
    topic: 'course_choice',
  });
  const [counsellorSubmitted, setCounsellorSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCounsellorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counsellorForm.name.trim() || !counsellorForm.phone.trim()) {
      setFormError(isHi ? 'कृपया अपना नाम और मोबाइल नंबर दर्ज करें।' : isMr ? 'कृपया आपले नाव आणि मोबाईल नंबर भरा.' : 'Please provide your name and phone number.');
      return;
    }
    setFormError(null);
    setCounsellorSubmitted(true);
  };

  // Route 1: Counsellor Support Dedicated View
  if (route === ROUTES.COUNSELLOR_SUPPORT) {
    return (
      <div className="placeholder-view" style={{ maxWidth: '840px', margin: '0 auto', padding: '1rem' }}>
        {/* Header */}
        <div className="placeholder-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-subtle, #e0e7ff)',
                color: 'var(--color-primary, #1f2b4d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <PhoneCall size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary, #1f2b4d)', margin: '0 0 0.25rem 0' }}>
                {t('counsellor.title')}
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted, #6a7186)', margin: 0 }}>
                {t('counsellor.subtitle')}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => onNavigate(ROUTES.HOME)}
            style={{ minHeight: '44px' }}
          >
            {isHi ? 'मुख्य पृष्ठ पर जाएं' : isMr ? 'मुख्यपृष्ठावर जा' : 'Back to Home'}
          </Button>
        </div>

        {/* Prototype Transparency Notice */}
        <div
          style={{
            backgroundColor: 'var(--color-surface, #f4f4f2)',
            borderLeft: '4px solid var(--color-primary, #1f2b4d)',
            padding: '14px 18px',
            borderRadius: '6px',
            marginBottom: '1.75rem',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: 'var(--color-ink, #1f2b4d)',
          }}
        >
          <strong>{isHi ? 'प्रोटोटाइप सूचना: ' : isMr ? 'प्रात्यक्षिक सूचना: ' : 'Prototype Notice: '}</strong>
          {t('counsellor.prototypeNotice')}
        </div>

        {/* Form or Confirmation */}
        {counsellorSubmitted ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              borderRadius: '12px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-text-primary, #1f2b4d)', marginBottom: '0.5rem' }}>
              {t('counsellor.successTitle')}
            </h2>

            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary, #3b4561)', maxWidth: '580px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              {t('counsellor.successDesc')}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-surface, #f4f4f2)',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '440px',
                margin: '0 auto 1.5rem auto',
                textAlign: 'left',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              <div><strong>{isHi ? 'नाम:' : isMr ? 'नाव:' : 'Name:'}</strong> {counsellorForm.name}</div>
              <div><strong>{isHi ? 'मोबाइल:' : isMr ? 'मोबाईल:' : 'Phone:'}</strong> {counsellorForm.phone}</div>
              <div><strong>{isHi ? 'जिला:' : isMr ? 'जिल्हा:' : 'District:'}</strong> {counsellorForm.district || (isHi ? 'उल्लेख नहीं' : isMr ? 'उल्लेख नाही' : 'Not specified')}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate(ROUTES.HOME)}
                style={{ minHeight: '44px' }}
              >
                {t('counsellor.successAction')}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setCounsellorSubmitted(false);
                  setCounsellorForm({ name: '', phone: '', role: 'joint', district: '', topic: 'course_choice' });
                }}
                style={{ minHeight: '44px' }}
              >
                {isHi ? 'अन्य अनुरोध भेजें' : isMr ? 'नवीन विनंती करा' : 'Submit Another Request'}
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleCounsellorSubmit}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'grid',
              gap: '1.25rem',
            }}
          >
            {formError && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#991b1b',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                }}
              >
                {formError}
              </div>
            )}

            <div>
              <label
                htmlFor="counsellor-name"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', marginBottom: '6px' }}
              >
                {t('counsellor.formName')} *
              </label>
              <input
                id="counsellor-name"
                type="text"
                required
                value={counsellorForm.name}
                onChange={(e) => setCounsellorForm({ ...counsellorForm, name: e.target.value })}
                placeholder={isHi ? 'उदा. राहुल शर्मा' : isMr ? 'उदा. राहुल शिंदे' : 'e.g. Rahul Shinde'}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1.5px solid var(--color-border, #e5e5e3)',
                  fontSize: '0.9375rem',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="counsellor-phone"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', marginBottom: '6px' }}
              >
                {t('counsellor.formPhone')} *
              </label>
              <input
                id="counsellor-phone"
                type="tel"
                required
                value={counsellorForm.phone}
                onChange={(e) => setCounsellorForm({ ...counsellorForm, phone: e.target.value })}
                placeholder={isMr ? 'उदा. 98200XXXXX' : 'e.g. 98200XXXXX'}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1.5px solid var(--color-border, #e5e5e3)',
                  fontSize: '0.9375rem',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="counsellor-role"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', marginBottom: '6px' }}
                >
                  {t('counsellor.formRole')}
                </label>
                <select
                  id="counsellor-role"
                  value={counsellorForm.role}
                  onChange={(e) => setCounsellorForm({ ...counsellorForm, role: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1.5px solid var(--color-border, #e5e5e3)',
                    fontSize: '0.9375rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="student">{t('counsellor.roleStudent')}</option>
                  <option value="parent">{t('counsellor.roleParent')}</option>
                  <option value="joint">{t('counsellor.roleJoint')}</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="counsellor-district"
                  style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', marginBottom: '6px' }}
                >
                  {t('counsellor.formDistrict')}
                </label>
                <input
                  id="counsellor-district"
                  type="text"
                  value={counsellorForm.district}
                  onChange={(e) => setCounsellorForm({ ...counsellorForm, district: e.target.value })}
                  placeholder={isHi ? 'उदा. पुणे / नासिक' : isMr ? 'उदा. पुणे / नाशिक' : 'e.g. Pune / Nashik'}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '0 12px',
                    borderRadius: '6px',
                    border: '1.5px solid var(--color-border, #e5e5e3)',
                    fontSize: '0.9375rem',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="counsellor-topic"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', marginBottom: '6px' }}
              >
                {t('counsellor.formTopic')}
              </label>
              <select
                id="counsellor-topic"
                value={counsellorForm.topic}
                onChange={(e) => setCounsellorForm({ ...counsellorForm, topic: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '44px',
                  padding: '0 12px',
                  borderRadius: '6px',
                  border: '1.5px solid var(--color-border, #e5e5e3)',
                  fontSize: '0.9375rem',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="course_choice">{t('counsellor.topicCourseChoice')}</option>
                <option value="job_security">{t('counsellor.topicJobSecurity')}</option>
                <option value="degree_bridge">{t('counsellor.topicDegreeBridge')}</option>
                <option value="financial_aid">{t('counsellor.topicFinancialAid')}</option>
                <option value="general">{t('counsellor.topicGeneral')}</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-text-muted, #6a7186)' }}>
              <ShieldCheck size={16} aria-hidden="true" style={{ color: '#059669', flexShrink: 0 }} />
              <span>{t('counsellor.privacyNote')}</span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              style={{ minHeight: '48px', justifyContent: 'center', fontWeight: 700 }}
            >
              {t('counsellor.submitBtn')}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Route 2: Career Progression Pathways
  if (route === ROUTES.CAREER_PATHWAYS) {
    return (
      <div className="placeholder-view" style={{ maxWidth: '840px', margin: '0 auto', padding: '1rem' }}>
        <div className="placeholder-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-subtle, #e0e7ff)',
                color: 'var(--color-primary, #1f2b4d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Route size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary, #1f2b4d)', margin: '0 0 0.25rem 0' }}>
                {t('careerOptions.title')}
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted, #6a7186)', margin: 0 }}>
                {t('careerOptions.subtitle')}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => onNavigate(ROUTES.HOME)}
            style={{ minHeight: '44px' }}
          >
            {isHi ? 'मुख्य पृष्ठ पर जाएं' : isMr ? 'मुख्यपृष्ठावर जा' : 'Back to Home'}
          </Button>
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-secondary, #3b4561)', marginBottom: '1.5rem' }}>
          {t('careerOptions.description')}
        </p>

        {/* Visual Ladder */}
        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              borderRadius: '8px',
              borderLeft: '5px solid var(--color-primary, #1f2b4d)',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary, #1f2b4d)' }}>
              {isHi ? 'चरण १' : isMr ? 'टप्पा १' : 'Step 1'}
            </span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '4px 0' }}>
              {t('careerOptions.step1')}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
              {isHi
                ? 'मान्यता प्राप्त आईटीआई या पॉलिटेक्निक में प्रवेश और निश्चित मासिक मानदेय के साथ ऑन-द-जॉब औद्योगिक प्रशिक्षण।'
                : isMr
                ? 'शासकीय मान्यताप्राप्त आयटीआय किंवा तंत्रनिकेतनमध्ये प्रवेश आणि दरमहा निश्चित मानधनासह प्रत्यक्ष औद्योगिक प्रशिक्षण.'
                : 'Accredited training at registered ITI or polytechnic with dual system on-the-job apprenticeship and stipend.'}
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              borderRadius: '8px',
              borderLeft: '5px solid var(--color-accent, #f7941d)',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent, #f7941d)' }}>
              {isHi ? 'चरण २' : isMr ? 'टप्पा २' : 'Step 2'}
            </span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '4px 0' }}>
              {t('careerOptions.step2')}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
              {isHi
                ? 'राष्ट्रीय कौशल स्तर (NSQF Level 4-5) प्रमाण पत्र और उद्योग में तकनीशियन के रूप में नियमित रोजगार।'
                : isMr
                ? 'राष्ट्रीय कौशल्य पातळी (NSQF Level 4-5) प्रमाणपत्र आणि कारखान्यात प्रत्यक्ष तंत्रज्ञ म्हणून नियमित नोकरी.'
                : 'Certified technician role with confirmed industry benchmark wages and workplace responsibility.'}
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-border, #e5e5e3)',
              borderRadius: '8px',
              borderLeft: '5px solid #059669',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#059669' }}>
              {isHi ? 'चरण ३' : isMr ? 'टप्पा ३' : 'Step 3'}
            </span>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '4px 0' }}>
              {t('careerOptions.step3')}
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
              {isHi
                ? 'राष्ट्रीय क्रेडिट फ्रेमवर्क (NCrF) द्वारा बी.वॉक या इंजीनियरिंग डिग्री पूरी करना, अथवा वरिष्ठ पर्यवेक्षक / उद्यमी बनना।'
                : isMr
                ? 'राष्ट्रीय क्रेडिट पद्धतीद्वारे (NCrF) बी.व्होक किंवा अभियांत्रिकी पदवी पूर्ण करणे, अथवा वरिष्ठ पर्यवेक्षक / स्वतःचा व्यवसाय सुरू करणे.'
                : 'Lateral degree completion via National Credit Framework or progression to supervisor and entrepreneur.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            size="md"
            icon={<Compass size={18} />}
            onClick={() => onNavigate(ROUTES.COURSES)}
            style={{ minHeight: '44px' }}
          >
            {t('home.actionFindCourse')}
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={<Users size={18} />}
            onClick={() => onNavigate(ROUTES.COUNSELLING)}
            style={{ minHeight: '44px' }}
          >
            {t('home.actionStartGuidance')}
          </Button>
        </div>
      </div>
    );
  }

  // Route 3: Admin Dashboard (Separated Staff Portal)
  if (route === ROUTES.ADMIN_DASHBOARD) {
    return (
      <div className="placeholder-view" style={{ maxWidth: '840px', margin: '0 auto', padding: '1rem' }}>
        <div className="placeholder-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                backgroundColor: 'var(--color-primary-subtle, #e0e7ff)',
                color: 'var(--color-primary, #1f2b4d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <LayoutDashboard size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary, #1f2b4d)', margin: '0 0 0.25rem 0' }}>
                  {t('admin.title')}
                </h1>
                <Badge variant="neutral" size="sm">
                  {t('admin.badge')}
                </Badge>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted, #6a7186)', margin: 0 }}>
                {t('admin.subtitle')}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => onNavigate(ROUTES.HOME)}
            style={{ minHeight: '44px' }}
          >
            {isHi ? 'मुख्य पृष्ठ पर जाएं' : isMr ? 'मुख्यपृष्ठावर जा' : 'Back to Home'}
          </Button>
        </div>

        {/* Staff Notice */}
        <div
          style={{
            backgroundColor: '#eff6ff',
            borderLeft: '4px solid #3b82f6',
            padding: '14px 18px',
            borderRadius: '6px',
            marginBottom: '1.75rem',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: '#1e3a8a',
          }}
        >
          <strong>{isHi ? 'सूचना: ' : isMr ? 'सूचना: ' : 'Notice: '}</strong>
          {t('admin.disclaimer')}
        </div>

        <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary, #3b4561)', marginBottom: '1.5rem' }}>
          {t('admin.description')}
        </p>

        {/* Demo Telemetry Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border, #e5e5e3)', borderRadius: '8px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', textTransform: 'uppercase' }}>
              {isHi ? 'कुल पंजीकृत सत्र' : isMr ? 'एकूण नोंदणीकृत सत्रे' : 'Total Guidance Sessions'}
            </span>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary, #1f2b4d)', margin: '4px 0 0 0' }}>
              12,480
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border, #e5e5e3)', borderRadius: '8px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', textTransform: 'uppercase' }}>
              {isHi ? 'अभिभावक सहमति दर' : isMr ? 'पालक संमती प्रमाण' : 'Parent Consensus Rate'}
            </span>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', margin: '4px 0 0 0' }}>
              84.2%
            </p>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--color-border, #e5e5e3)', borderRadius: '8px', padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', textTransform: 'uppercase' }}>
              {isHi ? 'शीर्ष मांग वाला क्षेत्र' : isMr ? 'प्रमुख क्षेत्र' : 'Top In-Demand Sector'}
            </span>
            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent, #f7941d)', margin: '8px 0 0 0' }}>
              {isHi ? 'हरित ऊर्जा व EV' : isMr ? 'हरित ऊर्जा व EV' : 'Green Energy & EV'}
            </p>
          </div>
        </div>

        <Button variant="primary" size="md" onClick={() => onNavigate(ROUTES.HOME)} style={{ minHeight: '44px' }}>
          {isHi ? 'छात्र मार्गदर्शन पर वापस जाएं' : isMr ? 'विद्यार्थी मार्गदर्शनावर परत जा' : 'Return to Student Guidance'}
        </Button>
      </div>
    );
  }

  // Fallback for any other route
  return (
    <div className="placeholder-view" style={{ maxWidth: '840px', margin: '0 auto', padding: '1rem' }}>
      <div className="placeholder-header">
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>SkillSaathi</h1>
        <Button variant="outline" size="sm" onClick={() => onNavigate(ROUTES.HOME)}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PlaceholderSection;
