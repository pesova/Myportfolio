export function GalaxyBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black [contain:strict]" aria-hidden>
      <div className="deep-space-gradient absolute inset-0" />
      <div className="deep-space-stars near absolute inset-0" />
      <div className="deep-space-stars far absolute inset-0" />

      <span className="deep-space-meteor meteor-a" />
      <span className="deep-space-meteor meteor-b" />
      <span className="deep-space-meteor meteor-c" />
    </div>
  )
}
