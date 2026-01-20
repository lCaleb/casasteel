import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Guarantee from './components/Guarantee'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppChatModal from './components/WhatsAppChatModal'
import WhatsAppFloat from './components/WhatsAppFloat'
import CookieBanner from './components/CookieBanner'
import MobileQuickNav from './components/MobileQuickNav'
import Lightbox from './components/Lightbox'
import ErrorBoundary from './components/ErrorBoundary'
import { galleryByCategory, galleryCategories } from './data/gallery'
import { defaultMessages } from './data/content'
import { useUrlState } from './hooks/useUrlState'
import { useCopyToClipboard } from './hooks/useCopyToClipboard'
import logo from './assets/Logo-casasteel.png'

function App() {
  const [activeCategory, setActiveCategory] = useState('exterior')
  const [galleryMode, setGalleryMode] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageId, setCurrentImageId] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState(defaultMessages.floating)
  const { copied, copy } = useCopyToClipboard()
  const trackFb = useCallback((event, params = {}) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', event, params)
    }
  }, [])

  const { applyUrlState, setUrlState } = useUrlState({
    categories: galleryCategories,
    imagesByCategory: galleryByCategory,
  })

  const currentImages = useMemo(
    () => galleryByCategory[activeCategory] ?? [],
    [activeCategory],
  )
  const currentIndex = currentImages.findIndex((img) => img.id === currentImageId)
  const currentImage = currentIndex >= 0 ? currentImages[currentIndex] : null

  useEffect(() => {
    applyUrlState({
      setActiveCategory,
      setCurrentImageId,
      setLightboxOpen,
      setGalleryMode,
    })
  }, [applyUrlState])

  const openChat = (message, source = 'generic') => {
    setChatMessage(message || defaultMessages.floating)
    setChatOpen(true)
    trackFb('ClickWhatsApp', { source })
  }

  const openImage = useCallback((image) => {
    setActiveCategory(image.category)
    setCurrentImageId(image.id)
    setLightboxOpen(true)
    setUrlState(image.category, image.id)
    trackFb('ViewPhoto', {
      cat: image.category,
      id: image.id,
      mode: galleryMode ? 'full' : 'preview',
    })
  }, [galleryMode, setUrlState, trackFb])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    setCurrentImageId(null)
    setUrlState(activeCategory, null)
  }, [activeCategory, setUrlState])

  const goPrev = useCallback(() => {
    if (!currentImages.length) return
    const prevIndex = (currentIndex - 1 + currentImages.length) % currentImages.length
    const nextImage = currentImages[prevIndex]
    setCurrentImageId(nextImage.id)
    setUrlState(activeCategory, nextImage.id)
  }, [activeCategory, currentImages, currentIndex, setUrlState])

  const goNext = useCallback(() => {
    if (!currentImages.length) return
    const nextIndex = (currentIndex + 1) % currentImages.length
    const nextImage = currentImages[nextIndex]
    setCurrentImageId(nextImage.id)
    setUrlState(activeCategory, nextImage.id)
  }, [activeCategory, currentImages, currentIndex, setUrlState])

  const goToIndex = useCallback(
    (idx) => {
      if (idx < 0 || idx >= currentImages.length) return
      const target = currentImages[idx]
      setCurrentImageId(target.id)
      setUrlState(activeCategory, target.id)
    },
    [activeCategory, currentImages, setUrlState],
  )

  const copyLink = useCallback(() => {
    if (!currentImage) return
    const shareUrl = `${window.location.origin}${window.location.pathname}?cat=${activeCategory}&img=${currentImage.id}`
    copy(shareUrl)
  }, [activeCategory, copy, currentImage])

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat)
    setLightboxOpen(false)
    setCurrentImageId(null)
    setUrlState(cat, null)
    trackFb('GalleryCategory', { cat })
  }, [setUrlState, trackFb])

  const openFirstImage = useCallback(() => {
    if (!currentImages.length) return
    openImage(currentImages[0])
  }, [currentImages, openImage])

  const trackViewProjects = useCallback(() => {
    trackFb('ViewProjectsCTA', { source: 'hero-link' })
  }, [trackFb])

  const enterGalleryMode = useCallback(() => {
    setGalleryMode(true)
    setUrlState(activeCategory, null)
    trackFb('GalleryMode', { mode: 'full', cat: activeCategory })
  }, [activeCategory, setUrlState, trackFb])

  const exitGalleryMode = useCallback(() => {
    setGalleryMode(false)
    setUrlState(null, null)
    const target = document.getElementById('proyectos')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    trackFb('GalleryMode', { mode: 'preview', cat: activeCategory })
  }, [activeCategory, setUrlState, trackFb])

  return (
    <main className="bg-surface pb-28 lg:pb-0" id="top">
      <Navbar onWhatsApp={(source) => openChat(defaultMessages.floating, source || 'navbar')} />
      <Hero
        onWhatsApp={(source) => openChat(defaultMessages.floating, source || 'hero')}
        onViewProjects={trackViewProjects}
      />
      <WhatWeDo />
      <Process />
      <ErrorBoundary
        fallback={
          <section id="proyectos" className="bg-white py-12 lg:py-16">
            <div className="container-app text-center">
              <p className="text-xl font-semibold text-ink">No se pudo cargar la galerÃ­a.</p>
              <p className="mt-2 text-muted">Recarga la pÃ¡gina o revisa tu conexiÃ³n.</p>
            </div>
          </section>
        }
      >
        <Gallery
          categories={galleryCategories}
          activeCategory={activeCategory}
          imagesByCategory={galleryByCategory}
          galleryMode={galleryMode}
          onCategoryChange={handleCategoryChange}
          onOpenImage={openImage}
          onOpenFirst={openFirstImage}
          onEnterGalleryMode={enterGalleryMode}
          onExitGalleryMode={exitGalleryMode}
        />
      </ErrorBoundary>
      <Guarantee />
      <Services />
      <Contact onTrack={trackFb} />
      <Footer />
      <WhatsAppFloat onClick={() => openChat(defaultMessages.floating, 'float')} />
      <MobileQuickNav />

      <WhatsAppChatModal
        isOpen={chatOpen}
        initialMessage={chatMessage}
        onClose={() => setChatOpen(false)}
      />
      <CookieBanner />

      <ErrorBoundary>
        <Lightbox
          isOpen={lightboxOpen}
          images={currentImages}
          currentImage={currentImage}
        currentIndex={currentIndex}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={goToIndex}
        onClose={closeLightbox}
        onCopy={copyLink}
        copied={copied}
        onTrack={trackFb}
      />
      </ErrorBoundary>
    </main>
  )
}

export default App



