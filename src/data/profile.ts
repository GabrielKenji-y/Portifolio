import type { Profile } from '../types/content'

/**
 * Fonte única do conteúdo do portfólio.
 *
 * Tudo aqui é informação real fornecida pelo Gabriel. Os campos vazios
 * (about, email) ainda não foram fornecidos: a interface mostra um estado
 * vazio honesto até serem preenchidos.
 *
 * Para adicionar um projeto, copie o bloco do Yoshida em `projects`, troque
 * o `id` e preencha só o que existir. Só `id` e `name` são obrigatórios;
 * o resto aparece na página quando preenchido. Veja o README.
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
  projects: [
    {
      id: 'yoshida-sushi',
      name: 'Yoshida Sushi: pedidos pela mesa e delivery',
      client: 'Yoshida Sushi · Rondonópolis (MT)',
      year: '2026',
      status: 'Em implantação',
      role: 'Desenvolvimento full stack',
      summary:
        'Sistema de pedidos para um restaurante japonês. O cliente lê o QR Code da mesa ou pede por delivery e retirada, paga com Pix e o pedido sai impresso na cozinha assim que o pagamento é confirmado.',
      highlights: [
        'QR Code próprio para cada mesa, com acesso por token',
        'Pix pelo Mercado Pago, com a confirmação feita no servidor',
        'Impressão automática na cozinha (ESC/POS pela rede), com nova tentativa se falhar',
        'Delivery com localização por GPS ou CEP e taxa calculada pela distância da rota',
        'Painel da cozinha, histórico de pedidos e edição do pedido antes do pagamento',
      ],
      technologies: [
        'Node.js',
        'Express',
        'SQLite',
        'JavaScript',
        'HTML e CSS',
        'Mercado Pago API',
        'WhatsApp Cloud API',
        'OpenStreetMap / OSRM',
        'ESC/POS',
      ],
      image: {
        src: '/projetos/yoshida/capa.webp',
        alt: 'Cardápio do Yoshida Sushi aberto no computador e em dois celulares, com fotos dos pratos sobre fundo escuro',
        width: 1600,
        height: 1000,
      },
      details: [
        {
          title: 'O problema',
          text: 'Em horário de pico, anotar pedidos à mão e conferir pagamentos atrasava o atendimento e gerava erros entre o salão e a cozinha. O restaurante também queria receber delivery sem depender das taxas de aplicativos.',
        },
        {
          title: 'A solução',
          text: 'Um site único que atende mesa, delivery e retirada. O cliente monta o pedido, paga com Pix e acompanha o status. Quando o pagamento é confirmado, a comanda é impressa direto na cozinha e o cliente recebe a confirmação por WhatsApp. A equipe acompanha tudo num painel com mesas, pedidos e configurações da impressora.',
        },
        {
          title: 'Destaques técnicos',
          items: [
            'Preços, taxa de entrega e total recalculados no servidor: o valor enviado pelo navegador nunca é usado',
            'Sessões com cookie HttpOnly, bloqueio contra tentativas de senha e limites de requisição por rota',
            'Política de segurança de conteúdo (CSP) e validação de todas as entradas',
            'Banco SQLite com migrações e backup diário automático',
            'Atualização automática do sistema no computador do restaurante',
            'Bateria de testes automatizados cobrindo os fluxos de pedido, pagamento e impressão',
          ],
        },
      ],
      gallery: [
        {
          src: '/projetos/yoshida/cardapio-computador.webp',
          alt: 'Cardápio no computador, com categorias no topo e pratos em grade',
          caption: 'Cardápio no computador',
          width: 1568,
          height: 783,
        },
        {
          src: '/projetos/yoshida/ficha-computador.webp',
          alt: 'Ficha de um prato aberta sobre o cardápio, com foto, descrição e botão de adicionar',
          caption: 'Ficha do prato',
          width: 1568,
          height: 783,
        },
        {
          src: '/projetos/yoshida/celular-cardapio.webp',
          alt: 'Cardápio no celular',
          caption: 'Cardápio',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-ficha.webp',
          alt: 'Ficha de um prato no celular',
          caption: 'Ficha do prato',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-pedido.webp',
          alt: 'Carrinho com os itens do pedido no celular',
          caption: 'Pedido',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-confirmado.webp',
          alt: 'Tela de pedido confirmado no celular',
          caption: 'Confirmação',
          width: 780,
          height: 1688,
        },
      ],
      repositoryNote: 'Código privado (projeto de cliente)',
    },
  ],
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
