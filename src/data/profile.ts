import type { Profile } from '../types/content'

/**
 * Fonte única do conteúdo do portfólio.
 *
 * Tudo aqui é informação real fornecida pelo Gabriel. Os campos vazios
 * (about, projects, email) ainda não foram fornecidos:
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
  // Competências e formação conforme o perfil do LinkedIn.
  skills: [
    { title: 'Web', items: ['HTML5', 'CSS'] },
    {
      title: 'Ferramentas',
      items: ['Microsoft Excel', 'Microsoft Word', 'Microsoft PowerPoint', 'Edição e publicação'],
    },
    { title: 'Interpessoais', items: ['Resolução de problemas'] },
  ],
  education: [
    {
      id: 'fiap',
      institution: 'FIAP',
      program: 'Bacharelado em Engenharia de Software',
      period: 'fev. 2025 – 2028',
      status: 'em andamento',
    },
    {
      id: 'cebrac',
      institution: 'Cebrac',
      program: 'Curso de Information Technology',
      period: 'fev. 2021',
      description:
        'Desenvolvimento de sites, desenvolvimento de aplicativos, edição de fotos e conhecimentos gerais do Pacote Office.',
    },
  ],
}
