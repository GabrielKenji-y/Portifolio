import type { ReactNode } from 'react'
import { Icon } from './Icon'
import styles from './ExternalLink.module.css'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
}

/** Link para outro site: abre em nova aba e avisa isso a leitores de tela. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[styles.link, className].filter(Boolean).join(' ')}
    >
      <span>{children}</span>
      <Icon name="external" className={styles.icon} />
      <span className="visually-hidden"> (abre em nova aba)</span>
    </a>
  )
}
