/**
 * Accessible Event Marker Component
 * Represents a single extinction event with full accessibility support
 */

import React, { useRef, useEffect } from 'react';
import type { EventMarkerProps } from '@/types';

interface AccessibleEventMarkerProps extends EventMarkerProps {
  isActive?: boolean;
}

const EventMarker: React.FC<AccessibleEventMarkerProps> = ({ 
  event, 
  onClick, 
  index,
  totalEvents,
  isActive = false
}) => {
  const markerRef = useRef<HTMLElement>(null);

  const handleClick = (): void => {
    onClick(event);
  };

  const handleKeyDown = (keyEvent: React.KeyboardEvent): void => {
    // Let Timeline component handle navigation
    // This component only handles activation
    if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
      keyEvent.preventDefault();
      onClick(event);
    }
  };

  const handleImageError = (imgEvent: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = imgEvent.currentTarget;
    img.style.display = 'none';
    
    // Announce image load failure to screen readers
    const announcement = `Image for ${event.title} could not be loaded`;
    announceToScreenReader(announcement);
  };

  const handleLearnMoreClick = (clickEvent: React.MouseEvent): void => {
    clickEvent.stopPropagation();
    onClick(event);
  };

  const handleFocus = (): void => {
    // Announce the focused event details
    const announcement = `${event.title}, extinct in ${event.year}. ${event.category} from ${event.location}. Event ${index + 1} of ${totalEvents}.`;
    announceToScreenReader(announcement);
  };

  const announceToScreenReader = (message: string): void => {
    const announcer = document.getElementById('event-announcements') || document.createElement('div');
    if (!announcer.id) {
      announcer.id = 'event-announcements';
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Scroll into view when active
  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [isActive]);

  const eventDescription = truncateText(event.description, 120);
  const positionText = `${index + 1} of ${totalEvents}`;
  const yearsSinceExtinction = new Date().getFullYear() - event.year;

  return (
    <article 
      ref={markerRef}
      className={`event ${isActive ? 'event-active' : ''}`}
      data-event-id={event.id}
      data-category={event.category}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      aria-label={`${event.title}, extinct ${event.year}, ${positionText}`}
      aria-describedby={`event-${event.id}-details`}
      aria-current={isActive ? 'step' : undefined}
      aria-expanded="false"
    >
      {/* Visual timeline marker */}
      <div 
        className="event-marker" 
        data-year={event.year}
        role="presentation"
        aria-hidden="true"
      />
      
      <div className="event-content">
        <header>
          <h3 id={`event-${event.id}-title`}>
            {event.title} 
            <span className="year" aria-label={`Extinct in ${event.year}`}>
              ({event.year})
            </span>
          </h3>
        </header>
        
        <figure role="img" aria-labelledby={`event-${event.id}-title`}>
          <img
            src={event.imageURL}
            alt={`Historical illustration or photograph of ${event.title}`}
            loading="lazy"
            onError={handleImageError}
            aria-describedby={`event-${event.id}-caption`}
          />
          <figcaption id={`event-${event.id}-caption`}>
            Native to {event.location}
          </figcaption>
        </figure>
        
        <p id={`event-${event.id}-description`}>
          {eventDescription}
        </p>
        
        <div className="event-meta" role="complementary">
          <span 
            className="category-tag"
            role="img"
            aria-label={`Category: ${event.category}`}
          >
            {event.category}
          </span>
          
          <button
            className="learn-more-btn"
            onClick={handleLearnMoreClick}
            aria-label={`Learn more about ${event.title}, extinct ${yearsSinceExtinction} years ago`}
            aria-describedby={`event-${event.id}-details`}
            type="button"
          >
            Learn More
          </button>
        </div>
        
        {/* Hidden detailed description for screen readers */}
        <div id={`event-${event.id}-details`} className="sr-only">
          {event.title} was a {event.category.toLowerCase().slice(0, -1)} native to {event.location}. 
          It became extinct in {event.year}, approximately {yearsSinceExtinction} years ago. 
          Primary cause of extinction: {event.cause}. 
          Press Enter or Space to open detailed information modal.
        </div>
      </div>
    </article>
  );
};

export default EventMarker;
