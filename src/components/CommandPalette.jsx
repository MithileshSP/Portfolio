import { useEffect, useMemo, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { projects } from "../data/projects"

const ACTIONS = [
  { id: "about", label: "Go to About", hint: "section", action: (nav) => scrollTo(nav, "about") },
  { id: "projects", label: "Go to Projects", hint: "section", action: (nav) => scrollTo(nav, "projects") },
  { id: "experience", label: "Go to Experience", hint: "section", action: (nav) => scrollTo(nav, "experience") },
  { id: "skills", label: "Go to Skills", hint: "section", action: (nav) => scrollTo(nav, "skills") },
  { id: "lab", label: "Go to Lab", hint: "section", action: (nav) => scrollTo(nav, "lab") },
  { id: "contact", label: "Go to Contact", hint: "section", action: (nav) => scrollTo(nav, "contact") },
  ...projects.map((p) => ({
    id: p.slug,
    label: `Open project: ${p.name}`,
    hint: "project",
    action: (nav) => nav(`/project/${p.slug}`),
  })),
  { id: "resume", label: "Download Resume", hint: "file", action: () => window.open("/resume.pdf", "_blank") },
]

function scrollTo(navigate, id) {
  navigate("/")
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 60)
  })
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ACTIONS
    return ACTIONS.filter((a) => a.label.toLowerCase().includes(q) || a.hint.includes(q))
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
      if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      if (e.key === "Enter") {
        const r = results[active]
        if (r) { r.action(navigate); onClose() }
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, results, active, navigate, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg border border-border bg-surface shadow-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border-soft">
          <span className="text-signal font-mono text-sm">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0) }}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent outline-none font-mono text-sm text-text placeholder:text-text-faint"
            aria-label="Command palette search"
          />
          <kbd className="px-1.5 py-0.5 rounded border border-border-soft text-[10px] text-text-faint font-mono">esc</kbd>
        </div>
        <ul className="max-h-72 overflow-y-auto py-1.5" role="listbox">
          {results.length === 0 && (
            <li className="px-4 py-3 text-sm font-mono text-text-faint">No matches.</li>
          )}
          {results.map((r, i) => (
            <li key={r.id}>
              <button
                onMouseEnter={() => setActive(i)}
                onClick={() => { r.action(navigate); onClose() }}
                className={`w-full text-left px-4 py-2.5 flex items-center justify-between font-mono text-[13px] ${
                  i === active ? "bg-elevated text-text" : "text-text-dim"
                }`}
              >
                <span>{r.label}</span>
                <span className="text-[10px] text-text-faint uppercase tracking-wide">{r.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
