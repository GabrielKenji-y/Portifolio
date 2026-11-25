import type { Project, ProjectImage } from '../../types/content'
import { ExternalLink } from '../ui/ExternalLink'
import styles from './ProjectEntry.module.css'

interface ProjectEntryProps {
  project: Project
  /** Posição na lista (1, 2, 3…), mostrada como 01, 02… */
  index: number
}

function Picture({ image, className, eager }: { image: ProjectImage; className?: string; eager?: boolean }) {
  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}

/**
 * Um projeto real, apresentado como estudo de caso: ficha técnica, capa grande,
 * entregas, os capítulos do caso e a galeria. Cada campo opcional só aparece
 * quando existe: nenhum link ou imagem de mentira.
 */
export function ProjectEntry({ project, index }: ProjectEntryProps) {
  const {
    id, name, client, status, role, summary, highlights, technologies, image,
    details, gallery, liveUrl, repositoryUrl, repositoryNote, caseStudyUrl, year,
  } = project

  const links = [
    liveUrl && { href: liveUrl, label: 'Abrir projeto' },
    repositoryUrl && { href: repositoryUrl, label: 'Ver código' },
    caseStudyUrl && { href: caseStudyUrl, label: 'Ler estudo de caso' },
  ].filter(Boolean) as { href: string; label: string }[]

  // "Yoshida Sushi: pedidos pela mesa e delivery" → título curto + subtítulo
  const [title, subtitle] = name.includes(':') ? name.split(/:\s*/, 2) : [name, '']

  const spec = [
    client && { term: 'Cliente', value: client },
    year && { term: 'Ano', value: year },
    role && { term: 'Papel', value: role },
    status && { term: 'Situação', value: status, live: true },
  ].filter(Boolean) as { term: string; value: string; live?: boolean }[]

  const number = String(index).padStart(2, '0')

  return (
    <article className={styles.entry} aria-labelledby={`${id}-nome`}>
      <header className={styles.head}>
        <p className={styles.index} aria-hidden="true">
          {number}
        </p>
        <h3 id={`${id}-nome`} className={styles.name}>
          <span className={styles.title}>{title}</span>
          {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        </h3>
        {spec.length > 0 ? (
          <dl className={styles.spec}>
            {spec.map((item) => (
              <div key={item.term} className={styles.specItem}>
                <dt>{item.term}</dt>
                <dd className={item.live ? styles.live : undefined}>{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      {image ? (
        <figure className={styles.cover}>
          <Picture image={image} className={styles.coverImage} />
        </figure>
      ) : null}

      <div className={styles.body}>
        <div className={styles.story}>
          {summary ? <p className={styles.summary}>{summary}</p> : null}
          {highlights && highlights.length > 0 ? (
            <ul className={styles.highlights}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <aside className={styles.side}>
          {technologies && technologies.length > 0 ? (
            <div className={styles.stack}>
              <h4 className={styles.sideTitle}>Tecnologias</h4>
              <ul className={styles.tech}>
                {technologies.map((tech) => (
                  <li key={tech} translate="no">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
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
        </aside>
      </div>

      {details && details.length > 0 ? (
        <div className={styles.chapters}>
          {details.map((block) => (
            <section key={block.title} className={styles.chapter}>
              <h4 className={styles.chapterTitle}>{block.title}</h4>
              {block.text ? <p>{block.text}</p> : null}
              {block.items && block.items.length > 0 ? (
                <ul className={styles.chapterList}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      ) : null}

      {gallery && gallery.length > 0 ? (
        <div className={styles.reelWrap}>
          <h4 className={styles.reelTitle}>Telas</h4>
          {/* Faixa que rola para o lado: no teclado, foque e use as setas */}
          <ul className={styles.reel} tabIndex={0} aria-label={`Telas do projeto ${title}. Role para o lado para ver todas.`}>
            {gallery.map((img) => (
              <li key={img.src} className={img.height > img.width ? styles.phone : styles.wide}>
                <figure className={styles.shot}>
                  <Picture image={img} />
                  {img.caption ? <figcaption>{img.caption}</figcaption> : null}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}
