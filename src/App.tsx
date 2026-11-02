import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { ChromeStage } from './components/three/ChromeStage'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Education } from './components/sections/Education'
import { Contact } from './components/sections/Contact'
import { useMotionPause } from './hooks/useMotionPause'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import styles from './App.module.css'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  const [motionPaused, toggleMotion] = useMotionPause(reducedMotion)

  return (
    <>
      <SiteHeader motion={{ paused: motionPaused, onToggle: toggleMotion }} />
      {/* O palco vem antes do conteúdo: o nome do hero se mistura com ele (mix-blend). */}
      <ChromeStage paused={motionPaused} />
      <main id="conteudo" className={styles.main} tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <div className={styles.shelf} data-stage="habilidades">
          <Skills />
          <Education />
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
