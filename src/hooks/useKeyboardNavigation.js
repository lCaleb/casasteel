import { useEffect } from 'react'

export function useKeyboardNavigation({ enabled, onPrev, onNext, onClose }) {
  useEffect(() => {
    if (!enabled) return

    const handleKey = (event) => {
      if (event.key === 'ArrowLeft') {
        onPrev?.()
      } else if (event.key === 'ArrowRight') {
        onNext?.()
      } else if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [enabled, onClose, onNext, onPrev])
}
