import type { ReactNode } from 'react'
import type { StageKey } from '../three/stages'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  title: string
  /** Estágio do objeto 3D que esta seção aciona. */
  stage?: StageKey
  lead?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, title, stage, lead, children, className }: SectionProps) {
  const titleId = `${id}-titulo`
  return (
    <section
      id={id}
      data-stage={stage}
      aria-labelledby={titleId}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <header className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {lead ? <div className={styles.lead}>{lead}</div> : null}
      </header>
      {children}
    </section>
  )
}
