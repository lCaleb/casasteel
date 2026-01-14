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
        
        <div className="relative">
          {/* Línea conectora horizontal - Solo en desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-brand/20 to-transparent lg:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Conector vertical en móvil */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-12 h-8 w-0.5 -translate-x-1/2 bg-brand/10 md:hidden" />
                )}
                
                {/* Punto conector en línea horizontal */}
                <div className="absolute left-1/2 top-12 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-brand shadow-md lg:block" />
                
                <div className="group relative overflow-hidden rounded-2xl border-2 border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-floating">
                  {/* Número con estilo industrial */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand/20 bg-white text-lg font-bold text-brand">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                  
                  {/* Indicador visual de fase */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-brand/30 group-hover:bg-brand" />
                    <span className="text-xs font-medium text-muted group-hover:text-brand">
                      Fase {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Process