import React from 'react';
import {
  Clock,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Briefcase,
} from 'lucide-react';
import { Course } from '../../types/course';
import { courseService, EDUCATION_LEVEL_LABELS } from '../../services/courses/courseService';
import { useTranslation } from '../../i18n';

export interface CourseCardProps {
  course: Course;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isBookmarked,
  onToggleBookmark,
  onViewDetails,
}) => {
  const { t, language } = useTranslation();
  const isMr = language === 'mr';
  const isHi = language === 'hi';
  const streamMeta = courseService.getStreamMeta(course.stream);

  const formattedSalary = course.careerOutcome.averageStartingSalaryInr
    ? `₹${course.careerOutcome.averageStartingSalaryInr.toLocaleString('en-IN')} / ${isHi ? 'माह' : isMr ? 'महिना' : 'mo'}`
    : isHi ? 'मानदेय उपलब्ध' : isMr ? 'मानधन उपलब्ध' : 'Stipend provided';

  const modeLabel = isHi
    ? course.trainingMode === 'offline'
      ? 'ऑफलाइन कार्यशाला'
      : course.trainingMode === 'hybrid'
      ? 'हाइब्रिड'
      : 'ऑनलाइन'
    : isMr
    ? course.trainingMode === 'offline'
      ? 'प्रत्यक्ष कार्यशाळा'
      : course.trainingMode === 'hybrid'
      ? 'हायब्रिड'
      : 'ऑनलाइन'
    : course.trainingMode;

  const minEduText = isHi
    ? course.eligibility.minEducation === '10th_pass'
      ? '१०वीं उत्तीर्ण (SSC)'
      : '१२वीं उत्तीर्ण (HSC)'
    : isMr
    ? course.eligibility.minEducation === '10th_pass'
      ? '१० वी उत्तीर्ण (SSC)'
      : '१२ वी उत्तीर्ण (HSC)'
    : EDUCATION_LEVEL_LABELS[course.eligibility.minEducation] || course.eligibility.minEducation;

  return (
    <article className="taste-specimen-card">
      <div>
        {/* Top Badges and Bookmark */}
        <div className="taste-specimen-top">
          <div className="taste-specimen-badges">
            <span className="taste-badge-stream">
              {streamMeta.shortLabel}
            </span>

            {course.nsqfLevel && (
              <span className="taste-badge-nsqf">
                NSQF Level {course.nsqfLevel}
              </span>
            )}

            {course.certificationBody && (
              <span className="taste-badge-cert">
                {course.certificationBody}
              </span>
            )}
          </div>

          <button
            type="button"
            className={`taste-bookmark-btn ${isBookmarked ? 'active' : ''}`}
            aria-label={isBookmarked ? `${t('courses.removeSavedBtn')} ${course.title}` : `${t('courses.saveBtn')} ${course.title}`}
            title={isBookmarked ? t('courses.removeSavedBtn') : t('courses.saveBtn')}
            onClick={() => onToggleBookmark(course.id)}
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>

        {/* Title */}
        <h2
          className="taste-specimen-title"
          onClick={() => onViewDetails(course.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewDetails(course.id);
            }
          }}
          tabIndex={0}
          role="button"
        >
          {course.title}
        </h2>

        {/* Provider and Location */}
        <div className="taste-specimen-meta">
          <span>{course.provider}</span>
          <span>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <MapPin size={13} aria-hidden="true" />
            {course.location}
          </span>
        </div>

        {/* Description */}
        <p className="taste-specimen-desc">
          {course.description}
        </p>

        {/* Key Ledger Facts Row */}
        <div className="taste-specimen-ledger-row">
          <div className="taste-ledger-mini-cell">
            <span className="taste-mini-label">{t('courses.startingStipend')}</span>
            <span className="taste-mini-value accent">{formattedSalary}</span>
          </div>

          <div className="taste-ledger-mini-cell">
            <span className="taste-mini-label">{t('courses.durationAndMode')}</span>
            <span className="taste-mini-value">
              {course.durationMonths} {isHi ? 'महीने' : isMr ? 'महिने' : 'Months'} ({modeLabel})
            </span>
          </div>
        </div>

        {/* Target Role Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            color: 'var(--color-ink, #1f2b4d)',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            padding: '8px 12px',
            marginBottom: '16px',
          }}
        >
          <Briefcase size={14} style={{ color: 'var(--color-primary, #1f2b4d)', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontWeight: 600 }}>{t('courses.targetRole')}:</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {course.careerOutcome.roleTitle}
          </span>
        </div>

        {/* Practical Skills Tags */}
        {course.skillsAcquired && course.skillsAcquired.length > 0 && (
          <div className="taste-specimen-skills">
            {course.skillsAcquired.slice(0, 3).map((skill) => (
              <span key={skill} className="taste-specimen-skill-tag">
                {skill}
              </span>
            ))}
            {course.skillsAcquired.length > 3 && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted, #6a7186)', alignSelf: 'center' }}>
                +{course.skillsAcquired.length - 3} {isHi ? 'और' : isMr ? 'अधिक' : 'more'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="taste-specimen-action-bar">
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted, #6a7186)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={13} aria-hidden="true" />
          {t('courses.minEduPrefix')} {minEduText}
        </span>

        <button
          type="button"
          id={`view-details-${course.id}`}
          className="taste-specimen-inspect-btn"
          onClick={() => onViewDetails(course.id)}
          style={{ minHeight: '44px' }}
        >
          {t('courses.inspectBtn')}
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
