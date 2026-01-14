import { useState } from 'react'
import Section from './Section'
import SectionTitle from './SectionTitle'
import Button from './Button'

const infoList = ['Ubicación del terreno', 'Metros aproximados', 'Fotos o video del terreno']

function Contact({ onOpenWhatsApp }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    department: '',
  })

  const capitalizeWords = (text) => {
    const hasTrailingSpace = /\s$/.test(text)
    const parts = text
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    const result = parts.join(' ')
    return hasTrailingSpace && result ? `${result} ` : result
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      const onlyDigits = value.replace(/\D/g, '').slice(0, 10)
      setForm((prev) => ({ ...prev, phone: onlyDigits }))
    } else if (name === 'name') {
      setForm((prev) => ({ ...prev, name: capitalizeWords(value) }))
    } else if (name === 'city' || name === 'department') {
      setForm((prev) => ({ ...prev, [name]: capitalizeWords(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleWhatsApp = (e) => {
    e.preventDefault()
    const lines = [
      'Hola, quiero cotizar una casa con estructura metálica. Te comparto mis datos:',
      `Nombre: ${form.name || '---'}`,
      `Teléfono/WhatsApp: ${form.phone || '---'}`,
      `Correo: ${form.email || '---'}`,
      form.department ? `Departamento: ${form.department}` : null,
      form.city ? `Ciudad/Municipio: ${form.city}` : null,
    ].filter(Boolean)
    onOpenWhatsApp(lines.join('\n'))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', form)
  }

  return (
    <Section id="contacto" className="bg-white">
      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div className="card p-6 lg:p-8">
          <SectionTitle
            eyebrow="Contacto"
            title="Hablemos de tu proyecto"
            subtitle="Déjanos tus datos y te respondemos por WhatsApp."
          />
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink" htmlFor="name">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink" htmlFor="phone">
                  Teléfono/WhatsApp *
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="10 dígitos"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink" htmlFor="department">
                  Departamento
                </label>
                <input
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="Ej: Antioquia"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink" htmlFor="email">
                  Correo *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink" htmlFor="city">
                  Ciudad/Municipio (opcional)
                </label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="Ciudad o municipio"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="w-full sm:w-auto" onClick={handleWhatsApp}>
                Enviar a WhatsApp
              </Button>
              <Button variant="ghost" className="w-full text-brand sm:w-auto" type="submit">
                Enviar formulario
              </Button>
            </div>
            <p className="text-xs text-muted">
              Al enviar aceptas ser contactado para la cotización. No compartimos tu información con
              terceros.
            </p>
          </form>
        </div>

        <div className="card p-6 lg:p-8">
          <h3 className="text-lg font-semibold text-ink">Ten a la mano (si puedes)</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {infoList.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-field" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-ink">
            Déjanos tus datos y coordinamos por WhatsApp según disponibilidad y evaluación del
            terreno.
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
