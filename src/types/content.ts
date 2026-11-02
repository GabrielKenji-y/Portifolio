/** Um perfil público (rede ou plataforma) com link verificável. */
export interface ExternalProfile {
  /** Nome da plataforma, como aparece na interface. */
  label: string
  href: string
  /** Identificador exibido abaixo do nome (usuário, caminho do perfil). */
  handle: string
}

export interface ProjectImage {
  src: string
  /** Descrição real da imagem para leitores de tela. */
  alt: string
  width: number
  height: number
}

/**
 * Projeto real. Só `id` e `name` são obrigatórios: os demais campos
 * aparecem na interface apenas quando preenchidos.
 */
export interface Project {
  id: string
  name: string
  summary?: string
  technologies?: string[]
  image?: ProjectImage
  /** Endereço do projeto publicado. */
  liveUrl?: string
  repositoryUrl?: string
  caseStudyUrl?: string
  year?: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  program: string
  period?: string
  status?: string
  description?: string
}

export interface Profile {
  firstName: string
  lastName: string
  role: string
  /** Frase de abertura do hero. */
  tagline: string
  /** Parágrafos da seção Sobre. Lista vazia = ainda não escrita. */
  about: string[]
  profiles: {
    linkedin: ExternalProfile
    github: ExternalProfile
  }
  /** Opcional: só aparece no contato quando informado. */
  email?: string
  projects: Project[]
  skills: SkillGroup[]
  education: EducationEntry[]
}
