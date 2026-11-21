import type { Project, ProjectImage } from '../../types/content'
import { ExternalLink } from '../ui/ExternalLink'
import { Icon } from '../ui/Icon'
import styles from './ProjectEntry.module.css'

interface ProjectEntryProps {
  project: Project
}

function Picture({ image, className }: { image: ProjectImage; className?: string }) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  )
}

/**
 * Um projeto real na lista. Cada campo opcional só aparece quando existe:
 * nenhum link ou imagem de mentira.
 */
export function ProjectEntry({ project }: ProjectEntryProps) {
  const {
    id, name, client, status, role, summary, highlights, technologies, image,
    details, gallery, liveUrl, repositoryUrl, repositoryNote, caseStudyUrl, year,
  } = project

  const links = [
    liveUrl && { href: liveUrl, label: 'Abrir projeto' },
    caseStudyUrl && { href: caseStudyUrl, label: 'Ler estudo de caso' },
    repositoryUrl && { href: repositoryUrl, label: 'Ver código' },
  ].filter((link): link is { href: string; label: string } => Boolean(link))

  const meta = [year, role].filter(Boolean).join(' · ')
  const hasDetails = Boolean(details?.length || gallery?.length)
  // Prints de celular (retrato) e de computador (paisagem) ganham grades diferentes
  const portrait = gallery?.filter((g) => g.height > g.width) ?? []
  const landscape = gallery?.filter((g) => g.height <= g.width) ?? []

  return (
    <article className={styles.entry} aria-labelledby={`${id}-nome`}>
      {image ? (
        <figure className={styles.cover}>
          <Picture image={image} className={styles.coverImage} />
        </figure>
      ) : null}

      <div className={styles.text}>
        {meta || status ? (
          <p className={styles.meta}>
            {meta ? <span>{meta}</span> : null}
            {status ? <span className={styles.status}>{status}</span> : null}
          </p>
        ) : null}
        <h3 id={`${id}-nome`} className={styles.name}>
          {name}
        </h3>
        {client ? <p className={styles.client}>{client}</p> : null}
        {summary ? <p className={styles.summary}>{summary}</p> : null}

        {highlights && highlights.length > 0 ? (
          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        {technologies && technologies.length > 0 ? (
          <ul className={styles.tech} aria-label="Tecnologias">
            {technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}

        {links.length > 0 || repositoryNote ? (
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
            {repositoryNote && !repositoryUrl ? <li className={styles.note}>{repositoryNote}</li> : null}
          </ul>
        ) : null}
      </div>

      {hasDetails ? (
        <details className={styles.details}>
          <summary className={styles.toggle}>
            <span className={styles.toggleClosed}>Ver detalhes do projeto</span>
            <span className={styles.toggleOpen}>Fechar detalhes</span>
            <Icon name="chevron" className={styles.chevron} />
          </summary>

          <div className={styles.detailsBody}>
            {details?.map((block) => (
              <section key={block.title} className={styles.block}>
                <h4 className={styles.blockTitle}>{block.title}</h4>
                {block.text ? <p>{block.text}</p> : null}
                {block.items && block.items.length > 0 ? (
                  <ul className={styles.blockList}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {landscape.length > 0 ? (
              <div className={styles.galleryWide}>
                {landscape.map((img) => (
                  <figure key={img.src} className={styles.shot}>
                    <Picture image={img} />
                    {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}

            {portrait.length > 0 ? (
              <div className={styles.galleryPhones}>
                {portrait.map((img) => (
                  <figure key={img.src} className={styles.shot}>
                    <Picture image={img} />
                    {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </details>
      ) : null}
    </article>
  )
}
