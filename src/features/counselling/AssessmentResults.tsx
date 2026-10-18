import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  Clock,
  Briefcase,
  Users,
  ArrowRight,
  UserCheck,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { AssessmentLanguage, AssessmentResultsData, LocalizedString } from './assessmentTypes';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { CounsellorRequestForm } from './CounsellorRequestForm';

export interface AssessmentResultsProps {
  results: AssessmentResultsData;
  language: AssessmentLanguage;
  onExploreCourses: () => void;
  onViewCourseDetails: (courseId: string) => void;
  onChangeAnswers: () => void;
  onRestart: () => void;
}

function resolveLocalized(loc: LocalizedString | undefined, lang: AssessmentLanguage): string {
  if (!loc) return '';
  if (lang === 'hi' && loc.hi) return loc.hi;
  if (lang === 'mr' && loc.mr) return loc.mr;
  return loc.en || loc.mr || '';
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  results,
  language,
  onExploreCourses,
  onViewCourseDetails,
  onChangeAnswers,
  onRestart,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';
  const [showCounsellorModal, setShowCounsellorModal] = useState<boolean>(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState<boolean>(false);

  const recommendations = results.recommendations || [];
  const summary = results.summary;

  return (
    <div
      className="career-discovery-results-view"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2.25rem',
        width: '100%',
        maxWidth: '920px',
        margin: '0 auto',
      }}
    >
      {/* ========================================================
          SECTION A — Heading and Reassurance
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl, 16px)',
          padding: '2.25rem 2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
          <Badge variant="primary" size="md">
            <Sparkles size={14} aria-hidden="true" style={{ marginRight: '5px' }} />
            <span>{isHi ? 'करियर खोज परिणाम' : isMr ? 'करिअर शोध निकाल' : 'Career Discovery Results'}</span>
          </Badge>
          <Badge variant="neutral" size="sm">
            <span>{isHi ? 'प्रासंगिक सुझाव' : isMr ? 'उपयुक्त शिफारशी' : 'Personalized Suggestions'}</span>
          </Badge>
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.025em',
            margin: '0 0 0.625rem 0',
            lineHeight: 1.25,
          }}
        >
          {isHi
            ? 'आपके करियर खोज परिणाम'
            : isMr
            ? 'तुमचे करिअर शोध निकाल'
            : 'Your Career Discovery Results'}
        </h1>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--color-text-secondary)',
            margin: 0,
            maxWidth: '740px',
            lineHeight: 1.6,
          }}
        >
          {isHi
            ? 'आपके उत्तर करियर की खोज के लिए एक शुरुआती बिंदु प्रदान करते हैं। ये सुझाव तलाशने के लिए संभावित विकल्प हैं, आपके भविष्य के बारे में कोई अंतिम निर्णय नहीं।'
            : isMr
            ? 'तुमची उत्तरे करिअर शोधण्यासाठी एक प्रारंभिक दिशा देतात. या शिफारशी पडताळणी करण्यासाठीचे पर्याय आहेत, तुमच्या भविष्याबद्दलचा अंतिम निर्णय नाही.'
            : 'Your answers give us a starting point for exploring careers. These suggestions are possibilities to investigate, not a final decision about your future.'}
        </p>

        {/* Quick reassuring badges */}
        <div
          style={{
            display: 'flex',
            gap: '0.875rem',
            flexWrap: 'wrap',
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            <CheckCircle2 size={15} style={{ color: 'var(--color-success)' }} />
            <span>{isHi ? 'कोई बाध्यता नहीं' : isMr ? 'कोणतेही बंधन नाही' : 'No forced decisions'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            <ShieldCheck size={15} style={{ color: 'var(--color-primary)' }} />
            <span>{isHi ? 'प्रमाणित NSQF वोकेशनल कोर्स' : isMr ? 'NCVET प्रमाणित व्यावसायिक अभ्यासक्रम' : 'Aligned to NSQF standards'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            <Compass size={15} style={{ color: 'var(--color-secondary)' }} />
            <span>{isHi ? 'अपनी गति से खोजें' : isMr ? 'आपल्या गतीने शोधा' : 'Explore at your own pace'}</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B — Brief Interests Summary FIRST
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-primary-subtle, #bfdbfe)',
          borderRadius: 'var(--radius-xl, 16px)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-md, 8px)',
              backgroundColor: 'var(--color-primary-subtle, #eff6ff)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Compass size={18} aria-hidden="true" />
          </div>
          <div>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.015em',
                margin: 0,
              }}
            >
              {isHi
                ? 'आपकी रुचियों और प्राथमिकताओं का सारांश'
                : isMr
                ? 'तुमच्या आवडी आणि प्राधान्यांचा सारांश'
                : 'Your Interests & Profile Summary'}
            </h2>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              {isHi
                ? 'आपके द्वारा चुने गए उत्तरों के आधार पर तैयार संक्षिप्त निष्कर्ष'
                : isMr
                ? 'तुम्ही नोंदवलेल्या उत्तरांनुसार तयार केलेला संक्षिप्त आढावा'
                : 'Synthesised from what you shared during the assessment'}
            </span>
          </div>
        </div>

        {/* Narrative Sentences */}
        <div
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg, 12px)',
            padding: '1.25rem 1.5rem',
            marginBottom: '1.25rem',
          }}
        >
          {summary && summary.sentences.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {summary.sentences.map((sent, idx) => (
                <p
                  key={idx}
                  style={{
                    margin: 0,
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.6,
                  }}
                >
                  {resolveLocalized(sent, language)}
                </p>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
              {isHi
                ? 'आप व्यावहारिक कार्यों में रुचि रखते हैं और हाथों से काम करके सीखना पसंद करते हैं। आप नौकरी की स्थिरता और स्पष्ट करियर पथ को प्राथमिकता देते हैं।'
                : isMr
                ? 'तुम्हाला प्रत्यक्ष कृती करणे आणि साधने वापरून शिकणे आवडते. तुम्ही नोकरीची स्थिरता आणि स्पष्ट करिअर प्रगतीला प्राधान्य देता.'
                : 'You enjoy practical, hands-on activities and prefer learning by doing rather than theory alone. You value job stability and clear career progression.'}
            </p>
          )}
        </div>

        {/* Selected Highlight Chips / Tags */}
        {summary && summary.tags.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
              {isHi ? 'पहचाने गए मुख्य बिंदु:' : isMr ? 'महत्त्वाचे पैलू:' : 'Identified Profile Attributes:'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {summary.tags.map((tag, tIdx) => (
                <Badge key={tIdx} variant="secondary" size="md">
                  {resolveLocalized(tag, language)}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          SECTION C — Suggested Career Paths IMMEDIATELY AFTER Summary
         ======================================================== */}
      <section>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.25rem' }}>
              {isHi ? 'मिलान किए गए विकल्प' : isMr ? 'जुळणारे पर्याय' : 'Matched Pathways'}
            </div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              {isHi
                ? 'तलाशने के लिए करियर मार्ग'
                : isMr
                ? 'पडताळणीसाठी करिअर मार्ग'
                : 'Career Paths to Explore'}
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>
              {isHi
                ? 'स्किलसाथी कैटलॉग से आपके उत्तरों के आधार पर सुझाई गई व्यावसायिक शाखाएं'
                : isMr
                ? 'स्किलसाथी कॅटलॉगमधून तुमच्या उत्तरांनुसार सुचवलेले व्यावसायिक कोर्सेस'
                : 'Accredited vocational options aligned to your selected interests and preferences'}
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={onExploreCourses} icon={<ArrowRight size={14} />}>
            {isHi ? 'पूरा कैटलॉग देखें' : isMr ? 'सर्व कोर्सेस पहा' : 'Browse All Courses'}
          </Button>
        </div>

        {/* Recommendation Cards */}
        {recommendations.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {recommendations.map((rec, idx) => {
              const { course, matchReason, skillsTaught, jobRoles, durationAndMode, eligibility, whatToVerify } = rec;

              return (
                <div
                  key={course.id || idx}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl, 16px)',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.125rem',
                  }}
                >
                  {/* Top Bar: Sector, NSQF, Certification */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={14} aria-hidden="true" />
                      <span>{durationAndMode}</span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.015em',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {course.title}
                  </h3>

                  {/* 1. Why this was suggested */}
                  <div
                    style={{
                      backgroundColor: 'var(--color-primary-subtle, #eff6ff)',
                      borderLeft: '4px solid var(--color-primary)',
                      borderRadius: '0 var(--radius-md, 8px) var(--radius-md, 8px) 0',
                      padding: '0.75rem 1rem',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {isHi ? 'यह विकल्प क्यों सुझाया गया:' : isMr ? 'हा पर्याय का सुचवला:' : 'Why this option was suggested:'}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
                      {resolveLocalized(matchReason, language)}
                    </p>
                  </div>

                  {/* 2. Skills Taught */}
                  {skillsTaught && skillsTaught.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                        {isHi ? 'सिखाए जाने वाले व्यावहारिक कौशल:' : isMr ? 'शिकवली जाणारी प्रत्यक्ष कौशल्ये:' : 'Key Hands-on Skills Taught:'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                        {skillsTaught.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              fontSize: '0.8125rem',
                              padding: '3px 10px',
                              borderRadius: 'var(--radius-sm, 6px)',
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
                  )}

                  {/* 3. Job Roles & Eligibility Details Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '0.875rem',
                      padding: '0.875rem 1rem',
                      borderRadius: 'var(--radius-md, 8px)',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {isHi ? 'संभावित रोजगार पद:' : isMr ? 'संभाव्य नोकरी पदे:' : 'Possible Job Roles:'}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Briefcase size={14} style={{ color: 'var(--color-primary)' }} />
                        <span>{jobRoles}</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {isHi ? 'पात्रता:' : isMr ? 'पात्रता निकष:' : 'Eligibility:'}
                      </div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                        {eligibility}
                      </div>
                    </div>
                  </div>

                  {/* 4. What the user should verify */}
                  <div
                    style={{
                      backgroundColor: 'var(--color-surface-muted, #f8fafc)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-md, 8px)',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.625rem',
                    }}
                  >
                    <AlertCircle size={16} style={{ color: 'var(--color-secondary)', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
                      <strong style={{ color: 'var(--color-text-primary)' }}>
                        {isHi ? 'दाखिले से पहले क्या जांचें:' : isMr ? 'प्रवेशापूर्वी काय तपासावे:' : 'What you should verify:'}
                      </strong>{' '}
                      {resolveLocalized(whatToVerify, language)}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onViewCourseDetails(course.id)}
                      icon={<BookOpen size={16} />}
                      style={{ minHeight: '44px' }}
                    >
                      {isHi ? 'कोर्स का विवरण देखें' : isMr ? 'कोर्स तपशील पहा' : 'View Course Details'}
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setShowCounsellorModal(true)}
                      icon={<Users size={15} />}
                      style={{ minHeight: '44px' }}
                    >
                      {isHi ? 'काउंसलर से इस पर चर्चा करें' : isMr ? 'समुपदेशकांशी चर्चा करा' : 'Discuss with a Counsellor'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: '2rem',
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}
          >
            <HelpCircle size={32} style={{ color: 'var(--color-text-muted)', marginBottom: '0.75rem' }} />
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', margin: '0 0 1rem 0' }}>
              {isHi
                ? 'आपकी रुचियों के आधार पर कोई विशिष्ट सीधा मिलान नहीं मिला, लेकिन पूरा कैटलॉग देखकर या काउंसलर से बात करके उपयुक्त विकल्प खोजे जा सकते हैं।'
                : isMr
                ? 'तुमच्या आवडींशी थेट जुळणारा एकही कोर्स सापडला नाही, परंतु संपूर्ण कॅटलॉग पाहून किंवा समुपदेशकांशी बोलून अधिक पर्याय शोधता येतील.'
                : 'No single course matched all selected criteria exactly. Exploring our full catalogue or speaking with a counsellor can help identify promising avenues.'}
            </p>
            <Button variant="primary" size="md" onClick={onExploreCourses}>
              {isHi ? 'सभी कोर्स देखें' : isMr ? 'सर्व कोर्सेस एक्सप्लोर करा' : 'Explore All Courses'}
            </Button>
          </div>
        )}
      </section>

      {/* ========================================================
          SECTION D — Next Steps
         ======================================================== */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl, 16px)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 0.375rem 0' }}>
            {isHi ? 'सुझाए गए अगले कदम' : isMr ? 'पुढील उपयुक्त पावले' : 'Suggested Next Steps'}
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            {isHi
              ? 'इन विकल्पों की समीक्षा करने या अपने उत्तरों को संशोधित करने के लिए नीचे दिए गए कदमों का उपयोग करें'
              : isMr
              ? 'हे पर्याय अधिक जाणून घेण्यासाठी किंवा उत्तरे बदलण्यासाठी खालील पर्यायांचा वापर करा'
              : 'Choose how you would like to proceed with your career discovery'}
          </p>
        </div>

        {/* 4 Action Buttons */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.875rem',
          }}
        >
          <Button
            variant="primary"
            size="md"
            icon={<BookOpen size={16} />}
            onClick={onExploreCourses}
            style={{ minHeight: '48px', justifyContent: 'center' }}
          >
            {isHi ? 'सभी कोर्स देखें' : isMr ? 'सर्व कोर्सेस पहा' : 'Explore All Courses'}
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<Edit3 size={16} />}
            onClick={onChangeAnswers}
            style={{ minHeight: '48px', justifyContent: 'center' }}
          >
            {isHi ? 'मेरे उत्तर बदलें' : isMr ? 'माझी उत्तरे बदला' : 'Change My Answers'}
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<UserCheck size={16} />}
            onClick={() => setShowCounsellorModal(true)}
            style={{ minHeight: '48px', justifyContent: 'center' }}
          >
            {isHi ? 'काउंसलर से बात करें' : isMr ? 'समुपदेशकांशी बोला' : 'Talk to a Counsellor'}
          </Button>

          <Button
            variant="ghost"
            size="md"
            icon={<RotateCcw size={16} />}
            onClick={() => setShowRestartConfirm(true)}
            style={{ minHeight: '48px', justifyContent: 'center', color: 'var(--color-text-secondary)' }}
          >
            {isHi ? 'फिर से शुरू करें' : isMr ? 'पुन्हा नव्याने सुरू करा' : 'Start Again'}
          </Button>
        </div>

        {/* Honest Transparency Note */}
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md, 8px)',
            backgroundColor: 'var(--color-surface-muted, #f8fafc)',
            border: '1px solid var(--color-border-subtle)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {isHi ? 'प्रोटोटाइप पारदर्शिता सूचना:' : isMr ? 'पारदर्शकता सूचना:' : 'Prototype Transparency Notice:'}
          </strong>{' '}
          {isHi
            ? 'यह मूल्यांकन एक स्थानीय प्रोटोटाइप प्रदर्शन है, कोई मनोवैज्ञानिक परीक्षण या नौकरी की कानूनी गारंटी नहीं। कोर्स की फीस, सीटें और मान्यता प्रशिक्षण केंद्र से अवश्य सत्यापित करें।'
            : isMr
            ? 'हे मूल्यांकन प्रात्यक्षिक नमुना सूचना आहे, कोणतीही नोकरी हमी किंवा वैद्यकीय चाचणी नाही. कोणत्याही संस्थेत प्रवेश घेण्यापूर्वी प्रत्यक्ष NCVET मान्यता व फी तपासून घ्या.'
            : 'These recommendations are prototype discovery suggestions based on your responses, not guaranteed employment contracts or definitive clinical tests. Always verify batch timings, subsidies, and official affiliation directly with the training center.'}
        </div>
      </section>

      {/* Restart Confirmation Dialog */}
      {showRestartConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="restart-results-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
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
              borderRadius: 'var(--radius-lg, 12px)',
              padding: '1.75rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-warning-subtle, #fef3c7)',
                  color: 'var(--color-warning, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AlertCircle size={20} aria-hidden="true" />
              </div>
              <h2
                id="restart-results-title"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  margin: 0,
                }}
              >
                {isHi ? 'क्या नया मूल्यांकन शुरू करना चाहते हैं?' : isMr ? 'नवीन मूल्यांकन सुरू करायचे का?' : 'Start a new assessment?'}
              </h2>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
                marginBottom: '1.5rem',
              }}
            >
              {isHi
                ? 'इससे आपके पिछले मूल्यांकन के उत्तर साफ हो जाएंगे ताकि आप नए सिरे से शुरुआत कर सकें। सहेजे गए कोर्स या अन्य प्राथमिकताएं सुरक्षित रहेंगी।'
                : isMr
                ? 'यामुळे तुमची मागील मूल्यांकनाची उत्तरे काढून नव्याने सुरुवात होईल. सेव्ह केलेले कोर्सेस सुरक्षित राहतील.'
                : 'This will reset your current assessment answers so you can start fresh. Saved courses and other application preferences will not be affected.'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowRestartConfirm(false)}
                style={{ minHeight: '44px' }}
              >
                {isHi ? 'रद्द करें' : isMr ? 'रद्द करा' : 'Cancel'}
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setShowRestartConfirm(false);
                  onRestart();
                }}
                style={{ minHeight: '44px' }}
              >
                {isHi ? 'हाँ, नए सिरे से शुरू करें' : isMr ? 'होय, नव्याने सुरू करा' : 'Yes, Start Fresh'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Human Counsellor Escalation Modal */}
      <CounsellorRequestForm
        isOpen={showCounsellorModal}
        onClose={() => setShowCounsellorModal(false)}
        language={language}
        courseTitle={recommendations[0]?.course.title}
      />
    </div>
  );
};

export default AssessmentResults;
