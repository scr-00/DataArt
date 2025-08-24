/**
 * Accessible Timeline Component
 * Renders timeline with full keyboard navigation and screen reader support
 */

import React, { useRef, useEffect } from 'react';
import EventMarker from './EventMarker';
import LoadingSpinner from './LoadingSpinner';
import { ErrorDisplay } from './LoadingSpinner';
import type { TimelineProps } from '@/types';

const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  onEventClick, 
  isLoading = false, 
  error = null 
}) => {
  const timelineRef = useRef<HTMLElement>(null);
  const currentEventIndex = useRef<number>(-1);

  // Handle keyboard navigation for timeline
  const handleTimelineKeyDown = (event: React.KeyboardEvent) => {
    if (!timelineRef.current) return;
    
    const eventElements = timelineRef.current.querySelectorAll<HTMLElement>('[role="button"][data-event-id]');
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        navigateToEvent(eventElements, 1);
        break;
        
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        navigateToEvent(eventElements, -1);
        break;
        
      case 'Home':
        event.preventDefault();
        focusEvent(eventElements, 0);
        break;
        
      case 'End':
        event.preventDefault();
        focusEvent(eventElements, eventElements.length - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedElement = document.activeElement as HTMLElement;
        if (focusedElement && focusedElement.hasAttribute('data-event-id')) {
          focusedElement.click();
        }
        break;
    }
  };

  const navigateToEvent = (eventElements: NodeListOf<HTMLElement>, direction: number) => {
    const currentFocusIndex = Array.from(eventElements).findIndex(el => el === document.activeElement);
    let newIndex;
    
    if (currentFocusIndex === -1) {
      newIndex = direction > 0 ? 0 : eventElements.length - 1;
    } else {
      newIndex = currentFocusIndex + direction;
      if (newIndex >= eventElements.length) newIndex = 0;
      if (newIndex < 0) newIndex = eventElements.length - 1;
    }
    
    focusEvent(eventElements, newIndex);
  };

  const focusEvent = (eventElements: NodeListOf<HTMLElement>, index: number) => {
    if (index >= 0 && index < eventElements.length) {
      eventElements[index].focus();
      currentEventIndex.current = index;
    }
  };

  // Announce timeline changes to screen readers
  useEffect(() => {
    if (!isLoading && events.length > 0) {
      const announcement = `Timeline loaded with ${events.length} extinction events. Use arrow keys to navigate between events, Enter or Space to view details.`;
      
      const announcer = document.createElement('div');
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      
      document.body.appendChild(announcer);
      
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 2000);
    }
  }, [events.length, isLoading]);

  // Loading state
  if (isLoading) {
    return (
      <main role="main" aria-labelledby="main-title">
        <LoadingSpinner message="Loading extinction timeline..." />
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main role="main" aria-labelledby="main-title">
        <section 
          id="timeline" 
          className="timeline"
          role="alert"
          aria-live="assertive"
        >
          <ErrorDisplay 
            message={error} 
            onRetry={() => window.location.reload()} 
          />
        </section>
      </main>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <main role="main" aria-labelledby="main-title">
        <section 
          id="timeline" 
          className="timeline"
          role="status"
          aria-live="polite"
        >
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your filter selection to see more extinction events.</p>
          </div>
        </section>
      </main>
    );
  }

  // Main timeline content
  return (
    <main role="main" aria-labelledby="main-title">
      <section 
        id="timeline" 
        className="timeline" 
        ref={timelineRef}
        role="region"
        aria-labelledby="timeline-heading"
        aria-describedby="timeline-instructions"
        onKeyDown={handleTimelineKeyDown}
        tabIndex={-1}
      >
        <h2 id="timeline-heading" className="sr-only">
          Timeline of extinct animals
        </h2>
        
        <div id="timeline-instructions" className="sr-only">
          Navigate through extinction events using arrow keys. Press Enter or Space to view detailed information about an event.
        </div>

        {/* Timeline line with semantic meaning */}
        <div 
          className="timeline-line" 
          role="presentation" 
          aria-hidden="true"
        />

        {/* Event markers */}
        <div role="group" aria-label={`${events.length} extinction events`}>
          {events.map((event, index) => (
            <EventMarker
              key={event.id}
              event={event}
              onClick={onEventClick}
              index={index}
              totalEvents={events.length}
              isActive={index === currentEventIndex.current}
            />
          ))}
        </div>
        
        {/* Live region for event announcements */}
        <div 
          id="event-announcements"
          className="sr-only"
          aria-live="polite"
          aria-atomic="false"
        />
      </section>
    </main>
  );
};

export default Timeline;
