import Section from "./Section"
import WindowFrame from "./WindowFrame"
import { profile } from "../data/profile"

const ROWS = [
  ["Name", profile.name],
  ["Role", profile.role],
  ["Current Goal", "Software Engineering Internship"],
  ["Education", `${profile.education.degree}, ${profile.education.school}`],
  ["Interested In", "Backend · Distributed Systems · GenAI · Cybersecurity"],
  ["Currently Learning", profile.status.learning.join(" · ")],
]

export default function About() {
  return (
    <Section id="about" index="01" label="About" title="Profile, not a paragraph.">
      <WindowFrame tab="about.json">
        <dl className="divide-y divide-border-soft">
          {ROWS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[1fr_2fr] md:grid-cols-[220px_1fr] gap-3 px-5 py-3.5">
              <dt className="font-mono text-xs text-text-faint uppercase tracking-wide pt-0.5">{k}</dt>
              <dd className="text-text text-[14.5px]">{v}</dd>
            </div>
          ))}
        </dl>
      </WindowFrame>
    </Section>
  )
}
