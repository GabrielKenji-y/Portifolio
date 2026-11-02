import type { Project } from '../../types/content'
import { ExternalLink } from '../ui/ExternalLink'
import styles from './ProjectEntry.module.css'

interface ProjectEntryProps {
  project: Project
}

/**
 * Um projeto real na lista. Cada campo opcional só aparece quando existe:
 * nenhum link ou imagem de mentira.
 */
export function ProjectEntry({ project }: ProjectEntryProps) {
  const { name, summary, technologies, image, liveUrl, repositoryUrl, caseStudyUrl, year } = project
  const links = [
    liveUrl && { href: liveUrl, label: 'Abrir projeto' },
    caseStudyUrl && { href: caseStudyUrl, label: 'Ler estudo de caso' },
    repositoryUrl && { href: repositoryUrl, label: 'Ver código' },
  ].filter((link): link is { href: string; label: string } => Boolean(link))

  return (
    <article className={styles.entry} data-has-image={Boolean(image)}>
      <div className={styles.text}>
        <h3 className={styles.name}>{name}</h3>
        {year ? <p className={styles.year}>{year}</p> : null}
        {summary ? <p className={styles.summary}>{summary}</p> : null}

        {technologies && technologies.length > 0 ? (
          <ul className={styles.tech} aria-label="Tecnologias">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}

        {links.length > 0 ? (
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {image ? (
        <img
          className={styles.image}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      ) : null}
    </article>
  )
}
