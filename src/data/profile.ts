import type { Profile } from '../types/content'

/**
 * Fonte única do conteúdo do portfólio.
 *
 * Tudo aqui é informação real fornecida pelo Gabriel. Os campos vazios
 * (about, projects, skills, education, email) ainda não foram fornecidos:
 * a interface mostra um estado vazio honesto até serem preenchidos.
 *
 * Exemplo de projeto (formato esperado — não é um projeto real):
 *
 *   {
 *     id: 'nome-curto',
 *     name: 'Nome do projeto',
 *     summary: 'O que ele faz, em uma ou duas frases.',
 *     technologies: ['React', 'TypeScript'],
 *     image: { src: '/projetos/nome-curto.webp', alt: 'Tela inicial do projeto', width: 1600, height: 1000 },
 *     liveUrl: 'https://…',
 *     repositoryUrl: 'https://github.com/GabrielKenji-y/…',
 *     caseStudyUrl: 'https://…',
 *     year: '2026',
 *   }
 */
export const profile: Profile = {
  firstName: 'Gabriel',
  lastName: 'Kenji',
  role: 'Engenheiro de Software',
  tagline: 'Software também tem encaixe e acabamento.',
  about: [],
  profiles: {
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/gabriel-kenji-b3937b353/',
      handle: 'in/gabriel-kenji-b3937b353',
    },
    github: {
      label: 'GitHub',
      href: 'https://github.com/GabrielKenji-y',
      handle: 'GabrielKenji-y',
    },
  },
  projects: [],
  skills: [],
  education: [],
}
