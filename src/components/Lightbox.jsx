import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  const [slideDirection, setSlideDirection] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)
  const containerRef = useRef(null)

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

    const currentIdx = images.findIndex((img) => img.id === displayImage.id)
    const newIdx = images.findIndex((img) => img.id === currentImage.id)
    if (currentIdx === -1 || newIdx === -1) {
      setDisplayImage(currentImage)
      setSlideDirection(null)
      return
    }

    const direction = newIdx > currentIdx ? 'right' : 'left'
    setSlideDirection(direction)

    const timer = setTimeout(() => {
      setDisplayImage(currentImage)
      setSlideDirection(null)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentImage, displayImage, images])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const slideClass =
    slideDirection === 'left'
      ? 'translate-x-full opacity-0'
      : slideDirection === 'right'
        ? '-translate-x-full opacity-0'
        : 'translate-x-0 opacity-100'

  const panelVariants = {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.3, ease: 'easeInOut' } },
  }

  return (
    <AnimatePresence>
      {isOpen && displayImage && (
        <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Visor de imagenes">
          <motion.div
            ref={containerRef}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex w-full max-h-[88vh] flex-col gap-4 overflow-hidden rounded-3xl border border-white/50 bg-white/95 p-4 shadow-[0_28px_90px_-36px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-5 lg:max-h-[84vh] lg:p-6"
          >
            {/* Header compacto */}
            <div className="flex flex-shrink-0 items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="chip capitalize border-accent/30 bg-accent/5 text-accent">
                  {displayImage.category}
                </span>
                <div className="flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
              </div>
              <Button
                variant="accent"
                onClick={onClose}
                className="border border-line px-3 py-2 text-sm hover:border-accent"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Contenedor de imagen */}
            <div className="relative flex min-h-[52vh] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-surface to-white shadow-inner lg:min-h-[60vh]">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                  <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                </div>
              )}

              <div
                className={`relative flex h-[64vh] max-h-[74vh] w-full items-center justify-center p-3 transition-all duration-300 ease-in-out sm:h-[66vh] sm:max-h-[76vh] sm:p-4 lg:h-[68vh] lg:max-h-[78vh] lg:p-5 ${slideClass}`}
              >
                <motion.img
                  drag={isMobile ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (!isMobile) return
                    const threshold = 80
                    if (info.offset.x < -threshold) onNext()
                    else if (info.offset.x > threshold) onPrev()
                    setDragProgress(0)
                  }}
                  src={displayImage.src}
                  alt={displayImage.alt}
                  className="mx-auto max-h-full max-w-full rounded-2xl object-contain shadow-lg transition-transform duration-300"
                  style={{ transform: 'scale(1)', willChange: 'transform' }}
                />

                <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white shadow">
                  {displayImage.alt}
                </div>
              </div>

              {/* Flechas */}
              {!isMobile && (
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8">
                  <button
                    onClick={onPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-all hover:border-accent hover:scale-110 active:scale-95 md:h-12 md:w-12"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={24} className="text-ink md:size-6" />
                  </button>
                  <button
                    onClick={onNext}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-all hover:border-accent hover:scale-110 active:scale-95 md:h-12 md:w-12"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={24} className="text-ink md:size-6" />
                  </button>
                </div>
              )}
            </div>

            {/* Dots con efecto sticky */}
            <div className="flex items-center justify-center">
              <div className="relative flex max-w-full items-center gap-2 overflow-x-auto px-3 py-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx === currentIndex) return
                      if (idx > currentIndex) onNext()
                      else onPrev()
                    }}
                    className={`relative h-2 w-2 rounded-full transition ${
                      idx === currentIndex
                        ? 'bg-accent shadow-[0_0_0_6px_rgba(15,61,62,0.12)]'
                        : 'bg-line hover:bg-accent/40'
                    }`}
                    aria-label={`Ir a imagen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Barra de acciones */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button
                variant="accent"
                onClick={onCopy}
                className="border border-line px-3 py-2 text-sm hover:border-acent"
              >
                {copied ? 'Copiado' : 'Copiar enlace'}
              </Button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
