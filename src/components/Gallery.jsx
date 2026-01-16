import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from './Section'
import SectionTitle from './SectionTitle'
import Container from './Container'
import Button from './Button'

const fallbackImg =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f3ef'/%3E%3Ctext x='200' y='160' fill='%239aa1a6' font-size='16' text-anchor='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E"

const PreviewGrid = ({ images, onOpenImage, className = '' }) => {
  const featured = images[0]
  const secondary = images.slice(1, 3)

  return (
    <div className={`grid gap-6 lg:grid-cols-3 ${className}`.trim()}>
      {featured ? (
        <button className="group relative lg:col-span-2" onClick={() => onOpenImage(featured)}>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:shadow-floating">
              <img
                src={featured.src}
                alt={featured.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackImg
                  e.currentTarget.onerror = null
                }}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/5" />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">Destacado</span>
            <div className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.35)] sm:hover:shadow-card">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="cursor-pointer text-xs uppercase tracking-[0.2em] text-field underline underline-offset-4 sm:no-underline sm:hover:text-accent">
                Abrir y compartir
              </span>
            </div>
          </div>
        </button>
      ) : null}

      <div className="grid gap-4">
        {secondary.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenImage(item)}
            className="group relative block w-full overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-floating"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackImg
                  e.currentTarget.onerror = null
                }}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

const FullGrid = ({ images, onOpenImage, className = '' }) => (
  <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`.trim()}>
    {images.map((item) => (
      <button
        key={item.id}
        onClick={() => onOpenImage(item)}
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-floating"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImg
              e.currentTarget.onerror = null
            }}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </button>
    ))}
  </div>
)

function Gallery({
  categories,
  activeCategory,
  imagesByCategory,
  galleryMode,
  onCategoryChange,
  onOpenImage,
  onOpenFirst,
  onEnterGalleryMode,
  onExitGalleryMode,
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [displayCategory, setDisplayCategory] = useState(activeCategory)
  const [transitionStage, setTransitionStage] = useState('idle')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (activeCategory === displayCategory) return

    setTransitionStage('fadingOut')
    const fadeOut = setTimeout(() => {
      setDisplayCategory(activeCategory)
      setTransitionStage('fadingIn')
    }, 200)
    const settle = setTimeout(() => setTransitionStage('idle'), 500)

    return () => {
      clearTimeout(fadeOut)
      clearTimeout(settle)
    }
  }, [activeCategory, displayCategory])

  const currentImages = imagesByCategory[displayCategory] ?? []
  const previewImages = currentImages.slice(0, 3)

  const handleOpenAll = () => {
    if (isMobile) {
      onOpenFirst()
    } else {
      onEnterGalleryMode()
    }
  }

  const fadeClass =
    transitionStage === 'fadingOut'
      ? 'opacity-0 translate-y-1 scale-[0.995]'
      : 'opacity-100 translate-y-0 scale-100'

  const panelVariants = {
    initial: { opacity: 0, y: 14, scale: 0.99 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
    exit: { opacity: 0, y: 10, scale: 0.99, transition: { duration: 0.35, ease: 'easeInOut' } },
  }

  return (
    <AnimatePresence mode="wait">
      {!isMobile && galleryMode ? (
        <motion.section
          key="gallery-full"
          id="proyectos"
          className="bg-white py-12 lg:py-16"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Container className="flex flex-col gap-8">
            <div className="sticky top-16 z-10 rounded-2xl border-2 border-line bg-white/90 px-6 py-4 shadow-card backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-field">Galería completa</p>
                    <p className="text-lg font-semibold text-ink">Explora todas las categorías</p>
                  </div>
                </div>
                <Button variant="accent" onClick={onExitGalleryMode} className="px-4 py-2">
                  Cerrar galería
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`chip capitalize transition ${
                    activeCategory === cat
                      ? 'border-accent bg-accent text-white shadow-card'
                      : 'hover:border-accent/40 hover:text-accent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className={`transition-all duration-500 ease-out ${fadeClass}`}>
              <FullGrid images={currentImages} onOpenImage={onOpenImage} />
            </div>

            <div className="pt-2">
              <Button variant="accent" onClick={onExitGalleryMode} className="px-6 py-3">
                Cerrar galería
              </Button>
            </div>
          </Container>
        </motion.section>
      ) : (
        <motion.div
          key="gallery-preview"
          variants={panelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Section id="proyectos">
            <div className="flex flex-col gap-8">
              <SectionTitle
                eyebrow="Proyectos reales"
                title="Fotos reales de estructura, montaje y resultados finales."
                subtitle="Abre una foto y compártela como enlace."
              />

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onCategoryChange(cat)}
                    className={`chip capitalize transition ${
                      activeCategory === cat
                        ? 'border-accent bg-accent text-white shadow-card'
                        : 'hover:border-accent/60 hover:text-accent'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile / tablets: preview de 3 y botón para abrir lightbox */}
              <div className="space-y-6 lg:hidden">
                <div className={`transition-all duration-500 ease-out ${fadeClass}`}>
                  <PreviewGrid images={previewImages} onOpenImage={onOpenImage} />
                </div>

                <div>
                  <Button onClick={onOpenFirst} className="px-6 py-3">
                    Ver galería completa
                  </Button>
                </div>
              </div>

              {/* Desktop: preview y botón para abrir vista completa */}
              <div className="hidden lg:flex lg:flex-col lg:gap-6">
                <div className={`transition-all duration-500 ease-out ${fadeClass}`}>
                  <PreviewGrid images={previewImages} onOpenImage={onOpenImage} />
                </div>
                <div>
                  <Button onClick={handleOpenAll} className="px-6 py-3">
                    Ver galería completa
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Gallery
