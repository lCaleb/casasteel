import { brandName, slogan } from '../data/content'
import Button from './Button'
import Container from './Container'
import logo from '../assets/Logo-casasteel.png'

const links = [
  { href: '#que-hacemos', label: 'Qué hacemos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos reales' },
  { href: '#garantia', label: 'Garantía' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
]

function Navbar({ onWhatsApp }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/80 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-brand/30 bg-white shadow-card">
            <img src={logo} alt={brandName} className="h-full w-full object-contain p-1" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-ink">{brandName}</span>
            <span className="text-xs text-muted">{slogan}</span>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button onClick={onWhatsApp} className="px-5 py-3">
            Cotizar por WhatsApp
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Navbar
