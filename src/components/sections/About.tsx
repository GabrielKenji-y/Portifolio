import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Section } from '../ui/Section'
import { EmptyState } from '../ui/EmptyState'
import { ExternalLink } from '../ui/ExternalLink'
import styles from './About.module.css'

export function About() {
  const { about, profiles } = profile
  const hasBio = about.length > 0

  return (
    <Section id={sectionIds.about} title="Sobre" stage="sobre" className={styles.about}>
      <div className={styles.body}>
        {hasBio ? (
          <div className={styles.bio}>
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <EmptyState action={<ExternalLink href={profiles.linkedin.href}>Ver perfil no LinkedIn</ExternalLink>}>
            A apresentação completa ainda está sendo escrita. Até ela chegar, a trajetória profissional está no
            LinkedIn.
          </EmptyState>
        )}

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>Nome</dt>
            <dd translate="no">
              {profile.firstName} {profile.lastName}
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Atuação</dt>
            <dd>{profile.role}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Código</dt>
            <dd translate="no">
              <ExternalLink href={profiles.github.href}>github.com/{profiles.github.handle}</ExternalLink>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  )
}
