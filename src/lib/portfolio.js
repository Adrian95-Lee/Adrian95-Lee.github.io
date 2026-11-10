// Derived lookups and relationships, computed from the data files.
import { skills, skillCategories } from '../data/skills'
import { projects } from '../data/projects'
import { domains } from '../data/domains'

export const skillById = Object.fromEntries(skills.map((s) => [s.id, s]))
export const categoryById = Object.fromEntries(skillCategories.map((c) => [c.id, c]))
export const domainById = Object.fromEntries(domains.map((d) => [d.id, d]))
export const projectById = Object.fromEntries(projects.map((p) => [p.id, p]))

export const projectSkills = (project) => project.stack.map((s) => s.skill)

export const projectsForSkill = (skillId) =>
  projects.filter((p) => projectSkills(p).includes(skillId))

export const skillColor = (skillId) =>
  categoryById[skillById[skillId]?.category]?.color ?? '#94a3b8'

export const projectColor = (project) => domainById[project.domains[0]]?.color ?? '#38bdf8'

/** Pairs of skills used together in the same project, weighted by count. */
export const skillLinks = (() => {
  const counts = new Map()
  for (const p of projects) {
    const ids = [...new Set(projectSkills(p))].sort()
    for (let i = 0; i < ids.length; i++)
      for (let j = i + 1; j < ids.length; j++) {
        const key = `${ids[i]}|${ids[j]}`
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
  }
  return [...counts].map(([key, weight]) => {
    const [a, b] = key.split('|')
    return { a, b, weight }
  })
})()

/** Skills most often combined with `skillId`, strongest first. */
export function connectedSkills(skillId) {
  const out = []
  for (const l of skillLinks) {
    if (l.a === skillId) out.push({ id: l.b, weight: l.weight })
    else if (l.b === skillId) out.push({ id: l.a, weight: l.weight })
  }
  return out.sort((x, y) => y.weight - x.weight || x.id.localeCompare(y.id))
}

/** Skills that appear in at least one project, for filter chips. */
export const usedSkillIds = skills.map((s) => s.id).filter((id) => projectsForSkill(id).length > 0)

// Development-only sanity checks so typos in the data files are caught early.
if (import.meta.env.DEV) {
  for (const p of projects) {
    for (const s of p.stack)
      if (!skillById[s.skill]) console.warn(`[portfolio] ${p.id}: unknown skill "${s.skill}"`)
    for (const d of p.domains)
      if (!domainById[d]) console.warn(`[portfolio] ${p.id}: unknown domain "${d}"`)
    const nodeIds = new Set(p.architecture?.nodes.map((n) => n.id))
    for (const n of p.architecture?.nodes ?? [])
      if (n.skill && !skillById[n.skill]) console.warn(`[portfolio] ${p.id}: node "${n.id}" has unknown skill "${n.skill}"`)
    for (const e of p.architecture?.edges ?? [])
      if (!nodeIds.has(e.from) || !nodeIds.has(e.to)) console.warn(`[portfolio] ${p.id}: edge ${e.from}→${e.to} references a missing node`)
  }
  for (const s of skills)
    if (!categoryById[s.category]) console.warn(`[portfolio] skill "${s.id}": unknown category "${s.category}"`)
}
