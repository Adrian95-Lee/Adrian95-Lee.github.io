import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Section, { Reveal } from './Section'
import { profile } from '../data/profile'

export default function Contact() {
  const { email, phone, phoneIntl, linkedin, github, resumeUrl } = profile.contact
  const links = [
    email && { label: 'Email', value: email, href: `mailto:${email}`, icon: Mail },
    phone && { label: 'Mobile', value: phone, href: `tel:${phoneIntl || phone.replace(/[^\d+]/g, '')}`, icon: Phone },
    linkedin && { label: 'LinkedIn', value: linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: linkedin, icon: Linkedin },
    github && { label: 'GitHub', value: github.replace(/^https?:\/\/(www\.)?/, ''), href: github, icon: Github },
    resumeUrl && { label: 'Résumé', value: 'Download CV', href: resumeUrl, icon: FileText },
  ].filter(Boolean)

  return (
    <Section id="contact">
      <Reveal className="card relative overflow-hidden p-8 sm:p-12 md:p-16">
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-violet-500/15 blur-[100px]" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sky-500/10 blur-[100px]" />

        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-sky-300/80 uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
              Contact
            </p>
            <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl">
              Have a process that should be <span className="text-gradient">smarter?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
              I&apos;m interested in roles and conversations in
              {' '}
              {profile.openTo.slice(0, -1).join(', ')} and {profile.openTo.at(-1)} — where understanding the business is as important as building the solution.
            </p>
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={14} /> Based in {profile.location}
            </p>
          </div>

          <div className="space-y-3">
            {links.length ? (
              links.map(({ label, value, href, icon: I }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-950/60 p-4 transition hover:-translate-y-0.5 hover:border-white/25"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-white">
                    <I size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-slate-500">{label}</span>
                    <span className="block truncate text-sm text-white">{value}</span>
                  </span>
                  <ArrowUpRight size={18} className="text-slate-500 transition group-hover:rotate-45 group-hover:text-white" />
                </a>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-slate-500">
                Contact links will appear here.
                {import.meta.env.DEV && (
                  <span className="mt-2 block text-amber-300/80">
                    Dev note: add your email / LinkedIn in <code className="font-mono">src/data/profile.js</code> → <code className="font-mono">contact</code>.
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
