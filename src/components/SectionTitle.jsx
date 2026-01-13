function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`section-title ${alignment}`}>
      {eyebrow ? <span className="section-title_overline">{eyebrow}</span> : null}
      {title ? <h2 className="section-title_title">{title}</h2> : null}
      {subtitle ? <p className="section-title_subtitle">{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle
