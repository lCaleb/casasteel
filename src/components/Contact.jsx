import Section from "./Section"
import SectionTitle from "./SectionTitle"
import Button from "./Button"
import InputField from "./InputField"
import { contactInfoList, contactCopy } from "../data/content"
import { useContactForm } from "../hooks/useContactForm"
import { MessageSquare, MapPin, Ruler, Camera } from "lucide-react"

// Iconos para la lista de información
const infoIcons = [MapPin, Ruler, Camera]

function Contact({ onOpenWhatsApp }) {
  const { form, errors, isSubmitting, handleChange, handleSubmit } = useContactForm({
    onSubmit: (message) => onOpenWhatsApp(message),
  })

  return (
    <Section id="contacto" className="bg-[#f3f3ef]">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        
        {/* Columna izquierda - Formulario */}
        <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-card lg:p-8">
          <SectionTitle
            eyebrow="Contacto"
            title="Hablemos de tu proyecto"
            subtitle="Déjanos tus datos y te respondemos por WhatsApp."
          />
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Grid de inputs */}
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                id="name"
                name="name"
                label="Nombre completo"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                error={errors.name}
                variant="bordered"
              />
              <InputField
                id="phone"
                name="phone"
                label="Teléfono/WhatsApp"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="10 dígitos"
                error={errors.phone}
                variant="bordered"
                inputProps={{ inputMode: "numeric", pattern: "\\d{10}", maxLength: 10 }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                id="department"
                name="department"
                label="Departamento"
                value={form.department}
                onChange={handleChange}
                placeholder="Ej: Antioquia"
                variant="bordered"
              />
              <InputField
                id="email"
                name="email"
                label="Correo electrónico"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                error={errors.email}
                variant="bordered"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                id="city"
                name="city"
                label="Ciudad/Municipio"
                value={form.city}
                onChange={handleChange}
                placeholder="Ciudad o municipio"
                variant="bordered"
              />
            </div>

            {/* Botón de envío */}
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full group"
                disabled={isSubmitting}
              >
                <span className="flex items-center justify-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  <span>{isSubmitting ? "Enviando..." : "Enviar a WhatsApp"}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </span>
              </Button>
            </div>
            
            {/* Aviso legal */}
            <div className="rounded-xl border border-line/50 bg-surface p-4">
              <p className="text-xs text-muted" aria-live="polite">
                Al enviar aceptas ser contactado para la cotización. No compartimos tu información con terceros.
              </p>
            </div>
          </form>
        </div>

        {/* Columna derecha - Información útil */}
        <div className="space-y-6">
          {/* Card de información */}
          <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-card lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <h3 className="text-lg font-semibold text-ink">Ten a la mano (si puedes)</h3>
            </div>
            
            <ul className="space-y-4">
              {contactInfoList.map((item, index) => {
                const Icon = infoIcons[index] || MapPin
                return (
                  <li key={item} className="flex items-start gap-4 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
                      <Icon className="h-5 w-5 text-muted" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-medium text-ink">{item}</p>
                      <div className="mt-2 h-px w-0 bg-accent/30 transition-all duration-300 group-hover:w-12" />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Card de proceso */}
          <div className="rounded-3xl border-2 border-line bg-white p-6 shadow-card lg:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <h3 className="text-lg font-semibold text-ink">¿Qué sigue después?</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { step: "1", text: "Recibimos tu información por WhatsApp" },
                { step: "2", text: "Coordinamos evaluación del terreno" },
                { step: "3", text: "Preparamos cotización detallada" }
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface text-xs font-bold text-brand">
                    {item.step}
                  </div>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
            
            {/* Nota final */}
            <div className="mt-6 rounded-xl border border-line/50 bg-surface p-4">
              <p className="text-sm text-muted">
                {contactCopy.helper}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact
