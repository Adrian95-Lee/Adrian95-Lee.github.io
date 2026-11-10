import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, className = '', y = 24, as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

export default function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`relative px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-3xl md:mb-16">
            {eyebrow && (
              <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-sky-300/80 uppercase">
                <span className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">{intro}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

/** Pointer-tracking handler for `.spotlight` cards. */
export function trackSpotlight(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Hex colour → rgba string. */
export function alpha(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}
