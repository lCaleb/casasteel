import { useEffect, useState } from 'react'
import Section from './Section'
import SectionTitle from './SectionTitle'
import Button from './Button'

const PreviewGrid = ({ images, onOpenImage }) => {
  const featured = images[0]
  const secondary = images.slice(1, 3)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {featured ? (
        <button
          className="group relative transform transition duration-200 lg:col-span-2 hover:scale-[1.01]"
          onClick={() => onOpenImage(featured)}
        >
          <div className="aspect-[16/10] overflow-hidden rounded-[24px] border border-line bg-white shadow-card transition duration-200 group-hover:-translate-y-1 group-hover:shadow-floating">
            <img
              src={featured.src}
              alt={featured.alt}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-muted">
            <span className="font-semibold text-ink">Destacado</span>
            <span className="text-xs uppercase tracking-[0.2em] text-field">Abrir y compartir</span>
          </div>
        </button>
      ) : null}

      <div className="grid gap-4">
        {secondary.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpenImage(item)}
            className="group block w-full transform overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-floating"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
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
        className="group block w-full transform overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-floating"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
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
  const previewImages = currentImages.slice(0, 3) // móvil: solo 3 (incluye destacado)

  const handleOpenAll = () => {
    if (isMobile) {
      onOpenFirst()
    } else {
      onEnterGalleryMode()
    }
  }

  if (!isMobile && galleryMode) {
    return (
      <section id="proyectos" className="bg-white py-12 lg:py-16">
        <div className="container-app flex flex-col gap-8">
          <div className="sticky top-16 z-10 rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-card backdrop-blur">
            <p className="text-xs uppercase tracking-[0.16em] text-field">Galería</p>
            <p className="text-lg font-semibold text-ink">Explora todas las categorías</p>
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

          <div className="pt-2">
            <Button variant="ghost" onClick={onExitGalleryMode} className="px-6 py-3">
              Cerrar galería
            </Button>
          </div>
        </div>
      </section>
    )
  }

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
