import Section from './Section'
import SectionTitle from './SectionTitle'

const bullets = [
  'Se firma contrato autenticado, con el alcance del proyecto especificado.',
  'Pagos por etapas para compra de material, avances y entrega.',
  'Garantía de 8 años en daños estructurales según condiciones del contrato.',
  'No incluye humedad, filtraciones, deterioro por el tiempo/uso o falta de mantenimiento.',
]

const highlights = [
  {
    title: 'Contrato autenticado',
    desc: 'Documento notariado con alcance especificado',
  },
  {
    title: 'Pagos por etapas',
    desc: 'Según compra de material y avances de obra',
  },
  {
    title: 'Garantía 8 años',
    desc: 'En daños estructurales según contrato',
  },
]

function Guarantee() {
  return (
    <Section id="garantia" className="bg-[#f3f3ef]">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-8">
          <SectionTitle
            eyebrow="Garantía y contrato"
            title="Transparencia desde el inicio: alcance claro y pagos por etapas."
            subtitle="Formalizamos el proyecto con documento autenticado y responsabilidades definidas."
          />

          <div className="space-y-6">
            {bullets.map((item, index) => (
              <div key={item} className="group flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent/20 bg-white text-lg font-bold text-brand transition-colors duration-300 group-hover:border-accent">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <p className="text-base text-ink transition-colors duration-300 group-hover:text-brand">
                    {item}
                  </p>
                  <div className="mt-3 h-px w-0 bg-accent/80 transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-card">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <div>
                  <h3 className="text-xl font-semibold text-ink">Puntos clave del contrato</h3>
                  <p className="text-sm text-muted">Seguridad y claridad para ambas partes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border-2 border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
                        <h4 className="font-semibold text-ink">{item.title}</h4>
                      </div>
                      <p className="mt-3 text-sm text-muted">{item.desc}</p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-white text-xs font-bold text-brand">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line/50 bg-surface p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                    <div className="h-2 w-2 rounded-full bg-amber-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">Importante</p>
                  <p className="mt-1 text-sm text-muted">
                    La garantía aplica según condiciones especificadas en el contrato. Se excluyen
                    daños por falta de mantenimiento o eventos naturales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Guarantee
