import Section from './Section'
import SectionTitle from './SectionTitle'

const bullets = [
  'Se firma contrato autenticado, con el alcance del proyecto especificado.',
  'Pagos por etapas para compra de material, avances y entrega.',
  'Garantía de 8 años en daños estructurales según condiciones del contrato.',
  'No incluye humedad, filtraciones, deterioro por el tiempo/uso o falta de mantenimiento.',
]

const highlights = [
  'Contrato autenticado por notaría',
  'Pagos por etapas',
  'Garantía estructural 8 años',
]

function Guarantee() {
  return (
    <Section id="garantia" className="bg-white">
      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <SectionTitle
            eyebrow="Garantía y contrato"
            title="Transparencia desde el inicio: alcance claro y pagos por etapas."
            subtitle="Formalizamos el proyecto con documento autenticado y responsabilidades definidas."
          />
          <ul className="space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3 text-base text-muted">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-ink">Puntos clave</h3>
          <div className="mt-4 space-y-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-ink"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Guarantee
