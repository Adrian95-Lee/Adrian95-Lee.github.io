import { Building2, Check, MapPin } from 'lucide-react'
import Section, { Reveal, alpha, trackSpotlight } from './Section'
import Icon from './Icon'
import { profile } from '../data/profile'
import { domains } from '../data/domains'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A finance background. <span className="text-slate-500">A builder&apos;s toolkit.</span>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Left: summary + current role */}
        <div className="space-y-8">
          <Reveal className="space-y-5 text-base leading-relaxed text-slate-400 md:text-lg">
            {profile.summary.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="card p-6">
            <p className="mb-4 font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Current role</p>
            <h3 className="font-display text-xl font-semibold text-white">{profile.role}</h3>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 size={14} /> {profile.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {profile.focusAreas.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Right: five disciplines */}
        <div>
          <Reveal>
            <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">
              Five disciplines · one perspective
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {domains.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06} className={i === domains.length - 1 ? 'sm:col-span-2' : ''}>
                <div
                  onMouseMove={trackSpotlight}
                  style={{ '--spot': alpha(d.color, 0.14) }}
                  className="card spotlight group h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl border transition group-hover:scale-110"
                      style={{ color: d.color, borderColor: alpha(d.color, 0.3), background: alpha(d.color, 0.08) }}
                    >
                      <Icon name={d.icon} size={19} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{d.label}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{d.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.practices.map((p) => (
                      <span key={p} className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-1 text-xs text-slate-400">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
