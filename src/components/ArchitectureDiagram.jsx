import useReveal from "../hooks/useReveal"

// Generic box-and-arrow system diagram renderer, styled like an infra tool (not decorative icons).
// Connector lines draw themselves in and nodes fade up in sequence the first time this scrolls into view.
export default function ArchitectureDiagram({ nodes, edges, caption }) {
  const boxW = 148
  const boxH = 54
  const gapX = 60
  const totalW = nodes.length * boxW + (nodes.length - 1) * gapX
  const cx = (i) => i * (boxW + gapX) + boxW / 2
  const cy = boxH / 2 + 8

  const idIndex = Object.fromEntries(nodes.map((n, i) => [n.id, i]))
  const [ref, inView] = useReveal(0.2)

  return (
    <div ref={ref} className="w-full">
      <div className="overflow-x-auto pb-2">
        <svg
          viewBox={`0 0 ${totalW} ${boxH + 16}`}
          width={totalW}
          height={boxH + 16}
          className="min-w-full"
          style={{ minWidth: totalW }}
        >
          {edges.map(([from, to], i) => {
            const x1 = cx(idIndex[from]) + boxW / 2
            const x2 = cx(idIndex[to]) - boxW / 2
            if (idIndex[to] < idIndex[from] || x2 < x1) return null
            const delay = 0.2 + idIndex[from] * 0.14
            return (
              <g key={i} style={{ opacity: inView ? 1 : 0, transition: `opacity 0.45s ease-out ${delay}s` }}>
                <line
                  x1={x1} y1={cy} x2={x2} y2={cy}
                  stroke="#2C6B63" strokeWidth="1.5" strokeDasharray="4 3"
                  style={{
                    transform: inView ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: `${x1}px ${cy}px`,
                    transition: `transform 0.5s ease-out ${delay}s`,
                  }}
                />
                <polygon points={`${x2},${cy} ${x2 - 7},${cy - 4} ${x2 - 7},${cy + 4}`} fill="#5EEAD4" />
              </g>
            )
          })}
          {nodes.map((n, i) => (
            <g
              key={n.id}
              transform={`translate(${cx(i) - boxW / 2}, ${inView ? 8 : 16})`}
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.5s ease-out ${i * 0.12}s, transform 0.5s ease-out ${i * 0.12}s`,
              }}
            >
              <rect
                width={boxW} height={boxH} rx="6"
                fill="#151B29" stroke="#232B3B" strokeWidth="1"
              />
              <rect width={boxW} height="3" rx="1.5" fill="#5EEAD4" opacity="0.7" />
              <text x={boxW / 2} y={boxH / 2 - 3} textAnchor="middle" fill="#E4E9F2" fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                {n.label}
              </text>
              <text x={boxW / 2} y={boxH / 2 + 15} textAnchor="middle" fill="#8B95A9" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
                {n.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {caption && <p className="mt-3 text-xs font-mono text-text-faint">{`// ${caption}`}</p>}
    </div>
  )
}
