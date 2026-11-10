import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Filter } from 'lucide-react'
import Section, { Reveal, alpha } from './Section'
import Icon from './Icon'
import TechConstellation from './TechConstellation'
import { skills, skillCategories } from '../data/skills'
import { categoryById, connectedSkills, projectColor, projectsForSkill, skillById, skillColor } from '../lib/portfolio'

export default function SkillsExplorer({ onOpenProject, onShowProjects }) {
  const [selected, setSelected] = useState('power-bi')
  const [hovered, setHovered] = useState(null)

  const skill = skillById[selected]
  const color = skillColor(selected)
  const related = projectsForSkill(selected)
  const connections = connectedSkills(selected)

  return (
    <Section
      id="skills"
      eyebrow="Skills & Technologies"
      title={
        <>
          A connected toolkit — <span className="text-slate-500">not a list of logos.</span>
        </>
      }
      intro="Select any technology to see what I use it for, which case studies it appears in, and which tools it works alongside. The network shows how technologies connect across real projects."
      className="bg-gradient-to-b from-transparent via-ink-900/60 to-transparent"
    >
      {/* Category groups */}
      <Reveal className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="card p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-300">
              <span className="h-2 w-2 rounded-full" style={{ background: cat.color }} />
              {cat.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills
                .filter((s) => s.category === cat.id)
                .map((s) => {
                  const isSel = s.id === selected
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s.id)}
                      onMouseEnter={() => setHovered(s.id)}
                      onMouseLeave={() => setHovered(null)}
                      aria-pressed={isSel}
                      className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition hover:-translate-y-px"
                      style={
                        isSel
                          ? { color: cat.color, borderColor: alpha(cat.color, 0.6), background: alpha(cat.color, 0.14) }
                          : { color: '#cbd5e1', borderColor: 'rgba(148,163,184,0.12)', background: 'rgba(255,255,255,0.02)' }
                      }
                    >
                      <Icon name={s.icon} size={13} />
                      {s.short ?? s.name}
                    </button>
                  )
                })}
            </div>
          </div>
        ))}
      </Reveal>

      <div className="grid items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
        {/* Network */}
        <Reveal className="card overflow-hidden p-3 sm:p-6">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Technology network</p>
            <p className="hidden text-[11px] text-slate-500 sm:block">Lines = used together in a case study</p>
          </div>
          <TechConstellation selected={selected} hovered={hovered} onSelect={setSelected} onHover={setHovered} />
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={0.1} className="card relative overflow-hidden p-6 lg:sticky lg:top-24">
          <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl transition-colors duration-500" style={{ background: alpha(color, 0.18) }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border" style={{ color, borderColor: alpha(color, 0.4), background: alpha(color, 0.1) }}>
                  <Icon name={skill.icon} size={26} />
                </span>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color }}>
                    {categoryById[skill.category].label}
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-white">{skill.name}</h3>
                </div>
              </div>

              <p className="mt-5 leading-relaxed text-slate-300">{skill.summary}</p>

              <ul className="mt-4 space-y-2">
                {skill.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-slate-400">
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color }} />
                    {u}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Featured in</p>
                {related.length ? (
                  <div className="space-y-2">
                    {related.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onOpenProject(p.id)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left transition hover:border-white/15 hover:bg-white/[0.05]"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ color: projectColor(p), background: alpha(projectColor(p), 0.1) }}>
                          <Icon name={p.icon} size={17} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium text-white">{p.title}</span>
                          <span className="block truncate text-xs text-slate-500">{p.stack.find((s) => s.skill === selected)?.role}</span>
                        </span>
                        <ArrowUpRight size={16} className="shrink-0 text-slate-500 transition group-hover:rotate-45 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-slate-500">
                    Part of my toolkit — a featured case study is not published yet.
                  </p>
                )}
              </div>

              {connections.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-slate-500 uppercase">Works alongside</p>
                  <div className="flex flex-wrap gap-1.5">
                    {connections.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelected(c.id)}
                        className="rounded-md border px-2 py-1 text-xs transition hover:-translate-y-px"
                        style={{ color: skillColor(c.id), borderColor: alpha(skillColor(c.id), 0.3) }}
                      >
                        {skillById[c.id].short ?? skillById[c.id].name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {related.length > 0 && (
                <button
                  onClick={() => onShowProjects(selected)}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-sky-200"
                >
                  <Filter size={14} />
                  Filter case studies by {skill.short ?? skill.name}
                  <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  )
}
