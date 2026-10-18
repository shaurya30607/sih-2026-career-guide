import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Briefcase,
  Users,
  ArrowRight,
  UserCheck,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { AssessmentLanguage, AssessmentResultsData } from './assessmentTypes';
import { Course } from '../../types/course';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CounsellorRequestForm } from './CounsellorRequestForm';
import { ASSESSMENT_QUESTIONS } from './assessmentQuestions';

export interface AssessmentResultsProps {
  results: AssessmentResultsData;
  language: AssessmentLanguage;
  onExploreCourses: () => void;
  onViewCourseDetails: (courseId: string) => void;
  onRestart: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  results,
  language,
  onExploreCourses,
  onViewCourseDetails,
  onRestart,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';
  const [showCounsellorModal, setShowCounsellorModal] = useState<boolean>(false);

  // Confidence label mapping
  const confidenceLabels: Record<number, { en: string; mr: string; hi: string }> = {
    1: { en: 'Undecided / Exploring', mr: 'अजून निश्चित नाही / शोध सुरू', hi: 'अभी अनिश्चित / खोज जारी' },
    2: { en: 'Initial Ideas / Exploring', mr: 'पर्यायांचा विचार सुरू', hi: 'शुरुआती विचार / अन्वेषण' },
    3: { en: 'Moderate Clarity', mr: 'काही अंशी स्पष्टता', hi: 'मध्यम स्पष्टता' },
    4: { en: 'High Clarity / Narrowed Down', mr: 'जवळपास निश्चित', hi: 'काफी स्पष्ट / विकल्प तय' },
    5: { en: 'Very Clear & Ready', mr: 'पूर्णपणे ठाम व तयार', hi: 'पूरी तरह स्पष्ट और तैयार' },
  };

  const confidenceEntry = confidenceLabels[results.confidenceScore] || confidenceLabels[3];
  const confidenceText = isHi ? confidenceEntry.hi : isMr ? confidenceEntry.mr : confidenceEntry.en;

  // Resolve localized concern label
  const concernQuestion = ASSESSMENT_QUESTIONS.find((q) => q.id === 'q_concern');
  const concernOption = concernQuestion?.options?.find((o) => o.id === results.primaryConcernId);
  const localizedConcernLabel = concernOption
    ? (isHi && concernOption.label.hi ? concernOption.label.hi : isMr ? concernOption.label.mr : concernOption.label.en)
    : results.primaryConcernLabel;

  return (
    <div className="assessment-results-view" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner / Hero */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Badge variant="primary" size="md">
            <Sparkles size={13} aria-hidden="true" style={{ marginRight: '4px' }} />
            <span>{isHi ? 'मूल्यांकन निष्कर्ष रिपोर्ट' : isMr ? 'मूल्यांकन निष्कर्ष अहवाल' : 'Assessment Guidance Summary'}</span>
          </Badge>
          <Badge variant="neutral" size="sm">
            <span>{isHi ? 'प्रोटोटाइप मार्गदर्शन मीट्रिक' : isMr ? 'प्रोटोटाइप मार्गदर्शक निकाल' : 'Prototype Guidance Metric'}</span>
          </Badge>
        </div>

        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem 0',
          }}
        >
          {isHi
            ? 'आपके परिवार के लिए तैयार करियर रोडमैप'
            : isMr
            ? 'आपल्या कुटुंबासाठी तयार केलेले करिअर मार्गदर्शन'
            : 'Tailored Family Career Roadmap'}
        </h1>

        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--color-text-secondary)',
            margin: 0,
            maxWidth: '740px',
            lineHeight: 1.5,
          }}
        >
          {isHi
            ? 'आपके उत्तरों के अनुसार विद्यार्थी की रुचि, परिवार की स्थिरता और सरकारी मान्यता के आधार पर तैयार मार्गदर्शन रिपोर्ट नीचे दी गई है।'
            : isMr
            ? 'आपल्या उत्तरांनुसार विद्यार्थ्याची आवड, कुटुंबाची सुरक्षिततेची गरज आणि शासकीय मान्यता या सर्वांचा समतोल साधणारा अहवाल खाली दिला आहे.'
            : 'Based on your shared answers, here is a balanced summary connecting student interests with family stability, accredited qualifications, and verified trade pathways.'}
        </p>

        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="primary" size="md" icon={<BookOpen size={16} />} onClick={onExploreCourses}>
            {isHi ? 'मैच किए गए कोर्स देखें' : isMr ? 'सर्व कोर्सेस एक्सप्लोर करा' : 'Explore Matched Courses'}
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={<UserCheck size={16} />}
            onClick={() => setShowCounsellorModal(true)}
          >
            {isHi ? 'विशेषज्ञ काउंसलर से बात करें' : isMr ? 'तज्ज्ञ समुपदेशकांशी संपर्क साधा' : 'Talk to a Human Counsellor'}
          </Button>
          <Button variant="ghost" size="md" icon={<RotateCcw size={14} />} onClick={onRestart}>
            {isHi ? 'मूल्यांकन पुनः शुरू करें' : isMr ? 'मूल्यांकन पुन्हा सुरू करा' : 'Restart Assessment'}
          </Button>
        </div>
      </section>

      {/* Grid of Key Learnings & Family Profile */}
      <section>
        <h2
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '1rem',
          }}
        >
          {isHi ? 'आपके सत्र से मिले मुख्य बिंदु' : isMr ? 'आम्हाला समजलेले मुख्य मुद्दे' : 'What We Learned From Your Session'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Card 1: Technical Streams & Interests */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {isHi ? 'रुचि के क्षेत्र' : isMr ? 'रस असणारी क्षेत्रे' : 'Interest Sectors'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
              {results.interestStreams.length > 0 ? (
                results.interestStreams.map((s) => (
                  <Badge key={s} variant="primary" size="sm">
                    {s.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                ))
              ) : (
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {isHi ? 'सभी प्रमुख क्षेत्रों पर विचार जारी' : isMr ? 'सर्व क्षेत्रांचा विचार सुरू' : 'Open to high-demand sectors'}
                </span>
              )}
            </div>
          </div>

          {/* Card 2: Core Family Concern */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {isHi ? 'परिवार की मुख्य प्राथमिकता' : isMr ? 'कुटुंबाची मुख्य प्राथमिकता' : 'Principal Family Concern'}
            </div>
            <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {localizedConcernLabel}
            </div>
            {results.deepDiveAnswer && (
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.375rem' }}>
                {isHi ? 'दर्ज की गई अपेक्षा:' : isMr ? 'नोंदवलेली अपेक्षा:' : 'Recorded specification:'}{' '}
                <strong>
                  {typeof results.deepDiveAnswer === 'number'
                    ? `₹${results.deepDiveAnswer.toLocaleString('en-IN')} ${isHi ? '/ माह' : isMr ? '/ महिना' : '/ mo'}`
                    : String(results.deepDiveAnswer).replace(/_/g, ' ')}
                </strong>
              </div>
            )}
          </div>

          {/* Card 3: Confidence Score */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {isHi ? 'करियर आत्मविश्वास सूचकांक' : isMr ? 'करिअर आत्मविश्वास पातळी' : 'Student Confidence Index'}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {results.confidenceScore} / 5
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-secondary)', fontWeight: 600 }}>
                ({confidenceText})
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
              {isHi
                ? 'पारिवारिक बातचीत से स्पष्टता और आत्मविश्वास बढ़ता है'
                : isMr
                ? 'योग्य चर्चेमुळे आत्मविश्वास वाढू शकतो'
                : 'Structured family dialogue builds clarity'}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Vocational Courses */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              {isHi ? 'अनुशंसित मान्यताप्राप्त कोर्सेज' : isMr ? 'शिफारस केलेले अधिकृत कोर्सेस' : 'Recommended Accredited Courses'}
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>
              {isHi
                ? 'आपकी रुचियों और प्राथमिकताओं के आधार पर सरकारी मान्यता (NCVET) प्राप्त कोर्स'
                : isMr
                ? 'आपल्या आवडी आणि पात्रतेनुसार शासकीय मान्यताप्राप्त (NCVET) कोर्सेस'
                : 'Selected from the SkillSaathi catalogue based on your stated interests and priorities'}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onExploreCourses} icon={<ArrowRight size={14} />}>
            {isHi ? 'पूरा कैटलॉग देखें' : isMr ? 'कॅटलॉग पहा' : 'View Full Catalogue'}
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {results.recommendedCourses.map((course: Course) => (
            <div
              key={course.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <Badge variant="primary" size="sm">
                    {course.stream.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                  <Badge variant="neutral" size="sm">
                    NSQF Level {course.nsqfLevel}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {course.certificationBody}
                  </Badge>
                </div>

                <h3
                  style={{
                    fontSize: '1.0625rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.35,
                  }}
                >
                  {course.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.45,
                    marginBottom: '0.875rem',
                  }}
                >
                  {course.description}
                </p>

                {/* Practical Skills Acquired */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                    {isHi ? 'सिखाए जाने वाले प्रैक्टिकल कौशल:' : isMr ? 'शिकवली जाणारी प्रत्यक्ष कौशल्ये:' : 'Key Hands-on Skills:'}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {(course.skillsAcquired || course.highlights || []).slice(0, 3).map((skill: string, sIdx: number) => (
                      <span
                        key={sIdx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-bg)',
                          border: '1px solid var(--color-border-subtle)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Career Outcome */}
                <div
                  style={{
                    backgroundColor: 'var(--color-primary-subtle)',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Briefcase size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <span>
                    <strong>{isHi ? 'संभावित पद:' : isMr ? 'संभाव्य पद:' : 'Target Job Role:'}</strong>{' '}
                    {course.careerOutcome.roleTitle}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--color-border-subtle)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <Clock size={14} aria-hidden="true" />
                  <span>
                    {course.durationMonths} {isHi ? 'महीने' : isMr ? 'महिने' : 'Months'} ({course.trainingMode})
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewCourseDetails(course.id)}
                  style={{ fontSize: '0.75rem' }}
                >
                  {isHi ? 'विवरण देखें' : isMr ? 'तपशील पहा' : 'View Details'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Family Discussion Guide */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-secondary-subtle)',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={18} aria-hidden="true" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              {isHi ? 'परिवार के लिए चर्चा गाइड' : isMr ? 'कुटुंबासाठी चर्चा मार्गदर्शक' : 'Student-Parent Discussion Prompts'}
            </h2>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              {isHi
                ? 'विद्यार्थी की आकांक्षाओं और पारिवारिक सुरक्षा के समन्वय हेतु इन बिंदुओं पर चर्चा करें'
                : isMr
                ? 'घरी निर्णय घेताना विद्यार्थी आणि पालकांनी एकत्र बसून या मुद्यांवर चर्चा करावी'
                : 'Use these neutral prompts to align student aspirations with family security'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {results.discussionPoints.map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                backgroundColor: 'var(--color-bg)',
                padding: '0.875rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                {idx + 1}
              </span>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                {isHi && pt.hi ? pt.hi : isMr ? pt.mr : pt.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Actionable Next Steps */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
        }}
      >
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
          {isHi ? 'सुझाए गए अगले कदम' : isMr ? 'पुढील व्यावहारिक पावले' : 'Suggested Actionable Next Steps'}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {results.nextSteps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '0.875rem' }}>
              <TrendingUp size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} aria-hidden="true" />
              <span style={{ color: 'var(--color-text-secondary)' }}>
                {isHi && step.hi ? step.hi : isMr ? step.mr : step.en}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.875rem 1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-surface-muted)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          <strong>{isHi || isMr ? 'मार्गदर्शक सूचना:' : 'Transparency Note:'}</strong>{' '}
          {isHi
            ? 'ये परिणाम आपके उत्तरों पर आधारित परिचयात्मक सुझाव हैं, कोई नौकरी की कानूनी गारंटी नहीं। किसी भी संस्थान में प्रवेश से पहले उसकी आधिकारिक NCVET संबद्धता अवश्य जांचें।'
            : isMr
            ? 'हे निकाल प्रात्यक्षिक नमुना सूचना आहेत, कोणतीही नोकरी हमी किंवा व्यावसायिक निदान नाही. कोणत्याही संस्थेत प्रवेश घेण्यापूर्वी प्रत्यक्ष NCVET मान्यता तपासा.'
            : 'These recommendations are prototype algorithmic suggestions based on your responses, not guaranteed job contracts or clinical assessments. Always verify batch schedules, fee waivers, and affiliation with the respective vocational institute.'}
        </div>
      </section>

      {/* Human Counsellor Escalation Modal */}
      <CounsellorRequestForm
        isOpen={showCounsellorModal}
        onClose={() => setShowCounsellorModal(false)}
        language={language}
        courseTitle={results.recommendedCourses[0]?.title}
      />
    </div>
  );
};

export default AssessmentResults;
