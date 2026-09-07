import { useRef } from "react"

// Subtle pointer-tracked tilt + glow. Wrap any card with it for a "workstation panel" feel on hover.
export default function TiltGlow({ children, className = "", intensity = 6 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rotY = (px - 0.5) * intensity
    const rotX = (0.5 - py) * intensity
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`
    el.style.setProperty("--spot-x", `${px * 100}%`)
    el.style.setProperty("--spot-y", `${py * 100}%`)
    el.style.setProperty("--spot-opacity", "1")
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"
    el.style.setProperty("--spot-opacity", "0")
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity: "var(--spot-opacity, 0)",
          background:
            "radial-gradient(320px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(94,234,212,0.13), transparent 70%)",
        }}
      />
      {children}
    </div>
  )
}
