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
  /** Legenda curta mostrada abaixo da imagem na galeria. */
  caption?: string
}

/** Um bloco do estudo de caso: um título e um parágrafo e/ou uma lista. */
export interface ProjectDetail {
  title: string
  text?: string
  items?: string[]
}

/**
 * Projeto real. Só `id` e `name` são obrigatórios: os demais campos
 * aparecem na interface apenas quando preenchidos.
 */
export interface Project {
  id: string
  name: string
  /** Para quem/onde foi feito, ex.: "Yoshida Sushi · Rondonópolis (MT)". */
  client?: string
  /** Situação atual, ex.: "Em produção", "Em desenvolvimento". */
  status?: string
  /** O que você fez no projeto, ex.: "Desenvolvimento full stack". */
  role?: string
  summary?: string
  /** Principais entregas, em frases curtas (aparecem como lista). */
  highlights?: string[]
  technologies?: string[]
  /** Imagem de capa (16:10 fica melhor). */
  image?: ProjectImage
  /** Estudo de caso que abre em "Ver detalhes do projeto". */
  details?: ProjectDetail[]
  /** Prints extras mostrados dentro dos detalhes. */
  gallery?: ProjectImage[]
  /** Endereço do projeto publicado. */
  liveUrl?: string
  repositoryUrl?: string
  /** Quando o código não é público, um aviso no lugar do link (ex.: "Código privado"). */
  repositoryNote?: string
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
