import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Icon } from '../ui/Icon'
import styles from './SiteFooter.module.css'

// Ano calculado uma vez no carregamento: a renderização continua pura.
const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <p className={styles.mark} translate="no">
        © {year} {profile.firstName} {profile.lastName}
      </p>
      <p className={styles.colophon}>Escrito em React e TypeScript. O bloco cromado é renderizado em Three.js.</p>
      <a className={styles.top} href={`#${sectionIds.hero}`}>
        Voltar ao início
        <Icon name="up" className={styles.icon} />
      </a>
    </footer>
  )
}
