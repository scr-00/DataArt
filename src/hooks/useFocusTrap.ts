import { useEffect } from 'react'

// Hook to trap focus within a container element
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
      const selectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])'
      ].join(',')

      return Array.from(container.querySelectorAll(selectors)) as HTMLElement[]
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      
      if (focusableElements.length === 0) {
        e.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // If shift+tab on first element, focus last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
      // If tab on last element, focus first element  
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    // Only trap focus if focus is within the container
    const handleFocusChange = (e: FocusEvent) => {
      if (!container.contains(e.target as Node) && e.target !== container) {
        e.preventDefault()
        const focusableElements = getFocusableElements()
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('focusout', handleFocusChange)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('focusout', handleFocusChange)
    }
  }, [containerRef, isActive])
}
