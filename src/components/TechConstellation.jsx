import { useMemo } from 'react'
import { skills, skillCategories } from '../data/skills'
import { connectedSkills, projectsForSkill, skillColor, skillLinks } from '../lib/portfolio'

const W = 700
const H = 520
const CX = W / 2
const CY = H / 2
const R = 172

/**
 * Chord-style network of every skill. Lines connect technologies used together
 * in the same case study — thicker lines mean they appear together more often.
 */
export default function TechConstellation({ selected, hovered, onSelect, onHover }) {
  const focus = hovered ?? selected

  const positioned = useMemo(() => {
    const order = skillCategories.flatMap((c) => skills.filter((s) => s.category === c.id))
    return Object.fromEntries(
      order.map((s, i) => {
        const a = (i / order.length) * Math.PI * 2 - Math.PI / 2
        return [s.id, { ...s, a, x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }]
      }),
    )
  }, [])

  const neighbours = useMemo(() => new Set(connectedSkills(focus).map((n) => n.id)), [focus])
  const focusSkill = positioned[focus]
  const projectCount = projectsForSkill(focus).length

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Network of technologies connected by shared projects">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(148,163,184,0.08)" />
      <circle cx={CX} cy={CY} r={R - 60} fill="none" stroke="rgba(148,163,184,0.05)" strokeDasharray="2 6" className="spin-slow" />

      {/* Links */}
      {skillLinks.map((l) => {
        const a = positioned[l.a]
        const b = positioned[l.b]
        if (!a || !b) return null
        const lit = l.a === focus || l.b === focus
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const qx = CX + (mx - CX) * 0.2
        const qy = CY + (my - CY) * 0.2
        return (
          <path
            key={`${l.a}-${l.b}`}
            d={`M ${a.x} ${a.y} Q ${qx} ${qy} ${b.x} ${b.y}`}
            fill="none"
            stroke={lit ? skillColor(focus) : 'rgba(148,163,184,0.10)'}
            strokeOpacity={lit ? 0.85 : 1}
            strokeWidth={lit ? 1 + l.weight * 0.9 : 0.75}
            className={lit ? 'flow' : undefined}
            style={{ transition: 'stroke .3s, stroke-width .3s' }}
          />
        )
      })}

      {/* Centre readout */}
      {focusSkill && (
        <g>
          <rect x={CX - 150} y={CY - 36} width={300} height={66} rx={33} fill="#0a0e17" fillOpacity="0.85" />
          <text x={CX} y={CY - 8} textAnchor="middle" fontSize="20" fontWeight="600" className="font-display" fill="#fff">
            {focusSkill.short ?? focusSkill.name}
          </text>
          <text x={CX} y={CY + 16} textAnchor="middle" fontSize="11" className="font-mono" fill={skillColor(focus)} letterSpacing="0.08em">
            {projectCount > 0
              ? `${projectCount} CASE ${projectCount === 1 ? 'STUDY' : 'STUDIES'} · ${neighbours.size} CONNECTIONS`
              : 'NO FEATURED CASE STUDY YET'}
          </text>
        </g>
      )}

      {/* Nodes */}
      {Object.values(positioned).map((s) => {
        const isFocus = s.id === focus
        const isSelected = s.id === selected
        const lit = isFocus || neighbours.has(s.id)
        const c = skillColor(s.id)
        const cos = Math.cos(s.a)
        const lx = CX + (R + 16) * cos
        const ly = CY + (R + 16) * Math.sin(s.a)
        const anchor = Math.abs(cos) < 0.2 ? 'middle' : cos > 0 ? 'start' : 'end'
        return (
          <g
            key={s.id}
            tabIndex={0}
            role="button"
            aria-pressed={isSelected}
            aria-label={s.name}
            onClick={() => onSelect(s.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect(s.id))}
            onMouseEnter={() => onHover(s.id)}
            onMouseLeave={() => onHover(null)}
            className="cursor-pointer outline-none"
            style={{ opacity: lit ? 1 : 0.4, transition: 'opacity .3s' }}
          >
            <circle cx={s.x} cy={s.y} r={22} fill="transparent" />
            {isFocus && <circle cx={s.x} cy={s.y} r={16} fill={c} fillOpacity="0.15" />}
            <circle cx={s.x} cy={s.y} r={isFocus ? 8 : 5.5} fill={lit ? c : '#475569'} stroke="#05070d" strokeWidth="2" style={{ transition: 'r .2s' }} />
            <text
              x={lx}
              y={ly + (Math.abs(cos) < 0.2 ? (Math.sin(s.a) > 0 ? 10 : -4) : 4)}
              textAnchor={anchor}
              fontSize="12"
              fontWeight={isFocus ? 600 : 400}
              fill={isFocus ? '#fff' : lit ? '#cbd5e1' : '#64748b'}
            >
              {s.short ?? s.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
