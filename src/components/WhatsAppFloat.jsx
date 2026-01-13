import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import whatsappLogo from '../assets/whatsapp.svg'

function WhatsAppFloat({ onClick }) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 320)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showTop ? (
        <button
          onClick={handleTop}
          className="btn btn-ghost fixed bottom-28 right-8 z-40 px-3 py-2 shadow-card"
          aria-label="Volver arriba"
        >
          <ChevronUp size={18} />
          Arriba
        </button>
      ) : null}

      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 z-40 flex h-[76px] w-[76px] items-center justify-center rounded-full text-accent drop-shadow-lg transition hover:scale-110 focus:outline-none animate-float"
        aria-label="Abrir WhatsApp"
      >
        <img src={whatsappLogo} alt="WhatsApp" className="h-12 w-12 animate-float" />
      </button>
    </>
  )
}

export default WhatsAppFloat
