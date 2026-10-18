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
    <div className="taste-filters-panel" aria-label="Course Filters Panel">
      {/* Search Input and Saved Toggle Row */}
      <div className="taste-search-row">
        <div className="taste-search-input-wrapper">
          <Search
            size={18}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--color-muted, #6a7186)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            className="taste-search-input"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search qualifications, skills (EV, Solar, CNC, Lab), or job role..."
            aria-label="Search courses"
          />
          {filters.searchQuery && (
            <button
              type="button"
              className="taste-search-clear-btn"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Saved Courses Toggle */}
        <button
          type="button"
          onClick={() => onFilterChange({ ...filters, bookmarkedOnly: !filters.bookmarkedOnly })}
          aria-pressed={Boolean(filters.bookmarkedOnly)}
          className={`taste-saved-toggle-btn ${filters.bookmarkedOnly ? 'active' : ''}`}
        >
          <BookmarkCheck size={16} aria-hidden="true" />
          <span>Saved Courses</span>
          {bookmarkedCount > 0 && (
            <span className="taste-saved-count">
              {bookmarkedCount}
            </span>
          )}
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="taste-clear-filters-btn"
            onClick={onClearFilters}
          >
            <RotateCcw size={14} aria-hidden="true" style={{ display: 'inline', marginRight: 4 }} />
            Reset Filters
          </button>
        )}
      </div>

      {/* Stream Tabs */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted, #6a7186)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Vocational Sector
        </div>
        <div className="taste-stream-tabs">
          <button
            type="button"
            className={`taste-stream-tab ${!filters.stream ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, stream: undefined })}
          >
            All Sectors
          </button>

          {VOCATIONAL_STREAMS.map((st) => {
            const isSelected = filters.stream === st.key;
            return (
              <button
                key={st.key}
                type="button"
                className={`taste-stream-tab ${isSelected ? 'active' : ''}`}
                onClick={() => onFilterChange({ ...filters, stream: isSelected ? undefined : st.key })}
              >
                {st.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Dropdown Filter Strip */}
      <div className="taste-filter-dropdowns">
        {/* Education Level Selector */}
        <div className="taste-filter-select-group">
          <label htmlFor="filter-min-edu" className="taste-filter-select-label">
            Min Education:
          </label>
          <select
            id="filter-min-edu"
            className="taste-filter-select"
            value={filters.minEducation || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minEducation: e.target.value ? (e.target.value as EducationLevelRequired) : undefined,
              })
            }
          >
            <option value="">Any Qualification</option>
            <option value="10th_pass">10th Pass (SSC)</option>
            <option value="12th_pass">12th Pass (HSC)</option>
          </select>
        </div>

        {/* Max Duration Selector */}
        <div className="taste-filter-select-group">
          <label htmlFor="filter-duration" className="taste-filter-select-label">
            Duration:
          </label>
          <select
            id="filter-duration"
            className="taste-filter-select"
            value={filters.maxDurationMonths || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxDurationMonths: e.target.value ? Number(e.target.value) : undefined,
              })
            }
          >
            <option value="">Any Duration</option>
            <option value="4">Up to 4 Months</option>
            <option value="6">Up to 6 Months</option>
            <option value="8">Up to 8 Months</option>
          </select>
        </div>

        {/* Training Mode */}
        <div className="taste-filter-select-group">
          <label htmlFor="filter-mode" className="taste-filter-select-label">
            Mode:
          </label>
          <select
            id="filter-mode"
            className="taste-filter-select"
            value={filters.trainingMode || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                trainingMode: e.target.value ? (e.target.value as 'offline' | 'online' | 'hybrid') : undefined,
              })
            }
          >
            <option value="">Any Mode</option>
            <option value="offline">Offline Workshop</option>
            <option value="hybrid">Hybrid</option>
            <option value="online">Online</option>
          </select>
        </div>

        {/* Count Indicator */}
        <div style={{ marginLeft: 'auto', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-muted, #6a7186)' }}>
          {filteredCoursesCount} of {totalCoursesCount} qualifications listed
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
