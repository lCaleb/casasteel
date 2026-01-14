import { useEffect, useState } from 'react'
import Section from './Section'
import SectionTitle from './SectionTitle'
import Container from './Container'
import Button from './Button'

const PreviewGrid = ({ images, onOpenImage }) => {
  const featured = images[0]
  const secondary = images.slice(1, 3)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {featured ? (
        <button
          className="group relative lg:col-span-2"
          onClick={() => onOpenImage(featured)}
        >
          <div className="aspect-[16/10] overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand group-hover:shadow-floating">
            <img
              src={featured.src}
              alt={featured.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/5" />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink">Destacado</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-field">Abrir y compartir</span>
            </div>
          </div>
        </button>
      ) : null}

      <div className="grid gap-4">
        {secondary.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenImage(item)}
            className="group relative block w-full overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-floating"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
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

const FullGrid = ({ images, onOpenImage }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {images.map((item) => (
      <button
        key={item.id}
        onClick={() => onOpenImage(item)}
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-floating"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
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

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const currentImages = imagesByCategory[activeCategory] ?? []
  const previewImages = currentImages.slice(0, 3)

  const handleOpenAll = () => {
    if (isMobile) {
      onOpenFirst()
    } else {
      onEnterGalleryMode()
    }
  }

  // Gallery mode (solo desktop)
  if (!isMobile && galleryMode) {
    return (
      <section id="proyectos" className="bg-white py-12 lg:py-16">
        <Container className="flex flex-col gap-8">
          <div className="sticky top-16 z-10 rounded-2xl border-2 border-line bg-white/90 px-6 py-4 shadow-card backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-brand" />
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-field">Galería completa</p>
                  <p className="text-lg font-semibold text-ink">Explora todas las categorías</p>
                </div>
              </div>
              <Button variant="ghost" onClick={onExitGalleryMode} className="px-4 py-2">
                Volver
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
                    ? 'border-brand bg-brand text-white shadow-card'
                    : 'hover:border-brand/40 hover:text-brand'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <FullGrid images={currentImages} onOpenImage={onOpenImage} />
        </Container>
      </section>
    )
  }

  // Vista normal (móvil y desktop sin gallery mode)
  return (
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
                  ? 'border-brand bg-brand text-white shadow-card'
                  : 'hover:border-brand/40 hover:text-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile / tablets: preview de 3 y botón para abrir lightbox */}
        <div className="space-y-6 lg:hidden">
          <PreviewGrid images={previewImages} onOpenImage={onOpenImage} />

          <div>
            <Button onClick={onOpenFirst} className="px-6 py-3">
              Ver galería completa
            </Button>
          </div>
        </div>

        {/* Desktop: preview y botón para abrir vista completa */}
        <div className="hidden lg:flex lg:flex-col lg:gap-6">
          <PreviewGrid images={previewImages} onOpenImage={onOpenImage} />
          <div>
            <Button onClick={handleOpenAll} className="px-6 py-3">
              Ver galería completa
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Gallery