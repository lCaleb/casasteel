import whatsappLogo from '../assets/whatsapp.svg'

function WhatsAppFloat({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-floating transition hover:scale-105 hover:bg-accent/90"
      aria-label="Abrir WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="h-7 w-7" />
    </button>
  )
}

export default WhatsAppFloat
