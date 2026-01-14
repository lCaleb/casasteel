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
    <Section id="que-hacemos" className="bg-white">
      <div className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Qué hacemos"
          title="Soluciones en estructura metálica adaptadas al terreno y al uso."
          subtitle="Diseñamos, fabricamos y montamos con alcance claro para que el proyecto avance sin sorpresas."
        />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div 
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border-2 border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-floating"
            >
              {/* Número de índice VISIBLE */}
              <div className="absolute right-4 top-4 text-5xl font-bold text-gray-100 select-none">
                {index + 1}
              </div>
              
              {/* Línea superior decorativa */}
              <div className="mb-4 h-1 w-12 rounded-full bg-brand/30 transition-all duration-300 group-hover:w-16 group-hover:bg-brand" />
              
              <h3 className="relative text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default WhatWeDo