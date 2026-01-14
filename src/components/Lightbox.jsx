import { useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation'
import { useImagePreload } from '../hooks/useImagePreload'

function Lightbox({
  isOpen,
  images,
  currentImage,
  currentIndex,
  onPrev,
  onNext,
  onClose,
  onCopy,
  copied,
}) {
  // DECLARAR displayImage PRIMERO
  const [displayImage, setDisplayImage] = useState(currentImage)
  const [slideDirection, setSlideDirection] = useState(null)
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  const preloadStatus = useImagePreload(currentImage?.src)
  const isLoading = preloadStatus === 'loading'

  useKeyboardNavigation({
    enabled: isOpen,
    onPrev,
    onNext,
    onClose,
  })

  useEffect(() => {
    if (!currentImage) return
    
    if (!displayImage) {
      setDisplayImage(currentImage)
      return
    }
    
    if (displayImage.id === currentImage.id) return

    const currentIdx = images.findIndex(img => img.id === displayImage.id)
    const newIdx = images.findIndex(img => img.id === currentImage.id)
    
    if (currentIdx === -1 || newIdx === -1) return
    
    const direction = newIdx > currentIdx ? 'right' : 'left'
    
    setSlideDirection(direction)
    
    const timer = setTimeout(() => {
      setDisplayImage(currentImage)
      setSlideDirection(null)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentImage, displayImage, images])

  const slideClass = slideDirection === 'left' 
    ? 'translate-x-full opacity-0' 
    : slideDirection === 'right' 
    ? '-translate-x-full opacity-0'
    : 'translate-x-0 opacity-100'

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Visor de imágenes">
      {displayImage && (
        <div 
          ref={containerRef}
          className="rounded-3xl border-2 border-line bg-white flex flex-col gap-4 p-4 lg:p-6 max-h-[90vh] w-full overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="chip capitalize border-brand/30 bg-brand/5 text-brand">
                {displayImage.category}
              </span>
              <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-muted">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                onClick={onCopy} 
                className="px-3 py-2 text-sm border border-line hover:border-brand"
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Copiado
                  </span>
                ) : 'Copiar enlace'}
              </Button>
              <Button 
                variant="ghost" 
                onClick={onClose} 
                className="px-3 py-2 text-sm border border-line hover:border-brand"
              >
                <X size={20} />
              </Button>
            </div>
          </div>

          {/* Contenedor de imagen */}
          <div className="relative flex-1 min-h-0 overflow-hidden rounded-2xl border border-line bg-white flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-brand border-t-transparent" />
              </div>
            )}
            
            <div 
              className={`relative w-full h-full flex items-center justify-center p-4 transition-all duration-300 ease-in-out ${slideClass}`}
            >
              <img
                ref={imageRef}
                src={displayImage.src}
                alt={displayImage.alt}
                className="mx-auto max-h-full max-w-full object-contain"
                style={{ 
                  maxHeight: 'calc(90vh - 200px)',
                  maxWidth: 'calc(100% - 100px)'
                }}
              />
            </div>
            
            {/* Flechas */}
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
              <button
                onClick={onPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-all hover:border-brand hover:scale-110 active:scale-95 md:h-12 md:w-12"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} className="text-ink md:size-6" />
              </button>
              <button
                onClick={onNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-all hover:border-brand hover:scale-110 active:scale-95 md:h-12 md:w-12"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={24} className="text-ink md:size-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}

export default Lightbox