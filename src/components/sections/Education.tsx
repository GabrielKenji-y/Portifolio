import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Section } from '../ui/Section'
import { EmptyState } from '../ui/EmptyState'
import styles from './Shelf.module.css'

export function Education() {
  const { education } = profile

  return (
    <Section id={sectionIds.education} title="Formação" className={styles.shelf}>
      {education.length > 0 ? (
        <ol className={styles.timeline}>
          {education.map((entry) => (
            <li key={entry.id} className={styles.group}>
              <h3 className={styles.groupTitle}>{entry.program}</h3>
              <p>{entry.institution}</p>
              {entry.period || entry.status ? (
                <p className={styles.meta}>{[entry.period, entry.status].filter(Boolean).join(', ')}</p>
              ) : null}
              {entry.description ? <p className={styles.description}>{entry.description}</p> : null}
            </li>
          ))}
        </ol>
      ) : (
        <EmptyState>A formação acadêmica ainda não foi adicionada.</EmptyState>
      )}
    </Section>
  )
}
