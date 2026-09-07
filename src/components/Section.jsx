import useReveal from "../hooks/useReveal"

export default function Section({ id, index, label, title, subtitle, children, className = "" }) {
  const [ref, inView] = useReveal()
  return (
    <section
      id={id}
      ref={ref}
      className={`max-w-6xl mx-auto px-5 py-16 md:py-20 scroll-mt-14 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      <div className="mb-9">
        <div className="flex items-center gap-2 font-mono text-xs text-signal mb-2">
          {index && <span className="text-text-faint">{index}</span>}
          <span className="uppercase tracking-widest">{label}</span>
          <span
            className="flex-1 h-px bg-border ml-2 origin-left transition-transform duration-[1100ms] ease-out"
            style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">{title}</h2>
        {subtitle && <p className="mt-2 text-text-dim max-w-xl">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
