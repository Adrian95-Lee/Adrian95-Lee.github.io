import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Icon from './Icon'
import { alpha, trackSpotlight } from './Section'
import { categoryById, domainById, projectColor, skillById, skillColor } from '../lib/portfolio'

/** Small left→right strip of the technical stack, showing how the tools chain together. */
function StackStrip({ project, color }) {
  const tech = project.stack.map((s) => s.skill).filter((id) => skillById[id]?.category !== 'business')
  return (
    <div className="relative flex items-center justify-between py-2">
      <div aria-hidden="true" className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2" style={{ background: alpha(color, 0.25) }} />
      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        animate={{ left: ['4%', '96%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
      />
      {tech.map((id) => (
        <span
          key={id}
          title={skillById[id].name}
          className="relative grid h-8 w-8 place-items-center rounded-lg border bg-ink-900 transition group-hover:-translate-y-0.5"
          style={{ color: skillColor(id), borderColor: alpha(skillColor(id), 0.35) }}
        >
          <Icon name={skillById[id].icon} size={15} />
        </span>
      ))}
    </div>
  )
}

const ProjectCard = forwardRef(function ProjectCard({ project, index, highlight, onOpen }, ref) {
  const color = projectColor(project)

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <button
        onClick={onOpen}
        onMouseMove={trackSpotlight}
        style={{ '--spot': alpha(color, 0.16) }}
        className="card spotlight group flex h-full w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:outline-none"
        aria-label={`Open case study: ${project.title}`}
      >
        {/* Accent bar in the project's discipline colours */}
        <div className="flex h-1 w-full">
          {project.domains.map((d) => (
            <span key={d} className="flex-1" style={{ background: domainById[d]?.color }} />
          ))}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl border"
              style={{ color, borderColor: alpha(color, 0.3), background: alpha(color, 0.08) }}
            >
              <Icon name={project.icon} size={20} />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-400 transition group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white">
              <ArrowUpRight size={16} />
            </span>
          </div>

          <h3 className="mt-5 font-display text-xl leading-snug font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.subtitle}</p>

          <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <p className="font-mono text-[10px] tracking-[0.18em] text-slate-500 uppercase">Business problem</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{project.problem.headline}</p>
          </div>

          <div className="mt-5">
            <StackStrip project={project} color={color} />
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map(({ skill }) => {
              const s = skillById[skill]
              const isHit = highlight === skill
              const c = categoryById[s?.category]?.color ?? '#94a3b8'
              return (
                <span
                  key={skill}
                  className="rounded-md border px-2 py-0.5 text-[11px] transition"
                  style={
                    isHit
                      ? { color: c, borderColor: alpha(c, 0.6), background: alpha(c, 0.15) }
                      : { color: '#94a3b8', borderColor: 'rgba(148,163,184,0.12)' }
                  }
                >
                  {s?.name}
                </span>
              )
            })}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.domains.map((d) => (
              <span key={d} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: domainById[d]?.color }} />
                {domainById[d]?.label}
              </span>
            ))}
          </div>
        </div>
      </button>
    </motion.article>
  )
})

export default ProjectCard
