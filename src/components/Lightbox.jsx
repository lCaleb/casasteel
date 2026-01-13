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
  useKeyboardNavigation({
    enabled: isOpen,
    onPrev,
    onNext,
    onClose,
  })

  const status = useImagePreload(currentImage?.src)
  const isLoading = status === 'loading'

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Visor de imágenes">
      {currentImage ? (
        <div className="card flex flex-col gap-4 p-4 lg:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-ink">
              <span className="chip capitalize">{currentImage.category}</span>
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
            {isLoading ? (
              <div className="flex h-[60vh] items-center justify-center text-muted">Cargando…</div>
            ) : null}
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="mx-auto h-full w-full max-h-[80vh] object-contain"
            />
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={onPrev}
                className="m-3 rounded-full bg-white/80 p-2 text-ink shadow transition hover:bg-white"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={onNext}
                className="m-3 rounded-full bg-white/80 p-2 text-ink shadow transition hover:bg-white"
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
