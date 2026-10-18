import React from 'react';
import {
  Clock,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  Briefcase,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Course } from '../../types/course';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { IconButton } from '../../components/common/IconButton';
import { courseService, EDUCATION_LEVEL_LABELS } from '../../services/courses/courseService';

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
  const streamMeta = courseService.getStreamMeta(course.stream);

  return (
    <article
      className="course-card"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
        boxShadow: 'var(--shadow-sm)',
        position: 'relative',
      }}
    >
      <div>
        {/* Top Badges & Bookmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            marginBottom: '0.875rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant="primary" size="sm">
              {streamMeta.shortLabel}
            </Badge>

            {course.nsqfLevel ? (
              <Badge variant="neutral" size="sm" icon={<Award size={12} />}>
                NSQF Level {course.nsqfLevel}
              </Badge>
            ) : null}

            {course.certificationBody && (
              <Badge variant="neutral" size="sm" icon={<ShieldCheck size={12} />}>
                {course.certificationBody}
              </Badge>
            )}
          </div>

          <IconButton
            icon={
              isBookmarked ? (
                <BookmarkCheck size={18} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <Bookmark size={18} />
              )
            }
            ariaLabel={isBookmarked ? `Remove ${course.title} from saved` : `Save ${course.title}`}
            title={isBookmarked ? 'Saved course' : 'Save course'}
            onClick={() => onToggleBookmark(course.id)}
            variant={isBookmarked ? 'outline' : 'ghost'}
            size="sm"
          />
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(course.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onViewDetails(course.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${course.title}`}
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.35,
            marginBottom: '0.5rem',
            cursor: 'pointer',
          }}
        >
          {course.title}
        </h3>

        {/* Provider & Location */}
        <div
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            marginBottom: '0.875rem',
          }}
        >
          <span>{course.provider}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapPin size={13} aria-hidden="true" />
            {course.location}
          </span>
        </div>

        {/* Short Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {course.description}
        </p>

        {/* Key Practical Skills Chips */}
        {course.skillsAcquired && course.skillsAcquired.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}>
              Skills Taught:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {course.skillsAcquired.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'var(--color-surface-muted)',
                    color: 'var(--color-text-secondary)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {skill}
                </span>
              ))}
              {course.skillsAcquired.length > 3 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', alignSelf: 'center' }}>
                  +{course.skillsAcquired.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Target Job Role */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-bg)',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
          }}
        >
          <Briefcase size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
          <span style={{ fontWeight: 600 }}>Target Role:</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {course.careerOutcome.roleTitle}
          </span>
        </div>
      </div>

      {/* Footer Meta & Action */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            <Clock size={13} aria-hidden="true" />
            {course.durationMonths} Months ({course.trainingMode})
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Min: {EDUCATION_LEVEL_LABELS[course.eligibility.minEducation] || course.eligibility.minEducation}
          </span>
        </div>

        <Button
          id={`view-details-${course.id}`}
          variant="outline"
          size="sm"
          icon={<ArrowRight size={14} />}
          iconPosition="right"
          onClick={() => onViewDetails(course.id)}
        >
          View Details
        </Button>
      </div>
    </article>
  );
};

export default CourseCard;
