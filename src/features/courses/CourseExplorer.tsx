import React, { useState, useEffect, useMemo } from 'react';
import { FilterX, SlidersHorizontal } from 'lucide-react';
import { Course, CourseFilter } from '../../types/course';
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
    <div className="taste-explorer-page">
      {/* Editorial Register Masthead */}
      <div className="taste-explorer-masthead">
        <div>
          <h1 className="taste-explorer-title">Vocational Course Register</h1>
          <p className="taste-explorer-standfirst">
            Accredited technical qualifications across India. Compare regulated NSQF qualification tiers, dual-system apprenticeships, and university credit bridges.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span className="taste-explorer-meta-count">
            {filteredCourses.length} of {courses.length} Accredited Qualifications
          </span>

          <button
            type="button"
            className="taste-btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.875rem' }}
            onClick={onNavigateToOnboarding}
          >
            <SlidersHorizontal size={15} />
            Personalize Preferences
          </button>
        </div>
      </div>

      {/* Filter Strip */}
      <CourseFilters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
        totalCoursesCount={courses.length}
        filteredCoursesCount={filteredCourses.length}
        bookmarkedCount={bookmarkedIds.size}
      />

      {/* Course Specimen Grid */}
      {filteredCourses.length > 0 ? (
        <div className="taste-specimen-grid">
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
        /* Empty State */
        <div className="taste-empty-register">
          <FilterX size={36} color="var(--color-muted, #6a7186)" />
          <h2 className="taste-empty-title">
            No vocational courses match your current filters
          </h2>
          <p className="taste-empty-desc">
            Broaden your search keywords, switch sector filters, or reset qualification requirements to view all registered options.
          </p>
          <button
            type="button"
            className="taste-btn-primary"
            onClick={handleClearFilters}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseExplorer;
