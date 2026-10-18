import React from 'react';
import { Search, X, BookmarkCheck, RotateCcw } from 'lucide-react';
import { CourseFilter, EducationLevelRequired } from '../../types/course';
import { VOCATIONAL_STREAMS } from '../../services/courses/courseService';
import { useTranslation } from '../../i18n';

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
  const { t, language } = useTranslation();
  const isMr = language === 'mr';
  const isHi = language === 'hi';

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
            placeholder={t('courses.searchPlaceholder')}
            aria-label={t('courses.searchAriaLabel')}
          />
          {filters.searchQuery && (
            <button
              type="button"
              className="taste-search-clear-btn"
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              aria-label={t('courses.clearSearch')}
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
          style={{ minHeight: '44px' }}
        >
          <BookmarkCheck size={16} aria-hidden="true" />
          <span>{t('courses.savedOnly')}</span>
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
            style={{ minHeight: '44px' }}
          >
            <RotateCcw size={14} aria-hidden="true" style={{ display: 'inline', marginRight: 4 }} />
            {t('common.resetFilters')}
          </button>
        )}
      </div>

      {/* Stream Tabs */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-muted, #6a7186)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {t('courses.sectorLabel')}
        </div>
        <div className="taste-stream-tabs">
          <button
            type="button"
            className={`taste-stream-tab ${!filters.stream ? 'active' : ''}`}
            onClick={() => onFilterChange({ ...filters, stream: undefined })}
            style={{ minHeight: '40px' }}
          >
            {t('common.allSectors')}
          </button>

          {VOCATIONAL_STREAMS.map((st) => {
            const isSelected = filters.stream === st.key;
            return (
              <button
                key={st.key}
                type="button"
                className={`taste-stream-tab ${isSelected ? 'active' : ''}`}
                onClick={() => onFilterChange({ ...filters, stream: isSelected ? undefined : st.key })}
                style={{ minHeight: '40px' }}
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
            {t('courses.minEduLabel')}:
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
            aria-label={t('courses.minEduLabel')}
          >
            <option value="">{t('courses.anyEdu')}</option>
            <option value="10th_pass">{isHi ? '१०वीं उत्तीर्ण (SSC)' : isMr ? '१० वी उत्तीर्ण (SSC)' : '10th Pass (SSC)'}</option>
            <option value="12th_pass">{isHi ? '१२वीं उत्तीर्ण (HSC)' : isMr ? '१२ वी उत्तीर्ण (HSC)' : '12th Pass (HSC)'}</option>
          </select>
        </div>

        {/* Max Duration Selector */}
        <div className="taste-filter-select-group">
          <label htmlFor="filter-duration" className="taste-filter-select-label">
            {t('courses.durationLabel')}:
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
            aria-label={t('courses.durationLabel')}
          >
            <option value="">{t('courses.anyDuration')}</option>
            <option value="4">{t('courses.durationUpTo4')}</option>
            <option value="6">{t('courses.durationUpTo6')}</option>
            <option value="8">{t('courses.durationUpTo8')}</option>
          </select>
        </div>

        {/* Training Mode */}
        <div className="taste-filter-select-group">
          <label htmlFor="filter-mode" className="taste-filter-select-label">
            {t('courses.modeLabel')}:
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
            aria-label={t('courses.modeLabel')}
          >
            <option value="">{t('courses.anyMode')}</option>
            <option value="offline">{t('courses.modeOffline')}</option>
            <option value="hybrid">{t('courses.modeHybrid')}</option>
            <option value="online">{t('courses.modeOnline')}</option>
          </select>
        </div>

        {/* Count Indicator */}
        <div style={{ marginLeft: 'auto', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-muted, #6a7186)' }}>
          {t('courses.showingCount', { filtered: filteredCoursesCount, total: totalCoursesCount })}
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;
