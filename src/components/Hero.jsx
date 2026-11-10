import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Plus } from 'lucide-react'
import { profile } from '../data/profile'
import { domains } from '../data/domains'
import ConvergenceVisual from './ConvergenceVisual'

function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2600)
    return () => clearInterval(t)
  }, [words.length])
  return (
    <span className="relative inline-flex">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-6 md:pt-36 md:pb-28">
      {/* Background */}
      <div aria-hidden="true" className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div aria-hidden="true" className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
      <div aria-hidden="true" className="absolute top-40 -right-40 -z-10 h-[400px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div {...fade(0)} className="mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.role} · {profile.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {profile.location}
            </span>
          </motion.div>

          <motion.h1 {...fade(0.08)} className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-5 font-display text-2xl leading-snug text-slate-300 sm:text-3xl">
            Where finance meets
            <br className="sm:hidden" /> <RotatingWord words={profile.rotatingWords} />
          </motion.p>

          <motion.p {...fade(0.24)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            {profile.tagline}
          </motion.p>

          {/* The positioning formula */}
          <motion.div {...fade(0.32)} className="mt-8 flex flex-wrap items-center gap-2" aria-label="Finance plus business plus data plus automation plus digital transformation">
            {domains.map((d, i) => (
              <span key={d.id} className="flex items-center gap-2">
                <span
                  className="rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wider uppercase"
                  style={{ color: d.color, borderColor: `${d.color}40`, background: `${d.color}12` }}
                >
                  {d.label}
                </span>
                {i < domains.length - 1 && <Plus size={12} className="text-slate-600" aria-hidden="true" />}
              </span>
            ))}
          </motion.div>

          <motion.div {...fade(0.4)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-sky-200"
            >
              Explore case studies
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#skills"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Interactive skills map
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ConvergenceVisual />
        </motion.div>
      </div>
    </section>
  )
}
