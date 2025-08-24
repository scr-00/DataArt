import { useState, useRef, useEffect } from 'react'
import { EventData } from '../types'
import EventMarker from './EventMarker'

interface TimelineProps {
  events: EventData[];
  onEventClick: (event: EventData) => void;
}

export default function Timeline({ events, onEventClick }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const timelineRef = useRef<HTMLElement>(null)
  const markerRefs = useRef<(HTMLElement | null)[]>([])

  // Sort events by year (newest first)
  const sortedEvents = [...events].sort((a, b) => 
    parseInt(b.year) - parseInt(a.year)
  )

  useEffect(() => {
    // Initialize marker refs array
    markerRefs.current = markerRefs.current.slice(0, sortedEvents.length)
  }, [sortedEvents])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentActiveIndex = activeIndex

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        const nextIndex = currentActiveIndex < sortedEvents.length - 1 ? currentActiveIndex + 1 : 0
        setActiveIndex(nextIndex)
        markerRefs.current[nextIndex]?.focus()
        break

      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        const prevIndex = currentActiveIndex > 0 ? currentActiveIndex - 1 : sortedEvents.length - 1
        setActiveIndex(prevIndex)
        markerRefs.current[prevIndex]?.focus()
        break

      case 'Home':
        e.preventDefault()
        setActiveIndex(0)
        markerRefs.current[0]?.focus()
        break

      case 'End':
        e.preventDefault()
        const lastIndex = sortedEvents.length - 1
        setActiveIndex(lastIndex)
        markerRefs.current[lastIndex]?.focus()
        break
    }
  }

  const handleEventClick = (event: EventData, index: number) => {
    setActiveIndex(index)
    onEventClick(event)
  }

  const handleMarkerFocus = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <section 
      ref={timelineRef}
      className="timeline"
      role="feed"
      aria-label="Coldplay concerts timeline"
      aria-describedby="timeline-instructions"
      onKeyDown={handleKeyDown}
    >
      <div className="timeline-header">
        <h2 className="timeline-title">Concert Timeline</h2>
        <div 
          id="timeline-instructions" 
          className="timeline-instructions sr-only"
        >
          Use arrow keys to navigate between concerts. Press Enter or Space to view details.
          Press Home to go to first concert, End to go to last concert.
        </div>
      </div>

      {/* Visual timeline line */}
      <div className="timeline-line" aria-hidden="true"></div>
      
      <div 
        className="timeline-events"
        role="group"
        aria-label={`${sortedEvents.length} concert events`}
      >
        {sortedEvents.map((event, index) => (
          <div 
            key={`${event.year}-${index}`}
            ref={(el) => { markerRefs.current[index] = el }}
            className="timeline-event-container"
          >
            <EventMarker
              event={event}
              index={index}
              isActive={activeIndex === index}
              onClick={() => handleEventClick(event, index)}
            />
          </div>
        ))}
      </div>

      {/* Live region for announcements */}
      <div 
        className="timeline-announcements sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeIndex >= 0 && activeIndex < sortedEvents.length && (
          <>
            Concert {activeIndex + 1} of {sortedEvents.length}: 
            {sortedEvents[activeIndex].title} in {sortedEvents[activeIndex].year}
          </>
        )}
      </div>
    </section>
  )
}
