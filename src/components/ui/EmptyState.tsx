import type { ReactNode } from 'react'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
  children: ReactNode
  /** Um caminho real enquanto o conteúdo não chega. */
  action?: ReactNode
}

/** Conteúdo ainda não fornecido: diz isso com clareza e aponta um caminho. */
export function EmptyState({ children, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.text}>{children}</p>
      {action ? <p className={styles.action}>{action}</p> : null}
    </div>
  )
}
