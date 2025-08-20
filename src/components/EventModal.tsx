import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { EventData } from '../types'

interface EventModalProps {
  isOpen: boolean;
  event: EventData | null;
  onClose: () => void;
}

export default function EventModal({ isOpen, event, onClose }: EventModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !event) return null

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <h2 className="modal-title">
          {event.year} – {event.title}
        </h2>
        
        <img 
          src={event.imageURL} 
          alt={event.title}
          className="modal-image"
        />
        
        <div className="modal-details">
          <p className="modal-description">{event.description}</p>
          <p className="modal-category">
            <strong>Category:</strong> {event.category}
          </p>
        </div>
      </div>
    </div>
  )

  // Use React Portal to render modal at document root
  return createPortal(modalContent, document.body)
}
