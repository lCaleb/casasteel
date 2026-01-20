import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cs-cookie-consent'

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (saved !== 'accepted') {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'accepted')
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] bg-ink/90 px-4 py-4 text-white shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.6)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex-1 text-sm leading-relaxed text-white/90">
          <p className="font-semibold text-white">Cookies y Pixel de Meta</p>
          <p className="mt-1">
            Usamos cookies y Pixel para analítica y marketing. Al continuar aceptas su uso. Puedes leer los detalles en
            la página de políticas dentro del sitio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={accept}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
