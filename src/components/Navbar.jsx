import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { id: 'about', label: 'About' },
  { id: 'approach', label: 'Approach' },
  { id: 'work', label: 'Case Studies' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-ink-950/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="group flex items-center gap-3" aria-label={`${profile.name} — home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-sky-400/20 to-violet-400/20 font-display text-sm font-bold text-white transition group-hover:border-sky-400/50">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-medium text-white sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-sky-200 md:block"
        >
          Get in touch
        </a>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/5 bg-ink-950/95 px-4 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-t border-white/5 py-4 text-slate-300 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
