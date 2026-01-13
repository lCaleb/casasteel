/* Simple centered container for consistent gutters */
function Container({ className = '', children }) {
  return <div className={`container-app ${className}`.trim()}>{children}</div>
}

export default Container
