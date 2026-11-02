import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id={sectionIds.hero} data-stage="inicio" aria-labelledby="hero-titulo" className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
      </div>

      <h1 id="hero-titulo" className={styles.name} translate="no">
        <span className={styles.line}>
          <span className={styles.word}>{profile.firstName}</span>
        </span>
        <span className={styles.line}>
          <span className={styles.word}>{profile.lastName}</span>
        </span>
      </h1>
    </section>
  )
}
