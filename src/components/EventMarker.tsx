import { EventData } from '../types'

interface EventMarkerProps {
  event: EventData;
  onClick: () => void;
  isActive?: boolean;
  index: number;
}

export default function EventMarker({ event, onClick, isActive = false, index }: EventMarkerProps) {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Space or Enter to activate
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      onClick()
    }
    // Arrow key navigation handled by parent Timeline component
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <article 
      className={`event-marker ${isActive ? 'event-marker--active' : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`Concert: ${event.title} in ${event.year}. Press Enter or Space to view details.`}
      aria-describedby={`event-description-${index}`}
      aria-current={isActive ? 'step' : undefined}
      data-year={event.year}
    >
      <div 
        className="event-dot"
        aria-hidden="true"
      ></div>
      
      <div className="event-content">
        <h2 className="event-title">
          <span className="event-year" aria-label={`Year ${event.year}`}>
            {event.year}
          </span>
          <span className="event-separator" aria-hidden="true"> – </span>
          <span className="event-name">{event.title}</span>
        </h2>
        
        <figure className="event-figure">
          <img 
            src={event.imageURL} 
            alt={`Concert photo: ${event.title} in ${event.year}, ${event.category} event`}
            className="event-image"
            loading="lazy"
          />
          <figcaption className="event-category">
            <span className="sr-only">Category: </span>
            {event.category}
          </figcaption>
        </figure>
        
        <p 
          id={`event-description-${index}`}
          className="event-description"
        >
          {event.description}
        </p>

        <div className="event-actions">
          <span className="sr-only">
            Press Enter or Space to open detailed view for {event.title}
          </span>
        </div>
      </div>

      {/* Focus indicator for keyboard navigation */}
      <div className="focus-indicator" aria-hidden="true"></div>
    </article>
  )
}
