export default function WindowFrame({ title, tab, children, className = "", right = null, style }) {
  return (
    <div style={style} className={`rounded-lg border border-border bg-surface/80 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.2)] overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-soft bg-elevated/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5468]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5468]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4B5468]" />
          </div>
          {tab && (
            <div className="ml-2 flex items-center gap-2 text-[11px] font-mono text-text-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-signal pulse-dot" />
              {tab}
            </div>
          )}
        </div>
        {title && <div className="text-[11px] font-mono text-text-faint">{title}</div>}
        {right}
      </div>
      <div>{children}</div>
    </div>
  )
}
