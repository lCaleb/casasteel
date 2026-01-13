function Modal({ isOpen, onClose, children, ariaLabel }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <button
        aria-label="Cerrar modal"
        className="absolute inset-0 h-full w-full cursor-pointer"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-5xl">
        {children}
      </div>
    </div>
  )
}

export default Modal
