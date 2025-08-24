import { useState, useEffect } from 'react'
import Header from './components/Header'
import Timeline from './components/Timeline'
import EventModal from './components/EventModal'
import FilterPanel from './components/FilterPanel'
import { EventData, ModalState } from './types'
import './App.css'

function App() {
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    event: null
  })
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  // Load events from JSON
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('/events.json')
        if (!response.ok) {
          throw new Error(`Failed to load events: ${response.status} ${response.statusText}`)
        }
        const data: EventData[] = await response.json()
        setEvents(data)
        
        // Announce successful load to screen readers
        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'polite')
        announcement.className = 'sr-only'
        announcement.textContent = `Loaded ${data.length} Coldplay concerts`
        document.body.appendChild(announcement)
        
        setTimeout(() => {
          if (document.body.contains(announcement)) {
            document.body.removeChild(announcement)
          }
        }, 2000)
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        console.error('Error loading events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Apply theme to document root for CSS custom properties
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])

  const openModal = (event: EventData) => {
    setModalState({ isOpen: true, event })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, event: null })
  }

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  // Loading state with proper ARIA
  if (loading) {
    return (
      <div 
        className={`app ${isDarkTheme ? 'dark' : 'light'}`}
        role="main"
        aria-live="polite"
      >
        <div className="loading-container">
          <div className="loading-spinner" aria-hidden="true"></div>
          <p className="loading-text">Loading Coldplay timeline...</p>
          <p className="sr-only">Please wait while we load the concert information</p>
        </div>
      </div>
    )
  }

  // Error state with proper ARIA
  if (error) {
    return (
      <div 
        className={`app ${isDarkTheme ? 'dark' : 'light'}`}
        role="main"
      >
        <div 
          className="error-container"
          role="alert"
          aria-live="assertive"
        >
          <h1>Error Loading Timeline</h1>
          <p className="error-message">
            <span className="sr-only">Error details: </span>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <Header onThemeToggle={toggleTheme} isDarkTheme={isDarkTheme} />
      
      <FilterPanel />
      
      <main 
        id="main-content"
        className="main-content"
        role="main"
        aria-label="Coldplay concerts timeline"
      >
        <Timeline events={events} onEventClick={openModal} />
      </main>

      <EventModal 
        isOpen={modalState.isOpen}
        event={modalState.event}
        onClose={closeModal}
      />

      {/* Global announcements region */}
      <div 
        className="global-announcements sr-only"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </div>
  )
}

export default App
