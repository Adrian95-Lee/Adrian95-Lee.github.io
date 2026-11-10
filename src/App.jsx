import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Approach from './components/Approach'
import Projects from './components/Projects'
import SkillsExplorer from './components/SkillsExplorer'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'

export default function App() {
  const [openProjectId, setOpenProjectId] = useState(null)
  const [techFilter, setTechFilter] = useState(null)

  // Called from the skills explorer: filter case studies by a technology and jump there.
  const showProjectsForSkill = useCallback((skillId) => {
    setTechFilter(skillId)
    setOpenProjectId(null)
    requestAnimationFrame(() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }))
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Approach />
        <Projects techFilter={techFilter} onTechFilterChange={setTechFilter} onOpenProject={setOpenProjectId} />
        <SkillsExplorer onOpenProject={setOpenProjectId} onShowProjects={showProjectsForSkill} />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {openProjectId && (
          <ProjectModal
            key="modal"
            projectId={openProjectId}
            onClose={() => setOpenProjectId(null)}
            onNavigate={setOpenProjectId}
            onShowSkill={showProjectsForSkill}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
