import Section from "./Section"
import { experience } from "../data/profile"

export default function Experience() {
  return (
    <Section id="experience" index="04" label="Experience" title="Timeline.">
      <div className="relative pl-6 md:pl-8">
        <div className="absolute left-[7px] md:left-[9px] top-1 bottom-1 w-px bg-border" />
        <div className="space-y-8">
          {experience.map((e, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-6 md:-left-8 top-1 w-3.5 h-3.5 rounded-full bg-bg border-2 border-signal" />
              <div className="font-mono text-xs text-signal">{e.year}</div>
              <div className="mt-1 text-text font-semibold">{e.title}</div>
              <div className="mt-1 text-text-dim text-[14px] max-w-xl">{e.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
