import { useEffect, useState } from 'react'
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
  const [displayImage, setDisplayImage] = useState(currentImage)
  const [fadeState, setFadeState] = useState('idle') // idle | fading-out | fading-in

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

    // Primer render o misma imagen
    if (!displayImage || displayImage.id === currentImage.id) {
      setDisplayImage(currentImage)
      setFadeState('idle')
      return
    }

    // Espera a que cargue la nueva antes de swap
    if (preloadStatus !== 'loaded') return

    setFadeState('fading-out')
    const out = setTimeout(() => {
      setDisplayImage(currentImage)
      setFadeState('fading-in')
    }, 150)

    const done = setTimeout(() => setFadeState('idle'), 420)

    return () => {
      clearTimeout(out)
      clearTimeout(done)
    }
  }, [currentImage, displayImage, preloadStatus])

  const opacityClass =
    fadeState === 'fading-out'
      ? 'opacity-0'
      : fadeState === 'fading-in'
        ? 'opacity-100 animate-fadeSwap'
        : 'opacity-100'

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Visor de imágenes">
      {displayImage ? (
        <div className="card flex flex-col gap-4 p-4 lg:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <span className="chip capitalize">{displayImage.category}</span>
              <span className="text-muted">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={onCopy} className="px-3 py-2 text-sm">
                {copied ? 'Copiado' : 'Copiar enlace'}
              </Button>
              <Button variant="ghost" onClick={onClose} className="px-3 py-2 text-sm">
                <X size={18} />
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-ink/5">
            <div className="flex h-[70vh] max-h-[80vh] items-center justify-center">
              {isLoading ? (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-ink/10" />
                </div>
              ) : null}
              <img
                key={displayImage.id}
                src={displayImage.src}
                alt={displayImage.alt}
                className={`mx-auto h-full w-full max-h-[80vh] object-contain transition-opacity duration-200 ${opacityClass}`}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
              <button
                onClick={onPrev}
                className="pointer-events-auto rounded-full bg-white/80 p-2 text-ink shadow transition hover:bg-white"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={onNext}
                className="pointer-events-auto rounded-full bg-white/80 p-2 text-ink shadow transition hover:bg-white"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  )
}

export default Lightbox
