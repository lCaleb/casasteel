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
import Lightbox from './components/Lightbox'
import { galleryByCategory, galleryCategories } from './data/gallery'
import { defaultMessages } from './data/content'
import { useUrlState } from './hooks/useUrlState'
import { useCopyToClipboard } from './hooks/useCopyToClipboard'

function App() {
  const [activeCategory, setActiveCategory] = useState('exterior')
  const [galleryMode, setGalleryMode] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageId, setCurrentImageId] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState(defaultMessages.floating)
  const { copied, copy } = useCopyToClipboard()

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

  const openChat = (message) => {
    setChatMessage(message || defaultMessages.floating)
    setChatOpen(true)
  }

  const openImage = useCallback((image) => {
    setActiveCategory(image.category)
    setCurrentImageId(image.id)
    setLightboxOpen(true)
    setUrlState(image.category, image.id)
  }, [setUrlState])

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
  }, [setUrlState])

  const enterGalleryMode = useCallback(() => {
    setGalleryMode(true)
    setUrlState(activeCategory, null)
  }, [activeCategory, setUrlState])

  const exitGalleryMode = useCallback(() => {
    setGalleryMode(false)
    setUrlState(null, null)
    const target = document.getElementById('proyectos')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [setUrlState])

  return (
    <main className="bg-surface">
      <Navbar onWhatsApp={() => openChat(defaultMessages.floating)} />
      <Hero onWhatsApp={() => openChat(defaultMessages.floating)} />
      <WhatWeDo />
      <Process />
      <Gallery
        categories={galleryCategories}
        activeCategory={activeCategory}
        imagesByCategory={galleryByCategory}
        galleryMode={galleryMode}
        onCategoryChange={handleCategoryChange}
        onOpenImage={openImage}
        onEnterGalleryMode={enterGalleryMode}
        onExitGalleryMode={exitGalleryMode}
      />
      <Guarantee />
      <Services />
      <Contact onOpenWhatsApp={openChat} />
      <Footer />
      <WhatsAppFloat onClick={() => openChat(defaultMessages.floating)} />

      <WhatsAppChatModal
        isOpen={chatOpen}
        initialMessage={chatMessage}
        onClose={() => setChatOpen(false)}
      />

      <Lightbox
        isOpen={lightboxOpen}
        images={currentImages}
        currentImage={currentImage}
        currentIndex={currentIndex}
        onPrev={goPrev}
        onNext={goNext}
        onClose={closeLightbox}
        onCopy={copyLink}
        copied={copied}
      />
    </main>
  )
}

export default App
