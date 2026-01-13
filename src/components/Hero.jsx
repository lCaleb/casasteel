import Button from './Button'
import Container from './Container'
import logo from '../assets/Logo-casasteel.png'
import { brandName } from '../data/content'

const chips = ['Garantía: 8 años', 'Contrato: autenticado']

const timelineCards = [
  { title: '70 m²', body: '1 a 2 meses' },
  { title: 'Terreno plano', body: '1 a 1.5 meses' },
  { title: 'En pendiente', body: '2 a 3 meses' },
]

function Hero({ onWhatsApp }) {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-surface to-white">
      <Container className="grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-card">
            <span className="h-2 w-2 rounded-full bg-accent" />
            El acero no miente. Construcción firme.
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink lg:text-5xl">
            Casas modulares con estructura metálica
          </h1>
          <p className="text-base leading-relaxed text-muted lg:text-lg">
            Fabricación y montaje según metraje, terreno y clima. Atendemos proyectos en Colombia
            según evaluación del terreno.
          </p>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip} className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{chip}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 rounded-3xl border border-line bg-white px-5 py-4 shadow-card">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-brand/30 bg-white">
              <img src={logo} alt={brandName} className="h-full w-full object-contain p-1.5" />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-sm font-semibold text-ink">{brandName}</p>
              <p className="text-xs text-muted">Identidad sólida: acero + campo</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={onWhatsApp} className="w-full sm:w-auto px-6 py-3.5 text-base">
              Cotizar por WhatsApp
            </Button>
            <Button href="#proyectos" variant="ghost" className="w-full sm:w-auto text-brand">
              Ver proyectos reales
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-6 rounded-[32px] bg-brand/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="pointer-events-none absolute -right-6 -bottom-8 h-32 w-32 opacity-10">
              <img src={logo} alt={brandName} className="h-full w-full object-contain" />
            </div>
            <div className="grid gap-3 p-4">
              {timelineCards.map((item, idx) => (
                <div
                  key={item.title}
                  className="card flex flex-col gap-2 rounded-2xl border-line/70 bg-gradient-to-br from-white via-white to-field/5 px-5 py-4 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                      {item.title}
                    </p>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-xl font-semibold text-ink">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
