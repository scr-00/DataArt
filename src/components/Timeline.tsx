import { EventData } from '../types'
import EventMarker from './EventMarker'

interface TimelineProps {
  events: EventData[];
  onEventClick: (event: EventData) => void;
}

export default function Timeline({ events, onEventClick }: TimelineProps) {
  // Sort events by year (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  )

  return (
    <section className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-events">
        {sortedEvents.map((event, index) => (
          <EventMarker
            key={`${event.year}-${index}`}
            event={event}
            onClick={() => onEventClick(event)}
          />
        ))}
      </div>
    </section>
  )
}
