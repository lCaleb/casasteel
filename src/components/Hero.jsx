import Button from './Button'
import Container from './Container'
import logo from '../assets/Logo-casasteel.png'
import { brandName  } from '../data/content'

const chips = ['Garantía: 8 años', 'Contrato: autenticado']

const timelineCards = [
  { title: '70 m²', body: '1 a 2 meses' },
  { title: 'Terreno plano', body: '1 a 1.5 meses' },
  { title: 'En pendiente', body: '2 a 3 meses' },
]

function Hero({ onWhatsApp }) {
  return (
    <section className="overflow-hidden bg-surface">
      {/* Logo grande de fondo - CENTRADO */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={logo} 
          alt={brandName} 
          className="h-auto max-h-[70vh] w-auto max-w-[70vw] object-contain opacity-10"
        />
      </div>

      <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-6 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-card">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Estructuras sismo-resistentes.
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
          
          {/* SECCIÓN DE LOGO MÁS DESTACADA - VERSIÓN MEJORADA */}
          <div className="flex items-center gap-6 rounded-3xl border border-line bg-white p-6 shadow-card">
            {/* Logo MÁS GRANDE */}
            <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-brand bg-white p-2 shadow-lg">
              <img src={logo} alt={brandName} className="h-full w-full object-contain" />
            </div>
            
            <div className="flex flex-col">
              <p className="text-xl font-bold text-ink">{brandName}</p>
              <p className="text-sm text-muted">Construcción en acero - Proyectos a medida</p>
              
              {/* BENEFICIOS ÚNICOS (sin repetir garantía/contrato) */}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-ink">Larga vida útil - mínimo mantenimiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-ink">Diseño personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium text-ink">Montaje rápido</span>
                </div>
              </div>
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
            {/* Logo solo abajo a la derecha */}
            <div className="pointer-events-none absolute -right-6 -bottom-8 h-32 w-32 opacity-20">
              <img src={logo} alt={brandName} className="h-full w-full object-contain" />
            </div>
            
            <div className="grid gap-3 p-6">
              {timelineCards.map((item, idx) => (
                <div
                  key={item.title}
                  className="card group relative flex flex-col gap-2 rounded-2xl border-line/70 bg-gradient-to-br from-white via-white to-field/5 px-5 py-4 shadow-card transition duration-200 hover:border-brand/60 hover:shadow-floating hover:to-field/10"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand">
                      {item.title}
                    </p>
                    <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <p className="text-xl font-semibold text-ink">{item.body}</p>
                </div>
              ))}
            </div>
            
            {/* Footer del card con logo */}
            <div className="border-t border-line/30 p-4">
              <div className="flex items-center justify-center gap-3">
                <div className="h-6 w-6 overflow-hidden rounded-full">
                  <img src={logo} alt={brandName} className="h-full w-full object-contain" />
                </div>
                <span className="text-sm font-medium text-muted">{brandName} - Tiempos de entrega</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero