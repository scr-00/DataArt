/**
 * Accessible Filter Panel Component
 * Provides category filtering with full keyboard navigation and screen reader support
 */

import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import type { FilterPanelProps, FilterCategory } from '@/types';

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  activeFilter, 
  onFilterChange, 
  eventCounts 
}) => {
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  const filters: Array<{ category: FilterCategory; label: string; description: string }> = [
    { 
      category: 'All', 
      label: 'All', 
      description: 'Show all extinct animal species from all categories'
    },
    { 
      category: 'Mammals', 
      label: 'Mammals', 
      description: 'Show only extinct mammal species'
    },
    { 
      category: 'Birds', 
      label: 'Birds', 
      description: 'Show only extinct bird species'
    },
    { 
      category: 'Reptiles', 
      label: 'Reptiles', 
      description: 'Show only extinct reptile species'
    }
  ];

  const handleFilterClick = (category: FilterCategory) => {
    onFilterChange(category);
  };

  const handleKeyDown = (event: React.KeyboardEvent, category: FilterCategory, index: number) => {
    const buttons = filterContainerRef.current?.querySelectorAll<HTMLButtonElement>('.filter-btn');
    if (!buttons) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onFilterChange(category);
        break;
      
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = (index + 1) % buttons.length;
        buttons[nextIndex].focus();
        break;
      
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = (index - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        break;
      
      case 'Home':
        event.preventDefault();
        buttons[0].focus();
        break;
      
      case 'End':
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        break;
    }
  };

  // Announce filter changes to screen readers
  useEffect(() => {
    const filteredCount = eventCounts[activeFilter] || 0;
    const announcement = `Filter changed to ${activeFilter}. Showing ${filteredCount} events.`;
    
    // Create temporary announcement element
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = announcement;
    
    document.body.appendChild(announcer);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }, [activeFilter, eventCounts]);

  return (
    <nav 
      className="filters" 
      role="navigation" 
      aria-labelledby="filter-heading"
      ref={filterContainerRef}
    >
      <h2 id="filter-heading" className="sr-only">
        Filter timeline by animal category
      </h2>
      
      <div 
        className="filter-group"
        role="tablist"
        aria-label="Animal category filters"
      >
        {filters.map(({ category, label, description }, index) => {
          const isActive = activeFilter === category;
          const count = eventCounts[category] || 0;

          return (
            <button
              key={category}
              ref={isActive ? activeButtonRef : undefined}
              className={clsx('filter-btn', { 'active': isActive })}
              data-category={category}
              onClick={() => handleFilterClick(category)}
              onKeyDown={(event) => handleKeyDown(event, category, index)}
              role="tab"
              aria-selected={isActive}
              aria-controls="timeline"
              aria-describedby={`filter-${category}-desc`}
              tabIndex={isActive ? 0 : -1}
              type="button"
            >
              <span className="filter-label">
                {label}
              </span>
              <span className="filter-count" aria-label={`${count} events`}>
                ({count})
              </span>
              
              {/* Hidden description for screen readers */}
              <span id={`filter-${category}-desc`} className="sr-only">
                {description}. Currently {isActive ? 'selected' : 'not selected'}.
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Live region for filter announcements */}
      <div 
        id="filter-status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />
    </nav>
  );
};

export default FilterPanel;
