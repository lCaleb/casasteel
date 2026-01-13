const modules = import.meta.glob('../assets/gallery/*/*.{jpg,jpeg,png}', {
  eager: true,
})

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const toTitle = (value) => value.charAt(0).toUpperCase() + value.slice(1)

const categories = {
  exterior: [],
  interior: [],
  otros: [],
}

Object.entries(modules).forEach(([path, mod]) => {
  const segments = path.split('/')
  const category = segments[segments.length - 2]
  const fileName = segments[segments.length - 1]
  const id = slugify(fileName.replace(/\.[^/.]+$/, ''))
  const src = mod.default || mod

  if (!categories[category]) return
  categories[category].push({
    id,
    src,
    alt: `${toTitle(category)} - ${id}`,
    category,
  })
})

Object.values(categories).forEach((items) => {
  items.sort((a, b) => a.id.localeCompare(b.id))
})

export const galleryCategories = ['exterior', 'interior', 'otros']
export const galleryByCategory = categories
export const galleryAll = galleryCategories.flatMap((key) => categories[key])
