const mobileLinks = [
  { href: '#que-hacemos', label: 'Qué hacemos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#garantia', label: 'Garantía' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#contacto', label: 'Contacto' },
  { href: '#terminos', label: 'Políticas' },
]

function MobileQuickNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-30 flex w-[calc(100%-24px)] max-w-xl -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-2xl border border-line/80 bg-white/95 px-2 py-2 shadow-[0_14px_36px_-18px_rgba(0,0,0,0.45)] backdrop-blur lg:hidden">
      <span className="shrink-0 rounded-xl bg-surface px-3 py-2 text-[10px] font-semibold text-muted">
        Desliza
      </span>
      {mobileLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="shrink-0 rounded-xl border border-line/60 px-4 py-2 text-[11px] font-semibold text-ink transition hover:bg-surface hover:text-brand"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export default MobileQuickNav
