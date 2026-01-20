import { brandName, slogan, coverage } from '../data/content'
import logo from '../assets/Logo-casasteel.png'
import { MapPin, Phone, Mail, Code, Globe } from 'lucide-react'

function Footer() {
  const year = new Date().getFullYear()

  const contactInfo = [
    { icon: Phone, text: 'WhatsApp: 3147213401' },
    { icon: Mail, text: 'Email: casasteelestructuras@gmail.com' },
    { icon: MapPin, text: `Cobertura: ${coverage}` },
  ]

  const quickLinks = [
    { href: '#que-hacemos', label: 'Qué hacemos' },
    { href: '#proceso', label: 'Proceso' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#garantia', label: 'Garantía' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#contacto', label: 'Contacto' }
  ]

  return (
    <footer className="relative min-h-[600px] overflow-hidden border-t-2 border-line bg-white">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <img
          src={logo}
          alt={brandName}
          loading="lazy"
          className="h-auto w-[800px] max-w-[95%] object-contain opacity-10"
        />
      </div>
      <div className="container-app relative z-10">
        <div className="grid gap-12 py-16 lg:grid-cols-3">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start gap-6">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border-3 border-brand/40 bg-white shadow-card">
                <img
                  src={logo}
                  alt={brandName}
                  loading="lazy"
                  className="h-full w-full object-contain p-3"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-ink">{brandName}</h3>
                <p className="text-base text-muted">{slogan}</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <h4 className="text-xl font-semibold text-ink">Enlaces rápidos</h4>
            </div>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-3 text-base text-muted transition-colors hover:text-brand"
                  >
                    <div className="h-2 w-2 rounded-full bg-line transition-colors group-hover:bg-accent" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-brand" />
              <h4 className="text-xl font-semibold text-ink">Contacto</h4>
            </div>

            <div className="space-y-5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                      <Icon className="h-5 w-5 text-muted" />
                    </div>
                    <p className="text-base text-muted">{item.text}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-line/50 bg-surface p-5">
              <p className="text-base font-semibold text-ink">Horario de atención</p>
              <p className="mt-2 text-sm text-muted">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted">Sábados: 9:00 AM - 1:00 PM</p>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-line/50" />

        <div className="flex flex-col gap-8 py-10">
          <div className="flex flex-col items-center gap-6 text-center text-base text-muted sm:flex-row sm:justify-between">
            <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:justify-start">
              <span className="hidden h-1.5 w-1.5 rounded-full bg-brand/40 align-middle sm:inline-block" />
              <p className="leading-tight">
                © {year} {brandName}. Todos los derechos reservados.
              </p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted/80">
              <div className="flex items-center gap-3 rounded-xl border border-line/30 bg-surface/50 px-4 py-3">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Sitio desarrollado por</span>
                <span className="sm:hidden">Por</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-accent/70" />
                <a
                  href="mailto:lcaleblhenao@gmail.com" target="_blank" rel="noreferrer"
                  className="text-base font-medium text-ink/80 transition-colors hover:text-brand"
                >
                  DeVHC
                </a>
                <span className="text-muted/60">|</span>
                <a
                  href="https://wa.me/573167126929" target="_blank" rel="noreferrer"
                  className="text-base text-muted transition-colors hover:text-brand"
                >
                  +57 316 712 6929
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted/70">
              ¿Necesitas una web como esta? 
              <a
                href="mailto:lcaleblhenao@gmail.com" target="_blank" rel="noreferrer"
                className="ml-2 text-base font-medium text-accent/80 transition-colors hover:text-accent"
              >
                Contáctanos : lcaleblhenao@gmail.com
              </a>
            </p>
          </div>

          <div id="terminos" className="mx-auto mb-14 max-w-4xl text-xs text-muted/80 sm:mb-0">
            <details className="rounded-2xl border border-line/40 bg-surface p-3">
              <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/80">
                Políticas y privacidad
              </summary>
              <div className="mt-2 space-y-2 leading-relaxed">
                <p>
                  Usamos cookies y el Pixel de Meta para analítica y marketing. Al continuar navegando aceptas su uso.
                  No compartimos tus datos con terceros fuera de los proveedores necesarios para operar el sitio.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

