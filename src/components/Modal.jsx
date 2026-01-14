import { useEffect, useState } from 'react'

function Modal({ isOpen, onClose, children, ariaLabel }) {
  const [show, setShow] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShow(true)
      // Pequeño delay para la animación
      setTimeout(() => setAnimate(true), 10)
    } else {
      setAnimate(false)
      const timer = setTimeout(() => setShow(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Prevenir scroll del body cuando modal está abierto
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!show) return null

  const handleBackdropClick = (e) => {
    // Solo cerrar si se hace click en el backdrop (no en el contenido)
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm transition-all duration-300 ${
        animate ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative z-10 w-full max-w-5xl transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal