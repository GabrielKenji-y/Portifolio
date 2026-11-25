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
  // Rascunho montado só com fatos que já estão neste site. Revise e ajuste com a sua voz.
  about: [
    'Estudo Engenharia de Software na FIAP e construo sistemas web de ponta a ponta: da tela que o cliente toca até o servidor, o pagamento e a impressora da cozinha.',
    'O trabalho mais recente é o sistema de pedidos do Yoshida Sushi, em implantação num restaurante de Rondonópolis (MT), que une cardápio por QR Code, delivery, Pix e cartão.',
  ],
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
        'Pix e cartão pelo Mercado Pago (API de Orders), com a confirmação feita no servidor',
        'Impressão automática na cozinha (ESC/POS pela rede), com nova tentativa se falhar',
        'Delivery com localização por GPS ou CEP e taxa calculada pela distância da rota (Google Maps, com OpenStreetMap de reserva)',
        'Painel da cozinha com cobrança pelo garçom, aviso sonoro e impressão por um agente no notebook',
      ],
      technologies: [
        'Node.js',
        'Express',
        'SQLite',
        'JavaScript',
        'HTML e CSS',
        'Mercado Pago API',
        'WhatsApp Cloud API',
        'Google Maps API',
        'OpenStreetMap / OSRM',
        'ESC/POS',
        'Service Worker',
      ],
      image: {
        src: '/projetos/yoshida/capa.webp',
        alt: 'Site do Yoshida Sushi no computador e em dois celulares: cardápio com fotos dos pratos e a tela de pagamento confirmado',
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
          src: '/projetos/yoshida/celular-cardapio.webp',
          alt: 'Cardápio no celular, com a barra de busca em vidro, categorias em cápsulas e pratos com foto',
          caption: 'Cardápio',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-ficha.webp',
          alt: 'Ficha do Uramaki Salmão no celular, com foto grande, descrição, observação e botão de adicionar',
          caption: 'Ficha do prato',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-pedido.webp',
          alt: 'Janela do pedido no celular com dois pratos, recado para a cozinha e total',
          caption: 'Pedido',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/celular-confirmado.webp',
          alt: 'Tela de pagamento confirmado no celular, com o pedido indo para a cozinha',
          caption: 'Pagamento confirmado',
          width: 780,
          height: 1688,
        },
        {
          src: '/projetos/yoshida/cardapio-computador.webp',
          alt: 'Cardápio no computador, com categorias à esquerda, pratos em grade e o pedido à direita',
          caption: 'Cardápio no computador',
          width: 1600,
          height: 1000,
        },
        {
          src: '/projetos/yoshida/ficha-computador.webp',
          alt: 'Ficha do Filadélfia Maki aberta sobre o cardápio no computador',
          caption: 'Ficha do prato',
          width: 1600,
          height: 1000,
        },
        {
          src: '/projetos/yoshida/painel-cozinha.webp',
          alt: 'Painel da cozinha com os pedidos do dia em cartões, status de pagamento e botões de entrega e reimpressão',
          caption: 'Painel da cozinha',
          width: 1600,
          height: 1000,
        },
      ],
      repositoryNote: 'Código privado (projeto de cliente)',
    },
  ],
  // Competências e formação conforme o perfil do LinkedIn.
  skills: [
    { title: 'Front-end', items: ['JavaScript', 'HTML5', 'CSS', 'Design responsivo'] },
    { title: 'Back-end', items: ['Node.js', 'Express', 'APIs REST', 'SQLite'] },
    {
      title: 'Integrações',
      items: ['Mercado Pago (Pix)', 'WhatsApp Cloud API', 'OpenStreetMap / OSRM', 'Impressão térmica ESC/POS'],
    },
    {
      title: 'Segurança',
      items: ['Sessões com cookie HttpOnly', 'Content Security Policy', 'Rate limiting', 'Validação no servidor'],
    },
    {
      title: 'Ferramentas',
      items: [
        'Git e GitHub',
        'VS Code',
        'Microsoft Excel',
        'Microsoft Word',
        'Microsoft PowerPoint',
        'Edição e publicação',
      ],
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
