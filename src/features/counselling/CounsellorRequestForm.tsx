import React, { useState } from 'react';
import { X, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { CounsellingLanguage } from './counsellingContent';

export interface CounsellorRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  language: CounsellingLanguage;
  courseTitle?: string;
}

export const CounsellorRequestForm: React.FC<CounsellorRequestFormProps> = ({
  isOpen,
  onClose,
  language,
  courseTitle,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  const [concernCategory, setConcernCategory] = useState<string>('degree_vs_vocational');
  const [preferredLang, setPreferredLang] = useState<string>(isHi ? 'hindi' : isMr ? 'marathi' : 'english');
  const [contactMethod, setContactMethod] = useState<string>('whatsapp');
  const [contactField, setContactField] = useState<string>('');
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConsented) return;
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="escalation-dialog-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          width: '100%',
          maxWidth: '520px',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close Button */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <IconButton
            icon={<X size={18} />}
            ariaLabel={isHi ? 'विंडो बंद करें' : isMr ? 'खिडकी बंद करा' : 'Close modal'}
            onClick={handleResetAndClose}
            variant="ghost"
            size="sm"
          />
        </div>

        {isSubmitted ? (
          /* Confirmation View */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              {isHi ? 'परामर्श अनुरोध दर्ज किया गया!' : isMr ? 'समुपदेशन विनंती नोंदवली गेली!' : 'Counselling Request Registered!'}
            </h3>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {isHi
                ? 'प्रोटोटाइप डेमो पुष्टि: वास्तविक व्यवस्था में, जिला व्यावसायिक मार्गदर्शन अधिकारी परिवार के सत्र के लिए 24 घंटों के भीतर आपसे संपर्क करेंगे।'
                : isMr
                ? 'प्रोटोटाइप प्रात्यक्षिक: खऱ्या वातावरणात जिल्हा कौशल्य मार्गदर्शन अधिकारी आपल्याशी २४ तासांत संपर्क साधतील.'
                : 'Prototype Demo Confirmation: In a live deployment, an accredited district vocational counsellor would reach out within 24 hours to schedule your family session.'}
            </p>

            <div
              style={{
                backgroundColor: 'var(--color-surface-muted)',
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8125rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.5rem',
                textAlign: 'left',
              }}
            >
              <div><strong>{isHi ? 'विषय:' : isMr ? 'विषय:' : 'Concern:'}</strong> {concernCategory}</div>
              <div><strong>{isHi ? 'भाषा:' : isMr ? 'भाषा:' : 'Language:'}</strong> {preferredLang}</div>
              <div><strong>{isHi ? 'माध्यम:' : isMr ? 'माध्यम:' : 'Method:'}</strong> {contactMethod}</div>
              {courseTitle && <div><strong>{isHi ? 'कोर्स:' : isMr ? 'कोर्स:' : 'Course:'}</strong> {courseTitle}</div>}
            </div>

            <Button variant="primary" size="md" onClick={handleResetAndClose} fullWidth>
              {isHi ? 'बातचीत पर वापस जाएं' : isMr ? 'संभाषणावर परत जा' : 'Return to Conversation'}
            </Button>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <PhoneCall size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <h2 id="escalation-dialog-title" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isHi ? 'मानव परामर्शदाता से बात करें' : isMr ? 'मानवी तज्ज्ञ समुपदेशकांशी बोला' : 'Talk to a Human Counsellor'}
              </h2>
            </div>

            <p style={{ fontSize: '0.84375rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.45 }}>
              {isHi
                ? 'पारिवारिक सहमति, फीस छूट और डिग्री समकक्षता पर जिला कौशल मार्गदर्शन विशेषज्ञ से निःशुल्क व्यक्तिगत सलाह लें।'
                : isMr
                ? 'कौटुंबिक मतभेद, फी सवलती किंवा पदवी समकक्षतेबाबत जिल्हा कौशल्य तज्ज्ञांशी वैयक्तिक सल्लामसलत करा.'
                : 'Request a free 1-on-1 consultation with a district vocational guidance officer to discuss family alignment and fees.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Concern Category */}
              <div>
                <label htmlFor="concern-select" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                  {isHi ? 'मुख्य परामर्श विषय:' : isMr ? 'मुख्य समुपदेशन विषय:' : 'Primary Discussion Area:'}
                </label>
                <select
                  id="concern-select"
                  value={concernCategory}
                  onChange={(e) => setConcernCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-strong)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <option value="degree_vs_vocational">
                    {isHi ? 'पारंपरिक डिग्री (BA/B.Com) बनाम वोकेशनल कोर्स' : isMr ? 'पारंपरिक पदवी (BA/B.Com) विरुद्ध कौशल्य कोर्स' : 'Traditional Degree vs. Vocational Trade'}
                  </option>
                  <option value="financial_aid">
                    {isHi ? 'फीस, छात्रवृत्ति और सरकारी अनुदान' : isMr ? 'फी, शिष्यवृत्ती व सरकारी अनुदान' : 'Fees, Scholarships & PMKVY Subsidies'}
                  </option>
                  <option value="job_security">
                    {isHi ? 'नौकरी की सुरक्षा और स्थानीय औद्योगिक रोजगार' : isMr ? 'नोकरीची शाश्वती व स्थानिक कंपन्या' : 'Job Security & Local MIDC Hiring'}
                  </option>
                  <option value="bvoc_pathway">
                    {isHi ? 'NEP 2020 द्वारा B.Voc डिग्री प्रगति' : isMr ? 'NEP 2020 द्वारे B.Voc पदवी प्रगती' : 'Credit Transfer to Higher B.Voc Degree'}
                  </option>
                </select>
              </div>

              {/* Preferred Language & Contact Mode */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label htmlFor="lang-pref-select" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                    {isHi ? 'बातचीत की भाषा:' : isMr ? 'संभाषणाची भाषा:' : 'Preferred Language:'}
                  </label>
                  <select
                    id="lang-pref-select"
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-strong)',
                      backgroundColor: 'var(--color-bg)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <option value="hindi">हिंदी (Hindi)</option>
                    <option value="marathi">मराठी (Marathi)</option>
                    <option value="english">English</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-method-select" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                    {isHi ? 'संपर्क माध्यम:' : isMr ? 'संपर्क माध्यम:' : 'Contact Method:'}
                  </label>
                  <select
                    id="contact-method-select"
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-strong)',
                      backgroundColor: 'var(--color-bg)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="phone">Phone Call</option>
                    <option value="video">Google Meet / Video</option>
                  </select>
                </div>
              </div>

              {/* Optional Demo Contact Field */}
              <div>
                <label htmlFor="demo-contact-input" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                  {isHi ? 'संपर्क नंबर या ईमेल (वैकल्पिक / डेमो):' : isMr ? 'संपर्क क्रमांक किंवा ईमेल (पर्यायी / प्रात्यक्षिक):' : 'Contact Phone / Email (Optional for demo):'}
                </label>
                <input
                  id="demo-contact-input"
                  type="text"
                  placeholder={isHi ? 'उदा. 9876543210 (डेमो)' : isMr ? 'उदा. 9876543210 (प्रात्यक्षिक)' : 'e.g. 9876543210 (simulated)'}
                  value={contactField}
                  onChange={(e) => setContactField(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-strong)',
                    backgroundColor: 'var(--color-bg)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              {/* Consent Checkbox */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  marginTop: '0.25rem',
                }}
              >
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  required
                  style={{ marginTop: '3px', cursor: 'pointer' }}
                />
                <span>
                  {isHi
                    ? 'मैं समझता/समझती हूँ कि यह एक प्रोटोटाइप डेमो है और इस सत्र के बाहर कोई वास्तविक व्यक्तिगत डेटा नहीं भेजा या संग्रहीत किया जाएगा।'
                    : isMr
                    ? 'मी हे समजतो की हा एक प्रात्यक्षिक प्रोटोटाइप आहे आणि कोणतीही खरी वैयक्तिक माहिती संकलित केली जात नाही.'
                    : 'I understand this is a simulation prototype and no real personal data will be transmitted or stored outside this session.'}
                </span>
              </label>
            </div>

            {/* Form Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
              <Button variant="ghost" size="md" onClick={handleResetAndClose}>
                {isHi ? 'रद्द करें' : isMr ? 'रद्द करा' : 'Cancel'}
              </Button>
              <Button variant="primary" size="md" type="submit" disabled={!hasConsented}>
                {isHi ? 'अनुरोध भेजें (Submit)' : isMr ? 'विनंती पाठवा (Submit)' : 'Submit Request'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CounsellorRequestForm;
