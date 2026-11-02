import { useEffect, useId, useRef, useState } from 'react'
import { navItems, sectionIds } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Icon } from '../ui/Icon'
import styles from './SiteHeader.module.css'

const observedIds = navItems.map((item) => item.id)

interface MotionControl {
  paused: boolean
  onToggle: () => void
}

interface SiteHeaderProps {
  motion: MotionControl
}

export function SiteHeader({ motion }: SiteHeaderProps) {
  const active = useActiveSection(observedIds)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Menu aberto: Esc fecha e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={styles.header} data-open={open}>
      <a className={styles.skip} href="#conteudo">
        Pular para o conteúdo
      </a>

      <a className={styles.brand} href={`#${sectionIds.hero}`} translate="no" onClick={() => setOpen(false)}>
        {profile.firstName} {profile.lastName}
      </a>

      <button type="button" className={styles.motion} onClick={motion.onToggle}>
        <Icon name={motion.paused ? 'play' : 'pause'} className={styles.motionIcon} />
        <span className={styles.motionLabel}>{motion.paused ? 'Ativar animação' : 'Pausar animação'}</span>
      </button>

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'Fechar' : 'Menu'}</span>
        <Icon name={open ? 'close' : 'menu'} className={styles.toggleIcon} />
      </button>

      <nav id={menuId} className={styles.nav} aria-label="Seções">
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
