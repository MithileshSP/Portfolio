import { useState } from "react"
import Section from "./Section"
import WindowFrame from "./WindowFrame"
import { skills } from "../data/profile"

const ICONS = {
  Languages: "◆",
  Frontend: "▣",
  Backend: "▤",
  Database: "▦",
  "DevOps & Deployment": "▧",
  "AI / GenAI": "✦",
}

export default function Skills() {
  const groups = Object.keys(skills)
  const [open, setOpen] = useState(Object.fromEntries(groups.map((g) => [g, true])))

  return (
    <Section id="skills" index="02" label="Skills" title="Explorer view.">
      <WindowFrame tab="explorer">
        <div className="p-3 font-mono text-[13.5px]">
          {groups.map((g) => (
            <div key={g} className="mb-1">
              <button
                onClick={() => setOpen((o) => ({ ...o, [g]: !o[g] }))}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-elevated text-left text-text-dim"
              >
                <span className={`text-text-faint transition-transform ${open[g] ? "rotate-90" : ""}`}>›</span>
                <span className="text-signal">{ICONS[g] || "▪"}</span>
                <span className="font-semibold text-text">{g}</span>
                <span className="ml-auto text-[10px] text-text-faint">{skills[g].length}</span>
              </button>
              {open[g] && (
                <div className="ml-7 pl-3 border-l border-border-soft flex flex-wrap gap-1.5 py-2">
                  {skills[g].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md border border-border bg-elevated/60 text-text-dim text-[12.5px]">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </WindowFrame>
    </Section>
  )
}
