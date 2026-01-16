import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { waLink } from '../data/content'
import Button from './Button'
import whatsappLogo from '../assets/whatsapp-logo.png'

function WhatsAppChatModal({ isOpen, initialMessage, onClose }) {
  const [message, setMessage] = useState(initialMessage)

  useEffect(() => {
    setMessage(initialMessage)
  }, [initialMessage])

  if (!isOpen) return null

  const handleSend = () => {
    const link = waLink(message || '')
    window.open(link, '_blank')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[360px] max-h-[520px] overflow-hidden rounded-3xl border border-line bg-white shadow-floating animate-chatIn sm:bottom-6 sm:right-6">
      <header className="flex items-center justify-between gap-3 bg-brand px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <img src={whatsappLogo} alt="WhatsApp" className="h-6 w-6" />
          <div className="leading-tight">
            <p className="text-sm font-semibold">WhatsApp</p>
            <p className="text-[11px] text-white/80">Previsualiza y edita antes de enviar</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-white transition hover:bg-white/15"
          aria-label="Cerrar chat"
        >
          <X size={16} />
        </button>
      </header>

      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="rounded-2xl bg-surface px-3 py-3">
          <div className="ml-auto inline-flex max-w-[90%] flex-col items-end gap-1 rounded-2xl bg-accent px-3 py-2 text-sm text-white shadow-card">
            {message || 'Mensaje vacío'}
          </div>
        </div>

        <label className="flex flex-col gap-2 text-sm font-semibold text-ink">
          Editar mensaje
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-line bg-surface px-3 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <div className="flex flex-col gap-2">
          <Button onClick={handleSend} className="w-full justify-center">
            Abrir WhatsApp y enviar
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full justify-center">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppChatModal
