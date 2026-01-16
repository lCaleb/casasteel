const variants = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  brand: 'btn-brand',
  accent: 'btn-accent',
}

function Button({ href, children, variant = 'primary', className = '', type = 'button', ...props }) {
  const classes = `${variants[variant] ?? variants.primary} ${className}`.trim()

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
