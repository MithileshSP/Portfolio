import Section from "./Section"
import WindowFrame from "./WindowFrame"
import { profile } from "../data/profile"

const ROWS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "/in/mithileshsp", href: profile.links.linkedin },
  { label: "GitHub", value: "/MithileshSP", href: profile.links.github },
  { label: "LeetCode", value: "/u/Mithil1324", href: profile.links.leetcode },
]

export default function Contact() {
  return (
    <Section id="contact" index="06" label="Contact" title="Let's talk.">
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-6">
        <WindowFrame tab="contact.sh">
          <div className="p-6">
            <p className="text-text-dim text-[14.5px] max-w-md">
              Open to Software Engineering internships across full-stack and GenAI. If you're hiring, or just
              want to talk architecture, reach out.
            </p>
            <div className="mt-5 space-y-1">
              {ROWS.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target={r.href.startsWith("http") ? "_blank" : undefined}
                  rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-elevated transition-colors group"
                >
                  <span className="font-mono text-xs text-text-faint uppercase tracking-wide">{r.label}</span>
                  <span className="font-mono text-[13px] text-text-dim group-hover:text-signal transition-colors">{r.value}</span>
                </a>
              ))}
            </div>
          </div>
        </WindowFrame>

        <WindowFrame tab="resume.pdf">
          <div className="p-6 flex flex-col h-full">
            <div className="font-mono text-xs text-text-faint uppercase tracking-wide mb-2">Recruiter?</div>
            <p className="text-text-dim text-[13.5px] leading-relaxed flex-1">
              Everything you need in one place — resume, project write-ups, skills, and availability.
            </p>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-signal text-bg text-[13px] font-mono font-semibold hover:brightness-110 transition"
            >
              Download Resume ↓
            </a>
          </div>
        </WindowFrame>
      </div>
    </Section>
  )
}
