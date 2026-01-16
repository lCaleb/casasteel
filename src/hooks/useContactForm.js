import { useState } from "react"

export const capitalizeWords = (text) => {
  const hasTrailingSpace = /\s$/.test(text)
  const parts = text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
  const result = parts.join(" ")
  return hasTrailingSpace && result ? `${result} ` : result
}

export const buildWhatsAppMessage = (form) =>
  [
    "Hola, quiero cotizar una casa con estructura metálica. Te comparto mis datos:",
    `• *Nombre:* ${form.name}`,
    `• *Teléfono/WhatsApp:* ${form.phone}`,
    `• *Correo:* ${form.email}`,
    form.department ? `• *Departamento:* ${form.department}` : null,
    form.city ? `• *Ciudad/Municipio:* ${form.city}` : null,
    "",
    "Por favor contáctame para continuar con la cotización.",
  ]
    .filter(Boolean)
    .join("\n")

const getValidationErrors = (form) => {
  const newErrors = {}

  if (!form.name.trim()) {
    newErrors.name = "Nombre completo es requerido"
  } else if (form.name.trim().length < 2) {
    newErrors.name = "Nombre debe tener al menos 2 caracteres"
  }

  if (!form.phone.trim()) {
    newErrors.phone = "Teléfono es requerido"
  } else if (!/^\d{10}$/.test(form.phone)) {
    newErrors.phone = "Teléfono debe tener 10 dígitos"
  }

  if (!form.email.trim()) {
    newErrors.email = "Correo es requerido"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Correo electrónico inválido"
  }

  return newErrors
}

export const useContactForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    department: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const focusFirstError = (errs) => {
    const keys = Object.keys(errs)
    if (!keys.length) return
    const first = document.getElementById(keys[0])
    if (first) {
      first.focus({ preventScroll: false })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "").slice(0, 10)
      setForm((prev) => ({ ...prev, phone: onlyDigits }))
    } else if (name === "name") {
      setForm((prev) => ({ ...prev, name: capitalizeWords(value) }))
    } else if (name === "city" || name === "department") {
      setForm((prev) => ({ ...prev, [name]: capitalizeWords(value) }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = getValidationErrors(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      focusFirstError(validationErrors)
      return
    }

    setIsSubmitting(true)
    const message = buildWhatsAppMessage(form)
    if (onSubmit) {
      onSubmit(message)
    }
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return {
    form,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setForm,
    setErrors,
  }
}
