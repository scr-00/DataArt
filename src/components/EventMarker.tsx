import { EventData } from '../types'

interface EventMarkerProps {
  event: EventData;
  onClick: () => void;
}

export default function EventMarker({ event, onClick }: EventMarkerProps) {
  return (
    <article className="event-marker" onClick={onClick}>
      <div className="event-dot"></div>
      
      <div className="event-content">
        <h2 className="event-title">
          {event.year} – {event.title}
        </h2>
        
        <figure className="event-figure">
          <img 
            src={event.imageURL} 
            alt={event.title}
            className="event-image"
            loading="lazy"
          />
          <figcaption className="event-category">
            {event.category}
          </figcaption>
        </figure>
        
        <p className="event-description">
          {event.description}
        </p>
      </div>
    </article>
  )
}
