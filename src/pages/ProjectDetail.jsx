import { useParams, Link, Navigate } from "react-router-dom"
import { getProject, projects } from "../data/projects"
import WindowFrame from "../components/WindowFrame"
import ArchitectureDiagram from "../components/ArchitectureDiagram"

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to="/" replace />

  const others = projects.filter((p) => p.slug !== slug)

  return (
    <div className="max-w-4xl mx-auto px-5 py-12 md:py-16">
      <Link to="/#projects" className="font-mono text-xs text-text-dim hover:text-signal transition-colors inline-flex items-center gap-1.5">
        ← All projects
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wide text-amber">{project.kind}</div>
          <h1 className="mt-1 text-2xl md:text-4xl font-extrabold tracking-tight text-text">{project.name}</h1>
          <p className="mt-3 text-text-dim max-w-xl">{project.oneLiner}</p>
        </div>
        <span className="px-3 py-1 rounded-full border border-signal-dim text-signal text-xs font-mono shrink-0">
          {project.status}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="font-mono rounded-md border border-border-soft bg-elevated/50 px-3.5 py-2.5">
            <div className="text-base font-semibold text-text">{m.value}</div>
            <div className="text-[10px] uppercase tracking-wide text-text-faint">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <a href={project.links.github} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-border text-text-dim text-[13px] font-mono hover:border-signal-dim hover:text-text transition">
          GitHub ↗
        </a>
        <a href={project.links.demo} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md border border-border text-text-dim text-[13px] font-mono hover:border-signal-dim hover:text-text transition">
          Live Demo ↗
        </a>
      </div>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Problem</h2>
        <p className="text-text-dim leading-relaxed">{project.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Architecture</h2>
        <WindowFrame tab="architecture.svg">
          <div className="p-6">
            <ArchitectureDiagram {...project.architecture} />
          </div>
        </WindowFrame>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Approach & Design Decisions</h2>
        <ul className="space-y-3">
          {project.approach.map((a, i) => (
            <li key={i} className="flex gap-3 text-text-dim leading-relaxed">
              <span className="font-mono text-signal shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Challenges</h2>
        <ul className="space-y-3">
          {project.challenges.map((c, i) => (
            <li key={i} className="flex gap-3 text-text-dim leading-relaxed">
              <span className="text-amber shrink-0">▲</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">What I Learned</h2>
        <p className="text-text-dim leading-relaxed">{project.learned}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-signal mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-md border border-border bg-elevated/60 text-text-dim text-[12.5px] font-mono">
              {s}
            </span>
          ))}
        </div>
      </section>

      {others.length > 0 && (
        <section className="mt-16 border-t border-border-soft pt-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-text-faint mb-4">Next project</h2>
          {others.map((p) => (
            <Link key={p.slug} to={`/project/${p.slug}`} className="text-text font-semibold hover:text-signal transition-colors">
              {p.name} →
            </Link>
          ))}
        </section>
      )}
    </div>
  )
}
