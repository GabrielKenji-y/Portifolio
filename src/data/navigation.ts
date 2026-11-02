export const sectionIds = {
  hero: 'inicio',
  about: 'sobre',
  projects: 'projetos',
  skills: 'habilidades',
  education: 'formacao',
  contact: 'contato',
} as const

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds]

export interface NavItem {
  id: SectionId
  label: string
}

export const navItems: NavItem[] = [
  { id: sectionIds.about, label: 'Sobre' },
  { id: sectionIds.projects, label: 'Projetos' },
  { id: sectionIds.skills, label: 'Habilidades' },
  { id: sectionIds.education, label: 'Formação' },
  { id: sectionIds.contact, label: 'Contato' },
]
