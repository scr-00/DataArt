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
        const response = await fetch('/events.json')
        if (!response.ok) throw new Error('Failed to load events')
        const data: EventData[] = await response.json()
        setEvents(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const openModal = (event: EventData) => {
    setModalState({ isOpen: true, event })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, event: null })
  }

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev)
  }

  if (loading) {
    return <div className="loading">Loading Coldplay timeline...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark' : 'light'}`}>
      <Header onThemeToggle={toggleTheme} isDarkTheme={isDarkTheme} />
      
      <FilterPanel />
      
      <main className="main-content">
        <Timeline events={events} onEventClick={openModal} />
      </main>

      <EventModal 
        isOpen={modalState.isOpen}
        event={modalState.event}
        onClose={closeModal}
      />
    </div>
  )
}

export default App
