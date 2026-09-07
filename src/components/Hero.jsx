import { useEffect, useState } from "react"
import WindowFrame from "./WindowFrame"
import TiltGlow from "./TiltGlow"
import Magnetic from "./Magnetic"
import { profile } from "../data/profile"

const PHRASES = [
  "Building software used by thousands.",
  "Solo-shipped a system serving 7,000+ users.",
  "Full-stack. Backend-leaning. GenAI-curious.",
]

function useTypewriter(phrases, speed = 42, pause = 1600) {
  const [text, setText] = useState("")
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[i % phrases.length]
    let timeout
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 1.6)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setI((v) => v + 1)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, i, phrases, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(PHRASES)

  return (
    <section className="max-w-6xl mx-auto px-5 pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
        <TiltGlow intensity={2.5}>
        <WindowFrame tab="hero.jsx" className="fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="p-7 md:p-9">
            <div className="font-mono text-xs text-signal mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
              {profile.status.availability}
            </div>
            <h1 className="text-3xl md:text-[2.6rem] leading-[1.08] font-extrabold tracking-tight text-text">
              {profile.name}
            </h1>
            <p className="mt-2 font-mono text-sm md:text-base text-signal">
              {profile.role} <span className="text-text-faint">/</span> {profile.focus}
            </p>
            <p className="mt-5 max-w-md text-text-dim text-[15px] leading-relaxed">
              {profile.summary}
            </p>

            <div className="mt-7 h-6 font-mono text-[13px] text-text-dim">
              <span className="text-text-faint">$</span> echo "{typed}"
              <span className="cursor-blink text-signal">▌</span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Magnetic>
                <a href="#projects" className="px-4 py-2 rounded-md bg-signal text-bg text-[13px] font-mono font-semibold hover:brightness-110 transition inline-block">
                  Explore Projects →
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="#contact" className="px-4 py-2 rounded-md border border-border text-text-dim text-[13px] font-mono hover:border-signal-dim hover:text-text transition inline-block">
                  Get in touch
                </a>
              </Magnetic>
            </div>
          </div>
        </WindowFrame>
        </TiltGlow>

        <TiltGlow intensity={2.5}>
        <WindowFrame tab="status" title="system.status" className="fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="p-5 grid grid-cols-2 gap-3">
            {profile.stats.map((s) => (
              <div key={s.label} className="rounded-md border border-border-soft bg-elevated/50 px-3.5 py-3">
                <div className="text-[10px] font-mono uppercase tracking-wide text-text-faint">{s.label}</div>
                <div className="mt-1 font-mono text-lg font-semibold text-text">{s.value}</div>
              </div>
            ))}
            <div className="col-span-2 rounded-md border border-border-soft bg-elevated/50 px-3.5 py-3">
              <div className="text-[10px] font-mono uppercase tracking-wide text-text-faint mb-1.5">Currently learning</div>
              <div className="flex flex-wrap gap-1.5">
                {profile.status.learning.map((l) => (
                  <span key={l} className="px-2 py-0.5 rounded-full border border-amber/30 bg-amber/10 text-amber text-[11px] font-mono">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </WindowFrame>
        </TiltGlow>
      </div>
    </section>
  )
}
