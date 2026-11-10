import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Search, X } from 'lucide-react'
import Section, { Reveal, alpha } from './Section'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'
import { domains } from '../data/domains'
import { domainById, projectSkills, skillById, skillColor, usedSkillIds } from '../lib/portfolio'

function searchText(p) {
  return [
    p.title,
    p.subtitle,
    p.summary,
    p.problem.headline,
    p.solution.headline,
    ...p.stack.map((s) => `${skillById[s.skill]?.name ?? ''} ${s.role}`),
    ...p.domains.map((d) => domainById[d]?.label ?? ''),
  ]
    .join(' ')
    .toLowerCase()
}

function Chip({ active, color = '#94a3b8', onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full border px-3 py-1.5 text-xs font-medium transition hover:-translate-y-px"
      style={
        active
          ? { color, borderColor: alpha(color, 0.6), background: alpha(color, 0.14) }
          : { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.15)', background: 'rgba(255,255,255,0.02)' }
      }
    >
      {children}
    </button>
  )
}

export default function Projects({ techFilter, onTechFilterChange, onOpenProject }) {
  const [query, setQuery] = useState('')
  const [domain, setDomain] = useState(null)

  const index = useMemo(() => new Map(projects.map((p) => [p.id, searchText(p)])), [])

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    return projects.filter((p) => {
      if (domain && !p.domains.includes(domain)) return false
      if (techFilter && !projectSkills(p).includes(techFilter)) return false
      const hay = index.get(p.id)
      return terms.every((t) => hay.includes(t))
    })
  }, [query, domain, techFilter, index])

  const hasFilters = query || domain || techFilter
  const reset = () => {
    setQuery('')
    setDomain(null)
    onTechFilterChange(null)
  }

  return (
    <Section
      id="work"
      eyebrow="Case Studies"
      title={
        <>
          Business problems, <span className="text-gradient">engineered solutions.</span>
        </>
      }
      intro="Each case study walks through the business problem, the solution design, the technologies, how the pieces connect, and the value to the business. Search, filter, or open a card to explore the architecture."
    >
      {/* Controls */}
      <Reveal className="card mb-8 space-y-4 p-4 sm:p-5">
        <div className="relative">
          <Search size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, technologies or problems — try “automation” or “DAX”"
            aria-label="Search case studies"
            className="w-full rounded-xl border border-white/10 bg-ink-950/60 py-3 pr-10 pl-11 text-sm text-white placeholder-slate-500 transition outline-none focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <span className="w-24 shrink-0 pt-1.5 font-mono text-[11px] tracking-[0.15em] text-slate-500 uppercase">Discipline</span>
          <div className="flex flex-wrap gap-2">
            <Chip active={!domain} color="#e2e8f0" onClick={() => setDomain(null)}>
              All
            </Chip>
            {domains.map((d) => (
              <Chip key={d.id} active={domain === d.id} color={d.color} onClick={() => setDomain(domain === d.id ? null : d.id)}>
                {d.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          <span className="w-24 shrink-0 pt-1.5 font-mono text-[11px] tracking-[0.15em] text-slate-500 uppercase">Technology</span>
          <div className="flex flex-wrap gap-2">
            {usedSkillIds.map((id) => (
              <Chip key={id} active={techFilter === id} color={skillColor(id)} onClick={() => onTechFilterChange(techFilter === id ? null : id)}>
                {skillById[id].short ?? skillById[id].name}
              </Chip>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mb-5 flex min-h-8 items-center justify-between gap-4 text-sm">
        <p className="text-slate-500" aria-live="polite">
          Showing <span className="text-white">{filtered.length}</span> of {projects.length} case studies
          {techFilter && (
            <>
              {' '}
              using <span style={{ color: skillColor(techFilter) }}>{skillById[techFilter]?.name}</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button onClick={reset} className="flex items-center gap-1.5 text-slate-400 transition hover:text-white">
            <RotateCcw size={14} /> Reset
          </button>
        )}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} highlight={techFilter} query={query} onOpen={() => onOpenProject(p.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col items-center gap-3 p-12 text-center"
          >
            <p className="text-slate-400">No case studies match these filters.</p>
            <button onClick={reset} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white hover:bg-white/5">
              Clear filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
