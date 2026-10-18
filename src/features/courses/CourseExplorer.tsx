import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, FilterX, SlidersHorizontal } from 'lucide-react';
import { Course, CourseFilter } from '../../types/course';
import { PageHeader } from '../../components/common/PageHeader';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';
import { CourseDetails } from './CourseDetails';
import { courseService } from '../../services/courses/courseService';

export interface CourseExplorerProps {
  selectedCourseId?: string | null;
  onSelectCourse: (courseId: string | null) => void;
  onConsultCounsellor: (course: Course) => void;
  onNavigateToOnboarding: () => void;
}

export const CourseExplorer: React.FC<CourseExplorerProps> = ({
  selectedCourseId,
  onSelectCourse,
  onConsultCounsellor,
  onNavigateToOnboarding,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filters, setFilters] = useState<CourseFilter>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Load all initial courses from service
  useEffect(() => {
    courseService.getAllCourses().then((data) => {
      setCourses(data);
      setFilteredCourses(data);
    });
  }, []);

  // Apply filters whenever filters or courses change
  useEffect(() => {
    courseService.filterCourses(filters, bookmarkedIds).then((res) => {
      setFilteredCourses(res);
    });
  }, [filters, bookmarkedIds]);

  const toggleBookmark = (courseId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  // Find currently selected course if in details view
  const activeCourse = useMemo(() => {
    if (!selectedCourseId) return null;
    return courses.find((c) => c.id === selectedCourseId) || null;
  }, [selectedCourseId, courses]);

  // If a specific course is selected, render CourseDetails view
  if (activeCourse) {
    return (
      <CourseDetails
        course={activeCourse}
        isBookmarked={bookmarkedIds.has(activeCourse.id)}
        onToggleBookmark={toggleBookmark}
        onBack={() => onSelectCourse(null)}
        onConsultCounsellor={onConsultCounsellor}
      />
    );
  }

  return (
    <div className="course-explorer-page">
      {/* Header */}
      <PageHeader
        title="Explore Vocational Courses"
        description="Search accredited skill-development courses in Maharashtra and nationwide. Compare curriculum, duration, entry wages, and industry affiliations."
        badge={
          <Badge variant="primary" size="md" icon={<Sparkles size={14} />}>
            Verified NSQF & NCVET Courses
          </Badge>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            icon={<SlidersHorizontal size={14} />}
            onClick={onNavigateToOnboarding}
          >
            Personalize Preferences
          </Button>
        }
      />

      {/* Search and Filter Controls */}
      <CourseFilters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
        totalCoursesCount={courses.length}
        filteredCoursesCount={filteredCourses.length}
        bookmarkedCount={bookmarkedIds.size}
      />

      {/* Course Cards Grid - 2 columns on desktop */}
      {filteredCourses.length > 0 ? (
        <div className="course-cards-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isBookmarked={bookmarkedIds.has(course.id)}
              onToggleBookmark={toggleBookmark}
              onViewDetails={(id) => onSelectCourse(id)}
            />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px dashed var(--color-border-strong)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-muted)',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilterX size={26} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
              No vocational courses match your current filters
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: 440 }}>
              Try broadening your search keywords, switching sector filters, or resetting qualification requirements.
            </p>
          </div>

          <Button variant="primary" size="md" icon={<RotateCcwIcon />} onClick={handleClearFilters}>
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

const RotateCcwIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

export default CourseExplorer;
