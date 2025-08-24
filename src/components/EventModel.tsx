import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { EventData } from '../types'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface EventModalProps {
  isOpen: boolean;
  event: EventData | null;
  onClose: () => void;
}

export default function EventModal({ isOpen, event, onClose }: EventModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  // Custom hook for focus trap
  useFocusTrap(modalRef, isOpen)

  useEffect(() => {
    if (isOpen) {
      // Store the element that triggered the modal
      returnFocusRef.current = document.activeElement as HTMLElement
      
      // Focus the close button when modal opens
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('aria-hidden', 'true')

      // Announce modal opening to screen readers
      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = `Concert details modal opened for ${event?.title}`
      document.body.appendChild(announcement)
      
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    } else {
      // Restore body scroll and aria-hidden
      document.body.style.overflow = 'unset'
      document.body.removeAttribute('aria-hidden')
      
      // Return focus to triggering element
      if (returnFocusRef.current) {
        returnFocusRef.current.focus()
      }
    }

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
      document.body.removeAttribute('aria-hidden')
    }
  }, [isOpen, onClose, event])

  if (!isOpen || !event) return null

  const modalContent = (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          ref={closeButtonRef}
          className="modal-close"
          onClick={onClose}
          aria-label={`Close ${event.title} details`}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
        
        <h2 id="modal-title" className="modal-title">
          {event.year} – {event.title}
        </h2>
        
        <img 
          src={event.imageURL} 
          alt={`Concert photo: ${event.title} in ${event.year}`}
          className="modal-image"
        />
        
        <div className="modal-details">
          <p id="modal-description" className="modal-description">
            {event.description}
          </p>
          <p className="modal-category">
            <span className="modal-label">Category:</span> {event.category}
          </p>
        </div>

        <div className="modal-actions">
          <button 
            onClick={onClose}
            className="modal-action-button"
            type="button"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
