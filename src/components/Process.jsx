import Section from './Section'
import SectionTitle from './SectionTitle'

const steps = [
  {
    title: 'Evaluación',
    desc: 'Revisamos metraje, terreno, clima y acceso para el material.',
  },
  {
    title: 'Diseño y alcance',
    desc: 'Definimos estructura y alcance del proyecto según lo requerido.',
  },
  {
    title: 'Fabricación',
    desc: 'Preparamos estructura y componentes para montaje.',
  },
  {
    title: 'Montaje y entrega',
    desc: 'Instalación en sitio, revisión final y entrega.',
  },
]

function Process() {
  return (
    <Section id="proceso" className="bg-white">
      <div className="flex flex-col gap-8">
        <SectionTitle
          eyebrow="Nuestro proceso"
          title="Claro, por etapas, y ajustado al terreno."
          subtitle="Orden y transparencia para que sepas qué sigue en cada fase."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="card h-full p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-field/10 text-sm font-semibold text-field">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Process
