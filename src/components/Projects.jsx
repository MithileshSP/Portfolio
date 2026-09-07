import { Link } from "react-router-dom"
import Section from "./Section"
import WindowFrame from "./WindowFrame"
import TiltGlow from "./TiltGlow"
import { projects } from "../data/projects"

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      label="Projects"
      title="Systems, not screenshots."
      subtitle="Each project opens into its own page: problem, architecture, decisions, and what shipped."
    >
      <div className="grid gap-6">
        {projects.map((p) => (
          <Link key={p.slug} to={`/project/${p.slug}`} className="group block">
            <TiltGlow>
            <WindowFrame tab={`${p.slug}.md`} className="transition-colors group-hover:border-signal-dim">
              <div className="p-6 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wide text-amber">{p.kind}</div>
                    <h3 className="mt-1 text-xl font-bold text-text group-hover:text-signal transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full border border-signal-dim text-signal text-[11px] font-mono shrink-0">
                    {p.status}
                  </span>
                </div>

                <p className="mt-3 text-text-dim text-[14.5px] max-w-2xl">{p.oneLiner}</p>

                <div className="mt-4 flex flex-wrap gap-4">
                  {p.metrics.slice(0, 4).map((m) => (
                    <div key={m.label} className="font-mono">
                      <div className="text-base font-semibold text-text">{m.value}</div>
                      <div className="text-[10px] uppercase tracking-wide text-text-faint">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded border border-border-soft text-[11px] font-mono text-text-dim">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-5 text-signal text-[13px] font-mono flex items-center gap-1.5">
                  View architecture & write-up
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </WindowFrame>
            </TiltGlow>
          </Link>
        ))}
      </div>
    </Section>
  )
}
