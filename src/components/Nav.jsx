import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const LINKS = [
  { to: "/#about", label: "About" },
  { to: "/#projects", label: "Projects" },
  { to: "/#experience", label: "Experience" },
  { to: "/#skills", label: "Skills" },
  { to: "/#lab", label: "Lab" },
  { to: "/#contact", label: "Contact" },
]

export default function Nav({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goHome = (e) => {
    if (location.pathname !== "/") return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? "bg-bg/90 backdrop-blur-md border-border" : "bg-transparent border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link to="/" onClick={goHome} className="font-mono text-sm text-text font-semibold tracking-tight flex items-center gap-2">
          <span className="text-signal">~/</span>mithilesh
          <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.to}
              className="px-3 py-1.5 text-[13px] font-mono text-text-dim hover:text-text transition-colors rounded-md hover:bg-elevated"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface text-text-dim text-[12px] font-mono hover:border-signal-dim hover:text-text transition-colors"
        >
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 rounded border border-border-soft bg-elevated text-[10px]">⌘K</kbd>
        </button>
      </nav>
    </header>
  )
}
