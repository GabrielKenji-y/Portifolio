import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Section } from '../ui/Section'
import { EmptyState } from '../ui/EmptyState'
import { ExternalLink } from '../ui/ExternalLink'
import { ProjectEntry } from '../projects/ProjectEntry'
import styles from './Projects.module.css'

export function Projects() {
  const { projects, profiles } = profile

  return (
    <Section id={sectionIds.projects} title="Projetos" stage="projetos" className={styles.projects}>
      {projects.length > 0 ? (
        <div className={styles.list}>
          {projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState action={<ExternalLink href={profiles.github.href}>Ver repositórios no GitHub</ExternalLink>}>
          Ainda não há projetos publicados aqui; os primeiros estão sendo selecionados. Enquanto isso, o código
          público está no GitHub.
        </EmptyState>
      )}
    </Section>
  )
}
