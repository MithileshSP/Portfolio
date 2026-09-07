import Section from "./Section"
import { lab } from "../data/profile"

const TAG_COLORS = {
  Concurrency: "text-signal border-signal-dim",
  DevOps: "text-amber border-amber/30",
  Java: "text-violet border-violet/30",
  Infra: "text-amber border-amber/30",
  GenAI: "text-violet border-violet/30",
  Security: "text-danger border-danger/30",
}

export default function Lab() {
  return (
    <Section
      id="lab"
      index="05"
      label="Lab"
      title="Currently experimenting with."
      subtitle="What's on the workbench this month — updated as it changes, not a static list of buzzwords."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lab.map((item) => (
          <div key={item.title} className="rounded-lg border border-border bg-surface/70 p-4">
            <span className={`inline-block px-2 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wide ${TAG_COLORS[item.tag] || "text-text-dim border-border"}`}>
              {item.tag}
            </span>
            <h3 className="mt-2.5 text-[14.5px] font-semibold text-text">{item.title}</h3>
            <p className="mt-1.5 text-[13px] text-text-dim leading-relaxed">{item.note}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
