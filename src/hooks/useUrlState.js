import { useCallback } from 'react'

const buildUrl = (cat, img) => {
  const params = new URLSearchParams()
  if (cat) params.set('cat', cat)
  if (img) params.set('img', img)
  const query = params.toString()
  return `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash ?? ''}`
}

export function useUrlState({ categories, imagesByCategory }) {
  const isValidCategory = useCallback(
    (cat) => Boolean(cat && categories.includes(cat)),
    [categories],
  )

  const isValidImage = useCallback(
    (cat, img) => Boolean(cat && img && imagesByCategory[cat]?.some((item) => item.id === img)),
    [imagesByCategory],
  )

  const applyUrlState = useCallback(
    ({ setActiveCategory, setCurrentImageId, setLightboxOpen, setGalleryMode }) => {
      const params = new URLSearchParams(window.location.search)
      const cat = params.get('cat')
      const img = params.get('img')

      if (isValidCategory(cat)) {
        setActiveCategory(cat)
      }

      if (isValidImage(cat, img)) {
        setGalleryMode?.(true)
        setCurrentImageId?.(img)
        setLightboxOpen?.(true)
        const target = document.getElementById('proyectos')
        if (target) {
          setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 120)
        }
      }
    },
    [isValidCategory, isValidImage],
  )

  const setUrlState = useCallback((cat, img) => {
    const nextUrl = buildUrl(cat, img)
    window.history.replaceState({}, '', nextUrl)
  }, [])

  return { applyUrlState, setUrlState, isValidCategory, isValidImage }
}
