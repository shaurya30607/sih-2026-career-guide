import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Award,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  MessageSquareQuote,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  School,
  AlertCircle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Course } from '../../types/course';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
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

  return (
    <div className="course-details-view" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Back button and quick actions top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <Button
          variant="outline"
          size="sm"
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Back to all courses
        </Button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Button
            variant={isBookmarked ? 'primary' : 'outline'}
            size="sm"
            icon={isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            onClick={() => onToggleBookmark(course.id)}
          >
            {isBookmarked ? 'Saved in My List' : 'Save Course'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            {copiedLink ? 'Link Copied!' : 'Share'}
          </Button>
        </div>
      </div>

      {/* Main Course Header Hero Card */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}
        aria-labelledby="course-detail-title"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.875rem' }}>
          <Badge variant="primary" size="md">
            {streamMeta.label}
          </Badge>

          {course.nsqfLevel && (
            <Badge variant="neutral" size="md" icon={<Award size={13} />}>
              NSQF Level {course.nsqfLevel}
            </Badge>
          )}

          {course.certificationBody && (
            <Badge variant="secondary" size="md" icon={<ShieldCheck size={13} />}>
              Certifying Body: {course.certificationBody}
            </Badge>
          )}

          {course.financialAidAvailable && (
            <Badge variant="success" size="md">
              Govt Aid / Fee Subsidy Eligible
            </Badge>
          )}
        </div>

        <h1
          id="course-detail-title"
          style={{
            fontSize: '1.875rem',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            marginBottom: '0.75rem',
          }}
        >
          {course.title}
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem',
            marginBottom: '1.5rem',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: 500 }}>
            <School size={16} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            {course.provider}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            <MapPin size={16} aria-hidden="true" />
            {course.location}
          </span>
          <span>
            ⭐ {course.rating.toFixed(1)} ({course.enrolledCount.toLocaleString()} enrolled)
          </span>
        </div>

        {/* Action Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <Button
            variant="secondary"
            size="md"
            icon={<MessageSquareQuote size={18} />}
            onClick={() => onConsultCounsellor(course)}
          >
            Ask AI Counsellor About This Course
          </Button>

          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
            Discuss eligibility, parental doubts, and regional job market prospects with SkillSaathi.
          </span>
        </div>
      </section>

      {/* 4 Quick Spec Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
            <Clock size={16} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span>Duration & Format</span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {course.durationMonths} Months
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
            {course.trainingMode} mode
          </div>
        </Card>

        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
            <Award size={16} style={{ color: 'var(--color-secondary)' }} aria-hidden="true" />
            <span>Eligibility</span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {EDUCATION_LEVEL_LABELS[course.eligibility.minEducation] || course.eligibility.minEducation}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            Min age {course.eligibility.minAge} years
          </div>
        </Card>

        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
            <Layers size={16} style={{ color: 'var(--color-info)' }} aria-hidden="true" />
            <span>Practical Training</span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {course.practicalHours ? `${course.practicalHours} Hours` : 'Lab / Workshop Based'}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            Hands-on equipment access
          </div>
        </Card>

        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8125rem', marginBottom: '0.25rem' }}>
            <Briefcase size={16} style={{ color: 'var(--color-success)' }} aria-hidden="true" />
            <span>Industry Demand</span>
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
            {course.careerOutcome.industryDemand.replace('_', ' ')}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            Active regional hiring
          </div>
        </Card>
      </div>

      {/* Section: Overview & Course Highlights */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
          Course Overview
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {course.description}
        </p>

        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
          What You Will Learn
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {course.highlights.map((h) => (
            <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Practical Skills Matrix */}
        {course.skillsAcquired && course.skillsAcquired.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              Practical Activities & Certified Competencies
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
              {course.skillsAcquired.map((skill) => (
                <div
                  key={skill}
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    padding: '0.625rem 0.875rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border-subtle)',
                    fontSize: '0.84375rem',
                    color: 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Sparkles size={14} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section: Career Outcomes & Employers */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
          Potential Entry-Level Job Roles & Career Outcomes
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              Target Job Designation:
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {course.careerOutcome.roleTitle}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
              High absorption rate across organized workshops, OEMs, and public infrastructure projects.
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
              Illustrative Monthly Starting Wage:
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              ₹{course.careerOutcome.averageStartingSalaryInr.toLocaleString()} / month
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.375rem' }}>
              *Illustrative survey benchmark for certified entry technicians. Actual remuneration varies by district and employer.
            </div>
          </div>
        </div>

        {/* Potential Hiring Employers */}
        {course.careerOutcome.potentialEmployers && course.careerOutcome.potentialEmployers.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              Representative Employers & Placement Links:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {course.careerOutcome.potentialEmployers.map((emp) => (
                <span
                  key={emp}
                  style={{
                    backgroundColor: 'var(--color-surface-muted)',
                    border: '1px solid var(--color-border)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                  }}
                >
                  {emp}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Section: Progression Pathway (NEP 2020) */}
      {course.careerProgression && (
        <section
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <TrendingUp size={20} style={{ color: 'var(--color-secondary)' }} aria-hidden="true" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Career Progression & Higher Education Mobility
            </h2>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {course.careerProgression}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: 'var(--color-secondary-subtle)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #99f6e4',
              fontSize: '0.84375rem',
              color: 'var(--color-secondary)',
            }}
          >
            <ShieldCheck size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
            <span>
              <strong>National Credit Framework (NCrF) Compliant:</strong> Earned credits can be stored in the Academic Bank of Credits (ABC) to resume higher diploma or degree courses without starting from scratch.
            </span>
          </div>
        </section>
      )}

      {/* Section: Disclaimers & Integrity Notice */}
      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1.25rem',
          backgroundColor: 'var(--color-surface-muted)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}
        aria-label="Demo data integrity notice"
      >
        <AlertCircle size={18} aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Prototype Transparency Notice:</strong> Course data, fee subsidies, and salary figures shown are illustrative models designed for prototype demonstration under SkillSaathi. Prospective learners must verify batch availability, government scholarship deadlines, and institutional empanelment directly on official NCVET and NSDC portals.
        </div>
      </section>

      {/* Bottom Floating Navigation for Quick Access */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <Button variant="outline" size="md" icon={<ArrowLeft size={16} />} onClick={onBack}>
          Return to Courses
        </Button>

        <Button
          variant="secondary"
          size="md"
          icon={<MessageSquareQuote size={18} />}
          onClick={() => onConsultCounsellor(course)}
        >
          Discuss With AI Counsellor
        </Button>
      </div>
    </div>
  );
};

export default CourseDetails;
