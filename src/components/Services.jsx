import Section from './Section'
import SectionTitle from './SectionTitle'

const services = [
  {
    title: 'Enrejados metálicos robustos',
    desc: 'Seguridad perimetral residencial y comercial.',
  },
  {
    title: 'Puertas y portones en madera',
    desc: 'Portones grandes para entradas privadas.',
  },
  {
    title: 'Casas en el árbol',
    desc: 'Estructura en acero y madera para proyectos recreativos.',
  },
  {
    title: 'Cabañas para glamping',
    desc: 'Módulos durables para turismo y naturaleza.',
  },
  {
    title: 'Pérgolas y cubiertas de acero',
    desc: 'Estructuras modernas para terrazas y jardines.',
  },
  {
    title: 'Separadores exteriores',
    desc: 'Paneles decorativos y de privacidad.',
  },
  {
    title: 'Piscinas o acuarios',
    desc: 'Proyectos especiales según requerimiento.',
  },
]

function Services() {
  return (
    <Section id="servicios">
      <div className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Otros servicios"
          title="Estructuras y proyectos especiales en acero y madera."
          subtitle="Soluciones complementarias para seguridad, recreación y acabados exteriores."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="card h-full p-6">
              <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Services
