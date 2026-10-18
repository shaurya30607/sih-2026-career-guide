import React from 'react';
import { Search, X, BookmarkCheck, RotateCcw } from 'lucide-react';
import { CourseFilter, EducationLevelRequired } from '../../types/course';
import { VOCATIONAL_STREAMS } from '../../services/courses/courseService';

export interface CourseFiltersProps {
  filters: CourseFilter;
  onFilterChange: (newFilters: CourseFilter) => void;
  onClearFilters: () => void;
  totalCoursesCount: number;
  filteredCoursesCount: number;
  bookmarkedCount: number;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalCoursesCount,
  filteredCoursesCount,
  bookmarkedCount,
}) => {
  const hasActiveFilters = Boolean(
    (filters.searchQuery && filters.searchQuery.trim().length > 0) ||
      filters.stream ||
      filters.minEducation ||
      filters.trainingMode ||
      filters.maxDurationMonths ||
      filters.bookmarkedOnly
  );

  return (
    <div
      className="course-filters"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Search Input Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div
          style={{
            flex: 1,
            minWidth: 260,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={18}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--color-text-muted)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search by course title, skill (e.g. BMS, Solar, G-code), or job role..."
            aria-label="Search courses"
            style={{
              width: '100%',
              padding: '0.625rem 2.25rem 0.625rem 2.375rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-strong)',
              backgroundColor: 'var(--color-bg)',
              fontSize: '0.875rem',
              color: 'var(--color-text-primary)',
            }}
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              aria-label="Clear search input"
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Bookmarked Filter Pill */}
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, bookmarkedOnly: !filters.bookmarkedOnly })}
          aria-pressed={Boolean(filters.bookmarkedOnly)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 0.875rem',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${filters.bookmarkedOnly ? 'var(--color-primary)' : 'var(--color-border)'}`,
            backgroundColor: filters.bookmarkedOnly ? 'var(--color-primary-subtle)' : 'var(--color-bg)',
            color: filters.bookmarkedOnly ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            fontWeight: 500,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          <BookmarkCheck size={16} aria-hidden="true" />
          <span>Saved Courses</span>
          {bookmarkedCount > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '1px 6px',
                fontWeight: 700,
              }}
            >
              {bookmarkedCount}
            </span>
          )}
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid transparent',
              backgroundColor: 'transparent',
              color: 'var(--color-error)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Chips: Sectors / Vocational Streams */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Vocational Sector:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filters, stream: undefined })}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${!filters.stream ? 'var(--color-primary)' : 'var(--color-border)'}`,
              backgroundColor: !filters.stream ? 'var(--color-primary)' : 'var(--color-surface)',
              color: !filters.stream ? '#ffffff' : 'var(--color-text-primary)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            All Sectors
          </button>

          {VOCATIONAL_STREAMS.map((st) => {
            const isSelected = filters.stream === st.key;
            return (
              <button
                key={st.key}
                type="button"
                onClick={() => onFilterChange({ ...filters, stream: isSelected ? undefined : st.key })}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  backgroundColor: isSelected ? 'var(--color-primary-subtle)' : 'var(--color-surface)',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: isSelected ? 600 : 500,
                  cursor: 'pointer',
                }}
              >
                {st.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter Row: Education Level, Duration & Mode */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {/* Education Level Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <label htmlFor="filter-min-edu" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Min Education:
            </label>
            <select
              id="filter-min-edu"
              value={filters.minEducation || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minEducation: e.target.value ? (e.target.value as EducationLevelRequired) : undefined,
                })
              }
              style={{
                fontSize: '0.8125rem',
                padding: '0.3rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value="">Any Qualification</option>
              <option value="10th_pass">10th Pass (SSC)</option>
              <option value="12th_pass">12th Pass (HSC)</option>
            </select>
          </div>

          {/* Max Duration Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <label htmlFor="filter-duration" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Duration:
            </label>
            <select
              id="filter-duration"
              value={filters.maxDurationMonths || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxDurationMonths: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              style={{
                fontSize: '0.8125rem',
                padding: '0.3rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value="">Any Duration</option>
              <option value="4">Up to 4 Months</option>
              <option value="6">Up to 6 Months</option>
              <option value="8">Up to 8 Months</option>
            </select>
          </div>

          {/* Training Mode */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <label htmlFor="filter-mode" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Mode:
            </label>
            <select
              id="filter-mode"
              value={filters.trainingMode || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  trainingMode: e.target.value ? (e.target.value as 'offline' | 'online' | 'hybrid') : undefined,
                })
              }
              style={{
                fontSize: '0.8125rem',
                padding: '0.3rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value="">Any Mode</option>
              <option value="offline">Offline Workshop</option>
              <option value="hybrid">Hybrid</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
          Showing {filteredCoursesCount} of {totalCoursesCount} vocational courses
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
