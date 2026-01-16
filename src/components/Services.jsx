import Section from './Section'
import SectionTitle from './SectionTitle'

const services = [
  {
    title: 'Enrejados metálicos robustos',
    desc: 'Seguridad perimetral residencial y comercial.',
    category: 'Seguridad',
  },
  {
    title: 'Puertas y portones en madera',
    desc: 'Portones grandes para entradas privadas.',
    category: 'Acabados',
  },
  {
    title: 'Casas en el árbol',
    desc: 'Estructura en acero y madera para proyectos recreativos.',
    category: 'Recreación',
  },
  {
    title: 'Cabañas para glamping',
    desc: 'Módulos durables para turismo y naturaleza.',
    category: 'Turismo',
  },
  {
    title: 'Pérgolas y cubiertas de acero',
    desc: 'Estructuras modernas para terrazas y jardines.',
    category: 'Exteriores',
  },
  {
    title: 'Separadores exteriores',
    desc: 'Paneles decorativos y de privacidad.',
    category: 'Decoración',
  },
  {
    title: 'Piscinas o acuarios',
    desc: 'Proyectos especiales según requerimiento.',
    category: 'Especiales',
  },
]

function Services() {
  return (
    <Section id="servicios" className="bg-white">
      <div className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Otros servicios"
          title="Estructuras y proyectos especiales en acero y madera."
          subtitle="Diseñamos soluciones a la medida para seguridad, recreación y acabados durables."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="card group flex flex-col gap-3 rounded-3xl border-line bg-white/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="chip bg-surface text-xs font-semibold text-accent">{item.category}</span>
                <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
              </div>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Services
