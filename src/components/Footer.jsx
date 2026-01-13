import { brandName, slogan, coverage } from '../data/content'
import logo from '../assets/Logo-casasteel.png'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-app flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-brand/30 bg-white shadow-card">
            <img src={logo} alt={brandName} className="h-full w-full object-contain p-1.5" />
          </div>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-ink">{brandName}</p>
            <p>{slogan}</p>
            <p>{coverage}</p>
          </div>
        </div>
        <p className="text-xs text-muted">© {year}</p>
      </div>
    </footer>
  )
}

export default Footer
