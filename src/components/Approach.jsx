import { useState } from 'react'
import { motion } from 'framer-motion'
import Section, { Reveal } from './Section'
import Icon from './Icon'
import { approach } from '../data/profile'

const colors = ['#fbbf24', '#f472b6', '#a78bfa', '#38bdf8', '#34d399']

export default function Approach() {
  const [active, setActive] = useState(0)

  return (
    <Section
      id="approach"
      eyebrow="Approach"
      title="Business problem first. Technology second."
      intro="Every case study on this site follows the same path. The tools change from project to project — the discipline of starting from the business problem does not."
      className="bg-gradient-to-b from-transparent via-ink-900/60 to-transparent"
    >
      <div className="relative">
        {/* Connecting line (desktop) */}
        <div aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-white/10 lg:block">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-300 via-violet-400 to-emerald-400"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        <ol className="grid gap-4 lg:grid-cols-5">
          {approach.map((step, i) => {
            const isActive = active === i
            return (
              <Reveal
                as="li"
                key={step.id}
                delay={i * 0.08}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className="group relative flex h-full cursor-default flex-col outline-none lg:items-center lg:text-center"
              >
                  <div className="flex items-center gap-4 lg:flex-col lg:gap-0">
                    <span
                      className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-ink-900 transition duration-300"
                      style={{
                        color: colors[i],
                        borderColor: isActive ? colors[i] : 'rgba(148,163,184,0.15)',
                        boxShadow: isActive ? `0 0 32px ${colors[i]}40` : 'none',
                      }}
                    >
                      <Icon name={step.icon} size={22} />
                    </span>
                    <div className="lg:mt-5">
                      <p className="font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Step {i + 1}</p>
                      <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <div
                    className={`mt-4 flex-1 rounded-2xl border p-4 transition duration-300 ${
                      isActive ? 'border-white/15 bg-white/[0.04]' : 'border-transparent'
                    }`}
                  >
                    <p className="text-sm font-medium italic" style={{ color: colors[i] }}>
                      “{step.question}”
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
                  </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
