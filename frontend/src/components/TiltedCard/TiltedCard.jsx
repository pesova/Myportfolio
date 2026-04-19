import { useCallback, useRef, useState } from 'react'

const cx = (...parts) => parts.filter(Boolean).join(' ')

/**
 * Wraps children in a 3D tilt driven by pointer position (full surface uses one transform).
 */
export default function TiltedCard({
  children,
  rotateAmplitude = 14,
  scaleOnHover = 1.06,
  className,
  innerClassName,
  showMobileWarning = false,
}) {
  const rootRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 })

  const onMove = useCallback(
    (e) => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({
        ry: px * 2 * rotateAmplitude,
        rx: -py * 2 * rotateAmplitude,
        s: scaleOnHover,
      })
    },
    [rotateAmplitude, scaleOnHover],
  )

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, s: 1 })
  }, [])

  return (
    <div
      ref={rootRef}
      className={cx('[perspective:1100px]', className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {showMobileWarning && (
        <p className="mb-2 text-center text-xs text-slate-500 sm:hidden">
          Tilt is best on desktop.
        </p>
      )}
      <div
        className={cx(
          'will-change-transform [transform-style:preserve-3d] [transition:transform_0.14s_ease-out]',
          innerClassName,
        )}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${tilt.s},${tilt.s},${tilt.s})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
