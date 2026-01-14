export const brandName = 'Casasteel Estructuras'
export const slogan = 'El acero no miente. Construcción firme.'
export const coverage = 'Colombia'

// Número dummy; reemplaza cuando tengas el definitivo
export const phone = '573147213401'

export const waLink = (text) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text ?? '')}`

export const defaultMessages = {
  floating: 'Hola, quiero cotizar una casa con estructura metálica. ¿Me pueden asesorar?',
  contact: 'Hola, quiero cotizar una casa con estructura metálica. Déjame mis datos:',
}
