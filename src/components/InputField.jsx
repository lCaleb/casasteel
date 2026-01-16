import clsx from "clsx"

function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helper,
  inputProps = {},
}) {
  const describedBy = error ? `${id}-error` : helper ? `${id}-helper` : undefined

  // Clase base consistente con otras secciones
  const baseClass = "rounded-2xl border-2 border-line bg-white px-4 py-3.5 text-sm text-ink focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors duration-200"
  
  // Crear className final combinando baseClass, error class, y cualquier className de inputProps
  const finalClassName = clsx(
    baseClass,
    error && "border-red-500 ring-2 ring-red-100",
    inputProps.className // Si inputProps tiene className, se añade aquí
  )

  // Extraer className de inputProps para no pasarlo dos veces
  const { className: inputClassNameProp, ...restInputProps } = inputProps

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label className="text-sm font-semibold text-ink" htmlFor={id}>
          {label} {required ? "*" : ""}
        </label>
      ) : null}
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={finalClassName}
        {...restInputProps}
      />
      {helper && !error ? (
        <p id={`${id}-helper`} className="text-xs text-muted">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-600" aria-live="polite">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default InputField