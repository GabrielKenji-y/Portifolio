import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Section } from '../ui/Section'
import { EmptyState } from '../ui/EmptyState'
import styles from './Shelf.module.css'

export function Skills() {
  const { skills } = profile

  return (
    <Section id={sectionIds.skills} title="Habilidades" className={styles.shelf}>
      {skills.length > 0 ? (
        <div className={styles.groups}>
          {skills.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState>
          A lista de tecnologias ainda não foi publicada.
        </EmptyState>
      )}
    </Section>
  )
}
