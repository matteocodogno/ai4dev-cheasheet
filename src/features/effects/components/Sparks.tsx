import { useSparks } from '../hooks/useSparks'

const Sparks = () => {
  const { ref, enabled } = useSparks()
  if (!enabled) return null
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

export default Sparks
