import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { domains } from '../data/domains'
import Icon from './Icon'

const SIZE = 440
const C = SIZE / 2
const R = 160

/**
 * Five disciplines converging into one outcome — the core positioning, as a visual.
 * Hover / focus a node to read what that discipline means in practice.
 */
export default function ConvergenceVisual() {
  const [hover, setHover] = useState(null)
  const reduce = useReducedMotion()
  const active = domains.find((d) => d.id === hover)

  const nodes = domains.map((d, i) => {
    const a = ((-90 + i * (360 / domains.length)) * Math.PI) / 180
    return { ...d, x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
  })

  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full overflow-visible" role="img" aria-label="Diagram: finance, business, data, automation and digital transformation converging into business outcomes">
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>

        {/* Orbits */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(148,163,184,0.12)" strokeDasharray="2 6" className="spin-slow" />
        <circle cx={C} cy={C} r={R + 38} fill="none" stroke="rgba(148,163,184,0.06)" />
        <circle cx={C} cy={C} r={110} fill="url(#core-glow)" />

        {/* Mesh between neighbouring disciplines */}
        <polygon
          points={nodes.map((n) => `${n.x},${n.y}`).join(' ')}
          fill="rgba(56,189,248,0.025)"
          stroke="rgba(148,163,184,0.10)"
        />

        {/* Spokes with flowing data */}
        {nodes.map((n) => {
          const dim = hover && hover !== n.id
          const path = `M ${n.x} ${n.y} L ${C} ${C}`
          return (
            <g key={`spoke-${n.id}`} style={{ opacity: dim ? 0.2 : 1, transition: 'opacity .3s' }}>
              <path d={path} stroke={n.color} strokeOpacity="0.18" strokeWidth="1.5" />
              <path d={path} stroke={n.color} strokeWidth="1.5" className="flow" fill="none" />
              {!reduce && (
                <circle r="3" fill={n.color}>
                  <animateMotion dur={`${2.4 + (n.x % 7) / 10}s`} repeatCount="indefinite" path={path} />
                </circle>
              )}
            </g>
          )
        })}

        {/* Core */}
        <circle cx={C} cy={C} r={58} fill="#0a0e17" stroke="url(#core-stroke)" strokeWidth="1.5" />
        <text x={C} y={C - 6} textAnchor="middle" className="fill-white font-display" fontSize="15" fontWeight="600">
          Business
        </text>
        <text x={C} y={C + 13} textAnchor="middle" className="fill-white font-display" fontSize="15" fontWeight="600">
          outcomes
        </text>

        {/* Discipline nodes */}
        {nodes.map((n, i) => {
          const isActive = hover === n.id
          const labelBelow = n.y >= C - 10
          return (
            <motion.g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={`${n.label}: ${n.description}`}
              onMouseEnter={() => setHover(n.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              className="cursor-pointer outline-none"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx={n.x} cy={n.y} r={isActive ? 34 : 30} fill="#0a0e17" stroke={n.color} strokeWidth={isActive ? 2 : 1.25} style={{ transition: 'all .25s' }} />
              <circle cx={n.x} cy={n.y} r={isActive ? 34 : 30} fill={n.color} fillOpacity={isActive ? 0.16 : 0.08} style={{ transition: 'all .25s' }} />
              <Icon name={n.icon} x={n.x - 11} y={n.y - 11} width={22} height={22} color={n.color} strokeWidth={1.75} />
              <text
                x={n.x}
                y={labelBelow ? n.y + 50 : n.y - 42}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                className="font-mono tracking-wider uppercase"
                fill={isActive ? n.color : '#cbd5e1'}
              >
                {n.label === 'Digital Transformation' ? 'Digital Transf.' : n.label}
              </text>
            </motion.g>
          )
        })}
      </svg>

      <div className="mt-2 h-14 text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={active?.id ?? 'hint'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mx-auto max-w-sm text-sm text-slate-400"
          >
            {active ? (
              <>
                <span className="font-medium" style={{ color: active.color }}>
                  {active.label}
                </span>{' '}
                — {active.description}
              </>
            ) : (
              <span className="font-mono text-xs tracking-wider text-slate-500 uppercase">Hover a discipline</span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
