import Section from './Section'
import SectionTitle from './SectionTitle'
import Container from './Container'
import Button from './Button'

const PreviewGrid = ({ images, onOpenImage }) => {
  const featured = images[0]
  const secondary = images.slice(1, 3)
  const rest = images.slice(3, 6)

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {featured ? (
          <button
            className="group relative lg:col-span-2"
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
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-floating"
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
      {rest.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenImage(item)}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-floating"
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
      ) : null}
    </>
  )
}

const FullGrid = ({ images, onOpenImage }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {images.map((item) => (
      <button
        key={item.id}
        onClick={() => onOpenImage(item)}
        className="group block w-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-floating"
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
  onEnterGalleryMode,
  onExitGalleryMode,
}) {
  const currentImages = imagesByCategory[activeCategory] ?? []
  const previewImages = currentImages.slice(0, 6)

  if (!galleryMode) {
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

          <PreviewGrid images={previewImages} onOpenImage={onOpenImage} />

          <div>
            <Button onClick={onEnterGalleryMode} className="px-6 py-3">
              Ver galería completa
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  return (
    <section id="proyectos" className="bg-white py-12 lg:py-16">
      <Container className="flex flex-col gap-8">
        <div className="sticky top-16 z-10 flex items-center justify-between rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-card backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-field">Galería</p>
            <p className="text-lg font-semibold text-ink">Explora todas las categorías</p>
          </div>
          <Button variant="ghost" onClick={onExitGalleryMode} className="px-4 py-2">
            Volver a la landing
          </Button>
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

export default Gallery
