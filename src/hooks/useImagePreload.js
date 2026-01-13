import { useEffect, useState } from 'react'

export function useImagePreload(src) {
  const [status, setStatus] = useState('idle') // idle | loading | loaded | error

  useEffect(() => {
    if (!src) return
    setStatus('loading')
    const img = new Image()
    img.src = src
    img.onload = () => setStatus('loaded')
    img.onerror = () => setStatus('error')
  }, [src])

  return status
}
