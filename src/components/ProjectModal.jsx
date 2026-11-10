import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, ShieldCheck, X } from 'lucide-react'
import Icon from './Icon'
import ArchitectureDiagram from './ArchitectureDiagram'
import { alpha } from './Section'
import { projects } from '../data/projects'
import { domainById, projectById, projectColor, skillById, skillColor } from '../lib/portfolio'

const tabs = [
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'tech', label: 'Technologies' },
  { id: 'how', label: 'How it works' },
  { id: 'value', label: 'Value' },
]

function Heading({ id, step, title, color }) {
  return (
    <div id={id} className="mb-5 flex scroll-mt-4 items-center gap-3">
      <span className="font-mono text-xs" style={{ color }}>
        0{step}
      </span>
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h3>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}

export default function ProjectModal({ projectId, onClose, onNavigate, onShowSkill }) {
  const project = projectById[projectId]
  const panelRef = useRef(null)
  const bodyRef = useRef(null)
  const closeRef = useRef(null)
  const idx = projects.findIndex((p) => p.id === projectId)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const color = project ? projectColor(project) : '#38bdf8'

  // Lock page scroll, keyboard shortcuts, focus management
  useEffect(() => {
    const previouslyFocused = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [projectId])

  if (!project) return null

  const jump = (id) => {
    const el = bodyRef.current?.querySelector(`#${id}`)
    if (el) bodyRef.current.scrollTo({ top: el.offsetTop - 16, behavior: 'smooth' })
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-stretch justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black"
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-white/5 px-5 pt-5 sm:px-8 sm:pt-7">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-0 h-48 w-2/3 rounded-full blur-3xl" style={{ background: alpha(color, 0.15) }} />
          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-3 flex flex-wrap gap-2">
                {project.domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-md border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: domainById[d].color, borderColor: alpha(domainById[d].color, 0.35) }}
                  >
                    {domainById[d].label}
                  </span>
                ))}
              </div>
              <h2 id="modal-title" className="font-display text-2xl leading-tight font-semibold text-white sm:text-3xl">
                {project.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm text-slate-400 sm:text-base">{project.subtitle}</p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close case study"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:rotate-90 hover:border-white/30 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="scrollbar-thin relative -mx-1 mt-5 flex gap-1 overflow-x-auto px-1" aria-label="Case study sections">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => jump(t.id)}
                className="shrink-0 rounded-t-lg border-b-2 border-transparent px-3 py-2.5 text-sm text-slate-400 transition hover:border-white/30 hover:text-white"
              >
                <span className="mr-1.5 font-mono text-[10px]" style={{ color }}>
                  0{i + 1}
                </span>
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="scrollbar-thin relative flex-1 space-y-14 overflow-y-auto px-5 py-8 sm:px-8">
          <p className="max-w-4xl text-base leading-relaxed text-slate-300 sm:text-lg">{project.summary}</p>

          {/* 1 + 2: Problem & Solution */}
          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <Heading id="problem" step={1} title="Business Problem" color={color} />
              <div className="h-[calc(100%-3.5rem)] rounded-2xl border border-rose-400/15 bg-rose-400/[0.03] p-5">
                <p className="flex gap-2.5 font-medium text-white">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-rose-300" />
                  {project.problem.headline}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {project.problem.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-300/70" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section>
              <Heading id="solution" step={2} title="Solution" color={color} />
              <div className="h-[calc(100%-3.5rem)] rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.03] p-5">
                <p className="flex gap-2.5 font-medium text-white">
                  <Lightbulb size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                  {project.solution.headline}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {project.solution.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-300/70" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* 3: Technologies */}
          <section>
            <Heading id="tech" step={3} title="Technologies" color={color} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.stack.map(({ skill, role }) => {
                const s = skillById[skill]
                const c = skillColor(skill)
                return (
                  <button
                    key={skill}
                    onClick={() => onShowSkill(skill)}
                    title={`See all case studies using ${s.name}`}
                    className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border" style={{ color: c, borderColor: alpha(c, 0.35), background: alpha(c, 0.08) }}>
                      <Icon name={s.icon} size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                        {s.name}
                        <ArrowRight size={13} className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">{role}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          {/* 4: How it works */}
          <section>
            <Heading id="how" step={4} title="How It Works" color={color} />
            <div className="rounded-2xl border border-white/5 bg-ink-950/60 p-4 sm:p-6">
              <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Solution architecture</p>
              <ArchitectureDiagram architecture={project.architecture} accent={color} />
            </div>
            <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {project.howItWorks.map((s, i) => (
                <li key={s.title} className="relative rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <span className="grid h-7 w-7 place-items-center rounded-full font-mono text-xs font-semibold text-ink-950" style={{ background: color }}>
                    {i + 1}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-white">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 5: Value */}
          <section>
            <Heading id="value" step={5} title="Business Value" color={color} />
            <div className="grid gap-4 sm:grid-cols-2">
              {project.value.map((v) => (
                <div key={v.title} className="flex gap-3 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent p-5">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color }} />
                  <div>
                    <p className="font-medium text-white">{v.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{v.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" />
              Generalised description for a public portfolio. No confidential company data, internal system details, figures or screenshots are shown.
            </p>
          </section>
        </div>

        {/* Footer navigation */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/5 px-5 py-3 sm:px-8">
          <button onClick={() => onNavigate(prev.id)} className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:text-white">
            <ChevronLeft size={16} className="shrink-0" />
            <span className="truncate">{prev.title}</span>
          </button>
          <button onClick={() => onNavigate(next.id)} className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:text-white">
            <span className="truncate">{next.title}</span>
            <ChevronRight size={16} className="shrink-0" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
