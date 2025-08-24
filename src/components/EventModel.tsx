/**
 * Accessible Event Modal Component
 * Fully accessible modal with focus trapping, ARIA attributes, and keyboard navigation
 */

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { EventModalProps } from '@/types';

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<Element | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Store the element that triggered the modal for focus return
  useEffect(() => {
    if (isOpen) {
      triggerElementRef.current = document.activeElement;
      setIsAnimating(true);
      
      // Focus close button after animation
      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
        setIsAnimating(false);
      }, 100);
    }
  }, [isOpen]);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (keyEvent: KeyboardEvent): void => {
      if (keyEvent.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (keyEvent.key === 'Tab') {
        trapFocus(keyEvent);
      }
    };

    // Prevent body scroll and add modal-open class
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', handleKeyDown);
    
    // Announce modal opening
    announceModalState('opened', event?.title || '');
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose, event?.title]);

  // Return focus when modal closes
  useEffect(() => {
    if (!isOpen && triggerElementRef.current) {
      // Delay to ensure modal is fully closed
      setTimeout(() => {
        if (triggerElementRef.current && triggerElementRef.current instanceof HTMLElement) {
          triggerElementRef.current.focus();
          announceModalState('closed', event?.title || '');
        }
      }, 100);
    }
  }, [isOpen, event?.title]);

  const trapFocus = (keyEvent: KeyboardEvent): void => {
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (focusableElements.length === 0) {
      keyEvent.preventDefault();
      return;
    }

    if (keyEvent.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        lastElement.focus();
        keyEvent.preventDefault();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        firstElement.focus();
        keyEvent.preventDefault();
      }
    }
  };

  const handleBackdropClick = (clickEvent: React.MouseEvent): void => {
    if (clickEvent.target === clickEvent.currentTarget) {
      onClose();
    }
  };

  const handleImageError = (imgEvent: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = imgEvent.currentTarget;
    const container = img.parentElement;
    if (container) {
      container.style.display = 'none';
    }
  };

  const announceModalState = (state: 'opened' | 'closed', title: string): void => {
    const message = state === 'opened' 
      ? `Modal opened for ${title}. Use Tab to navigate, Escape to close.`
      : `Modal closed. Returned to ${title} timeline event.`;
      
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'assertive');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  };

  if (!isOpen || !event) {
    return null;
  }

  const yearsSinceExtinction = new Date().getFullYear() - event.year;

  const modalContent = (
    <div 
      className={`modal ${isOpen ? 'active' : 'hidden'}`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div className="modal-content">
        <div className="modal-body">
          <button
            ref={closeButtonRef}
            className="close-btn"
            onClick={onClose}
            aria-label={`Close ${event.title} details modal`}
            type="button"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close modal</span>
          </button>

          <header className="modal-header">
            <h2 id="modal-title">
              {event.title}
              <span className="sr-only"> - Detailed Information</span>
            </h2>
            
            <div className="modal-meta" role="complementary" aria-label="Event metadata">
              <span 
                className="year-large"
                role="text"
                aria-label={`Extinct in ${event.year}, ${yearsSinceExtinction} years ago`}
              >
                {event.year}
              </span>
              <span 
                className="category-tag"
                role="text"
                aria-label={`Category: ${event.category}`}
              >
                {event.category}
              </span>
            </div>
          </header>

          <div className="modal-image">
            <img
              src={event.imageURL}
              alt={`Historical illustration or photograph of ${event.title}, showing the extinct ${event.category.toLowerCase().slice(0, -1)} in its natural habitat`}
              onError={handleImageError}
              role="img"
            />
          </div>

          <div className="modal-content-body">
            <p id="modal-description" className="description">
              {event.description}
            </p>
            
            <div className="details-grid" role="table" aria-label="Extinction details">
              <div className="detail-item" role="row">
                <strong role="rowheader">Location:</strong> 
                <span role="cell">{event.location}</span>
              </div>
              <div className="detail-item" role="row">
                <strong role="rowheader">Primary Cause:</strong> 
                <span role="cell">{event.cause}</span>
              </div>
              <div className="detail-item" role="row">
                <strong role="rowheader">Category:</strong> 
                <span role="cell">{event.category}</span>
              </div>
              <div className="detail-item" role="row">
                <strong role="rowheader">Years Since Extinction:</strong> 
                <span role="cell">{yearsSinceExtinction} years</span>
              </div>
            </div>
            
            {/* Additional context for screen readers */}
            <div className="sr-only">
              <p>
                End of {event.title} information. 
                This modal contains detailed information about the extinct {event.category.toLowerCase().slice(0, -1)} species. 
                Use Tab to navigate through the content, or press Escape to return to the timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
};

export default EventModal;
