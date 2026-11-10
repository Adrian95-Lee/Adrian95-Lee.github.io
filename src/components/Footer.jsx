import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite, Tailwind CSS &amp; Framer Motion.
        </p>
        <p className="max-w-xl md:text-right">
          Personal portfolio. Case studies are generalised descriptions of solution design; they contain no confidential employer information. Views are my own.
        </p>
      </div>
    </footer>
  )
}
