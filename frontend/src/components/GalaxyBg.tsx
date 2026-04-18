import Galaxy from './Galaxy.jsx'

/** Props aligned with react-bits Galaxy (see shadcn `@react-bits/Galaxy-JS-CSS`). */
const galaxyProps = {
  mouseRepulsion: false,
  mouseInteraction: false,
  density: 1,
  glowIntensity: 0.1,
  saturation: 0,
  hueShift: 0,
  twinkleIntensity: 0,
  rotationSpeed: 0,
  repulsionStrength: 2,
  autoCenterRepulsion: 1,
  starSpeed: 0.1,
  speed: 0.2,
  transparent: true,
} as const

/**
 * Full-viewport starfield background (WebGL). Sit behind content with z-index; keep pointer-events-none.
 */
export function GalaxyBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 bg-black [contain:strict]"
      aria-hidden
    >
      <Galaxy {...galaxyProps} className="absolute inset-0 h-full min-h-full w-full" />
    </div>
  )
}
