import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Bookmark,
  BookmarkCheck,
  MessageSquareQuote,
  CheckCircle2,
  TrendingUp,
  School,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { Course } from '../../types/course';
import { courseService, EDUCATION_LEVEL_LABELS } from '../../services/courses/courseService';

export interface CourseDetailsProps {
  course: Course;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string) => void;
  onBack: () => void;
  onConsultCounsellor: (course: Course) => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onConsultCounsellor,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const streamMeta = courseService.getStreamMeta(course.stream);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const formattedSalary = course.careerOutcome.averageStartingSalaryInr
    ? `₹${course.careerOutcome.averageStartingSalaryInr.toLocaleString('en-IN')} / month`
    : 'Regulated Stipend';

  return (
    <div className="taste-dossier-wrapper">
      {/* Top Nav Bar */}
      <div className="taste-dossier-nav-bar">
        <button
          type="button"
          className="taste-back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Return to Course Register
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className={`taste-btn-primary ${isBookmarked ? 'taste-btn-accent' : ''}`}
            style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            onClick={() => onToggleBookmark(course.id)}
          >
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {isBookmarked ? 'Saved in List' : 'Save Qualification'}
          </button>

          <button
            type="button"
            className="taste-stream-tab"
            style={{ padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={handleShare}
          >
            <Share2 size={15} />
            {copiedLink ? 'Link Copied' : 'Share'}
          </button>
        </div>
      </div>

      {/* Dossier Masthead */}
      <section className="taste-dossier-masthead" aria-labelledby="dossier-title">
        <div className="taste-specimen-badges">
          <span className="taste-badge-stream">
            {streamMeta.label}
          </span>
          {course.nsqfLevel && (
            <span className="taste-badge-nsqf">
              NSQF Level {course.nsqfLevel}
            </span>
          )}
          {course.certificationBody && (
            <span className="taste-badge-cert">
              Accreditation: {course.certificationBody}
            </span>
          )}
          {course.financialAidAvailable && (
            <span className="taste-badge-cert" style={{ backgroundColor: '#ecfdf5', color: '#065f46' }}>
              Fee Subsidy Available
            </span>
          )}
        </div>

        <h1 id="dossier-title" className="taste-dossier-title">
          {course.title}
        </h1>

        <div className="taste-specimen-meta" style={{ fontSize: '0.9375rem', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
            <School size={16} aria-hidden="true" style={{ color: 'var(--color-primary, #1f2b4d)' }} />
            {course.provider}
          </span>
          <span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <MapPin size={16} aria-hidden="true" />
            {course.location}
          </span>
          <span>·</span>
          <span>
            {course.enrolledCount.toLocaleString()} enrolled candidates
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid #e3e1dc' }}>
          <button
            type="button"
            className="taste-btn-accent"
            onClick={() => onConsultCounsellor(course)}
          >
            <MessageSquareQuote size={18} />
            Ask Counsellor About This Trade
          </button>
          <span style={{ fontSize: '0.875rem', color: 'var(--color-muted, #6a7186)' }}>
            Review eligibility, family stability concerns, and state placement data.
          </span>
        </div>
      </section>

      {/* Quick Spec Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
        <div style={{ backgroundColor: 'var(--color-surface, #f4f4f2)', borderRadius: '8px', padding: '20px' }}>
          <span className="taste-mini-label">Duration &amp; Format</span>
          <p className="taste-mini-value" style={{ margin: '4px 0 2px 0' }}>{course.durationMonths} Months</p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)', textTransform: 'capitalize' }}>
            {course.trainingMode} workshop
          </span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface, #f4f4f2)', borderRadius: '8px', padding: '20px' }}>
          <span className="taste-mini-label">Eligibility Prerequisite</span>
          <p className="taste-mini-value" style={{ margin: '4px 0 2px 0' }}>
            {EDUCATION_LEVEL_LABELS[course.eligibility.minEducation] || course.eligibility.minEducation}
          </p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)' }}>
            Min age {course.eligibility.minAge} years
          </span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface, #f4f4f2)', borderRadius: '8px', padding: '20px' }}>
          <span className="taste-mini-label">Practical Workshop Hours</span>
          <p className="taste-mini-value" style={{ margin: '4px 0 2px 0' }}>
            {course.practicalHours ? `${course.practicalHours} Hours` : 'Lab Intensive'}
          </p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)' }}>
            Hands-on machine training
          </span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface, #f4f4f2)', borderRadius: '8px', padding: '20px' }}>
          <span className="taste-mini-label">Industry Demand</span>
          <p className="taste-mini-value accent" style={{ margin: '4px 0 2px 0', textTransform: 'capitalize' }}>
            {course.careerOutcome.industryDemand.replace('_', ' ')}
          </p>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)' }}>
            Statewide recruitment
          </span>
        </div>
      </div>

      {/* Two-Column Dossier Grid */}
      <div className="taste-dossier-grid">
        {/* Left Column: Syllabus & Practical Competencies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Syllabus Overview */}
          <div className="taste-dossier-panel">
            <h2 className="taste-dossier-section-title">
              Technical Overview &amp; Curriculum
            </h2>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary, #3b4561)', margin: 0 }}>
              {course.description}
            </p>

            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', margin: '16px 0 8px 0' }}>
              Curriculum Modules
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {course.highlights.map((h) => (
                <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary, #3b4561)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-primary, #1f2b4d)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Practical Skills Matrix */}
            {course.skillsAcquired && course.skillsAcquired.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-ink, #1f2b4d)', margin: '16px 0 8px 0' }}>
                  Practical Competencies Mastered
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {course.skillsAcquired.map((skill) => (
                    <span
                      key={skill}
                      className="taste-specimen-skill-tag"
                      style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Academic Mobility under NCrF */}
          {course.careerProgression && (
            <div className="taste-dossier-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} style={{ color: 'var(--color-accent, #f7941d)' }} aria-hidden="true" />
                <h2 className="taste-dossier-section-title" style={{ margin: 0 }}>
                  Career Progression &amp; Degree Bridge
                </h2>
              </div>

              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary, #3b4561)', lineHeight: 1.6, margin: 0 }}>
                {course.careerProgression}
              </p>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  padding: '16px',
                  fontSize: '0.875rem',
                  color: 'var(--color-ink, #1f2b4d)',
                  lineHeight: 1.5,
                }}
              >
                <strong>National Credit Framework (NCrF) Compliance: </strong>
                Course credits deposit directly into your Academic Bank of Credits (ABC) to enable lateral entry into Year 2 of Polytechnic Diplomas and Bachelor of Vocation (B.Voc) degrees.
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Economic Outcomes & Advisory Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Economic Ledger Card */}
          <div className="taste-dossier-panel">
            <h2 className="taste-dossier-section-title">
              Economic Outcome
            </h2>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
              <span className="taste-mini-label">Target Role</span>
              <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-ink, #1f2b4d)', margin: '4px 0 2px 0' }}>
                {course.careerOutcome.roleTitle}
              </p>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)' }}>
                Direct placement upon certification
              </span>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '6px', padding: '16px', marginBottom: '16px' }}>
              <span className="taste-mini-label">Starting Remuneration / Stipend</span>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent, #f7941d)', margin: '4px 0 2px 0' }}>
                {formattedSalary}
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted, #6a7186)' }}>
                Regulated apprenticeship scale under Apprentices Act
              </span>
            </div>

            {/* Employers */}
            {course.careerOutcome.potentialEmployers && course.careerOutcome.potentialEmployers.length > 0 && (
              <div>
                <span className="taste-mini-label">Industry Employers</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {course.careerOutcome.potentialEmployers.map((emp) => (
                    <span
                      key={emp}
                      style={{
                        backgroundColor: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--color-ink, #1f2b4d)',
                      }}
                    >
                      {emp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Family Dialogue Advisory Tile */}
          <div className="taste-dossier-highlight-card">
            <h3 className="taste-dossier-highlight-title">
              Family Counselling Available
            </h3>
            <p className="taste-dossier-highlight-desc">
              Have doubts about course credibility, hostel facilities, or career stability? SkillSaathi conducts guided joint family sessions in your regional language.
            </p>
            <button
              type="button"
              className="taste-btn-accent"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onConsultCounsellor(course)}
            >
              Start Joint Counselling
            </button>
          </div>

          {/* Verification Notice */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '16px',
              backgroundColor: 'var(--color-surface, #f4f4f2)',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              color: 'var(--color-muted, #6a7186)',
              lineHeight: 1.45,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
            <span>
              All qualification standards, curricula, and apprenticeship norms are aligned with national NCVET guidelines.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '2px solid var(--color-surface, #f4f4f2)' }}>
        <button
          type="button"
          className="taste-back-btn"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Return to Course Register
        </button>

        <button
          type="button"
          className="taste-btn-primary"
          onClick={() => onConsultCounsellor(course)}
        >
          <MessageSquareQuote size={16} />
          Consult Counsellor
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
