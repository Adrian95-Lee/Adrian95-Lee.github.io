import { useMemo, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import Icon from './Icon'
import { alpha } from './Section'
import { skillById, skillColor } from '../lib/portfolio'

// Geometry. The gap between columns (COL_W - NODE_W) fits edge labels of ~8 characters.
const COL_W = 200
const ROW_H = 100
const NODE_W = 144
const NODE_H = 58
const PAD = 16
const TEXT_X = 42 // label offset inside a node
const TEXT_MAX = NODE_W - TEXT_X - 8 // available label width (px)

function nodeStyle(node) {
  if (node.skill) {
    const c = skillColor(node.skill)
    return { color: c, icon: skillById[node.skill]?.icon, dashed: false }
  }
  if (node.type === 'actor') return { color: '#cbd5e1', icon: 'Users', dashed: true }
  return { color: '#94a3b8', icon: 'Database', dashed: true } // source
}

/**
 * Interactive solution architecture. Nodes are laid out on a column/row grid
 * from the project data; hover or focus a node to trace its connections.
 */
export default function ArchitectureDiagram({ architecture, accent = '#38bdf8' }) {
  const [active, setActive] = useState(null)
  const { nodes, edges } = architecture

  const layout = useMemo(() => {
    const pos = {}
    let maxCol = 0
    let maxRow = 0
    for (const n of nodes) {
      pos[n.id] = { x: PAD + n.col * COL_W, y: PAD + n.row * ROW_H }
      maxCol = Math.max(maxCol, n.col)
      maxRow = Math.max(maxRow, n.row)
    }
    return { pos, width: PAD * 2 + maxCol * COL_W + NODE_W, height: PAD * 2 + maxRow * ROW_H + NODE_H }
  }, [nodes])

  const connected = useMemo(() => {
    if (!active) return null
    const set = new Set([active])
    edges.forEach((e) => {
      if (e.from === active) set.add(e.to)
      if (e.to === active) set.add(e.from)
    })
    return set
  }, [active, edges])

  const activeNode = nodes.find((n) => n.id === active)

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] tracking-wider text-slate-500 uppercase md:hidden">Swipe to explore →</p>
      <div className="scrollbar-thin -mx-1 overflow-x-auto px-1 pb-2">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="h-auto w-full"
          style={{ minWidth: Math.min(layout.width, 760) }}
          role="img"
          aria-label="Solution architecture diagram"
        >
          {/* Edges */}
          {edges.map((e) => {
            const a = layout.pos[e.from]
            const b = layout.pos[e.to]
            if (!a || !b) return null
            const x1 = a.x + NODE_W
            const y1 = a.y + NODE_H / 2
            const x2 = b.x
            const y2 = b.y + NODE_H / 2
            const dx = Math.max(24, (x2 - x1) / 2)
            const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
            const lit = !active || e.from === active || e.to === active
            const mx = (x1 + x2) / 2
            const my = (y1 + y2) / 2
            const labelW = e.label ? e.label.length * 5.9 + 12 : 0
            return (
              <g key={`${e.from}-${e.to}`} style={{ opacity: lit ? 1 : 0.15, transition: 'opacity .25s' }}>
                <path d={d} fill="none" stroke={alpha(accent, 0.25)} strokeWidth="1.5" />
                <path d={d} fill="none" stroke={accent} strokeWidth="1.5" className="flow" />
                <circle cx={x2 - 2} cy={y2} r="2.5" fill={accent} />
                {e.label && (
                  <g>
                    <rect x={mx - labelW / 2} y={my - 9} width={labelW} height={18} rx={9} fill="#0a0e17" stroke="rgba(148,163,184,0.18)" />
                    <text x={mx} y={my + 3.5} textAnchor="middle" fontSize="10" className="font-mono" fill="#94a3b8">
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const p = layout.pos[n.id]
            const s = nodeStyle(n)
            const lit = !connected || connected.has(n.id)
            const isActive = active === n.id
            return (
              <g
                key={n.id}
                tabIndex={0}
                role="button"
                aria-label={`${n.label}${n.sub ? ` (${n.sub})` : ''}: ${n.note ?? ''}`}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n.id)}
                onBlur={() => setActive(null)}
                className="cursor-pointer outline-none"
                style={{ opacity: lit ? 1 : 0.3, transition: 'opacity .25s' }}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  fill={isActive ? alpha(s.color, 0.14) : '#0d1320'}
                  stroke={isActive ? s.color : alpha(s.color, 0.45)}
                  strokeWidth={isActive ? 1.75 : 1}
                  strokeDasharray={s.dashed ? '4 4' : undefined}
                  style={{ transition: 'all .2s' }}
                />
                <rect x={p.x + 9} y={p.y + 16} width={26} height={26} rx={8} fill={alpha(s.color, 0.12)} />
                <Icon name={s.icon} x={p.x + 14} y={p.y + 21} width={16} height={16} color={s.color} strokeWidth={1.75} />
                <text
                  x={p.x + TEXT_X}
                  y={p.y + (n.sub ? 26 : 33)}
                  fontSize="12.5"
                  fontWeight="600"
                  fill="#f1f5f9"
                  {...(n.label.length * 7 > TEXT_MAX ? { textLength: TEXT_MAX, lengthAdjust: 'spacingAndGlyphs' } : {})}
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={p.x + TEXT_X}
                    y={p.y + 42}
                    fontSize="9"
                    className="font-mono"
                    fill={s.color}
                    letterSpacing="0.05em"
                    {...(n.sub.length * 6 > TEXT_MAX ? { textLength: TEXT_MAX, lengthAdjust: 'spacingAndGlyphs' } : {})}
                  >
                    {n.sub.toUpperCase()}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex min-h-12 items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm" aria-live="polite">
        {activeNode ? (
          <>
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: nodeStyle(activeNode).color }} />
            <p className="text-slate-300">
              <span className="font-medium text-white">{activeNode.label}</span>
              {activeNode.note && <span className="text-slate-400"> — {activeNode.note}</span>}
            </p>
          </>
        ) : (
          <p className="flex items-center gap-2 text-slate-500">
            <MousePointerClick size={15} /> Hover or tab through a component to trace how it connects.
          </p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-4 rounded border border-dashed border-slate-400" /> People / data sources
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-4 rounded border" style={{ borderColor: accent }} /> Technology component
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="22" height="6" aria-hidden="true">
            <line x1="0" y1="3" x2="22" y2="3" stroke={accent} strokeWidth="1.5" className="flow" />
          </svg>
          Data flow
        </span>
      </div>
    </div>
  )
}
