import Section from './Section'
import SectionTitle from './SectionTitle'

const items = [
  {
    title: 'Casas modulares',
    desc: 'Estructuras livianas y resistentes para vivienda.',
  },
  {
    title: 'Terreno plano',
    desc: 'Montaje más rápido con base según evaluación.',
  },
  {
    title: 'Terreno en pendiente',
    desc: 'Estructura ajustada a altura y nivelación requerida.',
  },
  {
    title: 'Estructuras especiales',
    desc: 'Proyectos a medida según necesidad del cliente.',
  },
]

function WhatWeDo() {
  return (
    <Section id="que-hacemos">
      <div className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Qué hacemos"
          title="Soluciones en estructura metálica adaptadas al terreno y al uso."
          subtitle="Diseñamos, fabricamos y montamos con alcance claro para que el proyecto avance sin sorpresas."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="card h-full p-6">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default WhatWeDo
