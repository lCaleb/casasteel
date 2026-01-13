import Container from './Container'

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-28 py-12 lg:py-16 ${className}`.trim()}>
      <Container>{children}</Container>
    </section>
  )
}

export default Section
