# Portfólio — Gabriel Kenji

Landing page de Gabriel Kenji, Engenheiro de Software. React + TypeScript + Vite, com um objeto 3D em Three.js que muda de forma conforme a página rola.

## Rodar

**Pelo VS Code, sem digitar comandos:** *Terminal → Run Task…*

- **Instalar Node.js (só na primeira vez)**: instala o Node.js LTS pelo winget (o Windows pede permissão de administrador).
- **Rodar o site**: instala as dependências e abre o site em http://localhost:5173.

**Pelo terminal:**

```bash
npm install
npm run dev        # servidor local
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build
npm run lint       # oxlint
npm run typecheck  # tsc
```

## Onde editar o conteúdo

Todo o conteúdo está em `src/data/profile.ts`. Os campos vazios mostram um estado vazio na página até serem preenchidos:

| Campo | Seção | Formato |
|---|---|---|
| `about` | Sobre | lista de parágrafos |
| `projects` | Projetos | `Project[]`, na ordem em que aparecem (veja abaixo) |
| `skills` | Habilidades | `{ title, items[] }[]` |
| `education` | Formação | `{ id, institution, program, period?, status?, description? }[]` |
| `email` | Contato | opcional; vira um canal `mailto:` |

Os tipos estão em `src/types/content.ts`. Imagens de projeto vão em `public/projetos/` e precisam de `width`, `height` e `alt` reais.

## Adicionar um projeto

1. Crie uma pasta em `public/projetos/<id-do-projeto>/` e coloque as imagens em `.webp` (capa em 1600×1000; prints de celular em pé vão numa grade de 4 colunas, prints de computador em largura total).
2. Em `src/data/profile.ts`, copie o bloco do Yoshida dentro de `projects`, troque o `id` e preencha os campos. O primeiro da lista aparece no topo.
3. Rode `npm run build` para conferir se não faltou nada.

| Campo | O que mostra |
|---|---|
| `id`, `name` | obrigatórios |
| `year`, `role`, `status` | linha acima do título (`status` vira uma etiqueta) |
| `client` | logo abaixo do título |
| `summary` | resumo de uma ou duas frases |
| `highlights` | lista curta com as principais entregas |
| `technologies` | etiquetas de tecnologia |
| `image` | capa (`src`, `alt`, `width`, `height`) |
| `liveUrl`, `caseStudyUrl`, `repositoryUrl` | links "Abrir projeto", "Ler estudo de caso", "Ver código" |
| `repositoryNote` | texto no lugar do link do código, ex. "Código privado" |
| `details` | blocos do estudo de caso dentro de "Ver detalhes do projeto": `{ title, text?, items? }` |
| `gallery` | imagens do estudo de caso, com `caption` opcional |

Campos vazios simplesmente não aparecem, então um projeto pequeno pode ter só nome, resumo e link.

## Estrutura

```
src/
├── components/
│   ├── layout/      SiteHeader (nav, menu mobile, pausa do movimento), SiteFooter
│   ├── sections/    Hero, About, Projects, Skills, Education, Contact
│   ├── projects/    ProjectEntry
│   ├── three/       ChromeStage (carrega a cena sob demanda), createChromeScene, stages (estado por seção)
│   └── ui/          Section, EmptyState, ExternalLink, Icon
├── data/            profile.ts (conteúdo), navigation.ts (seções)
├── hooks/           seção ativa, movimento reduzido, pausa do movimento
├── styles/          tokens.css, global.css
└── types/           content.ts
```

Para mudar o que o objeto faz em cada seção, edite os estágios em `src/components/three/stages.ts`.

## Animação e movimento reduzido

O bloco 3D sempre acompanha o scroll. A rotação automática, a reação ao mouse e o realce ao passar sobre links ficam no botão **Pausar/Ativar animação** do topo. Se o sistema do visitante pede movimento reduzido (no Windows: Configurações → Acessibilidade → Efeitos visuais → Efeitos de animação desligado), o site começa com a animação desligada e o visitante pode ligá-la pelo botão.

## Dependências

- `three` — o objeto 3D. Carregado só depois da primeira pintura (chunk separado, ~140 kB gzip).
- `@fontsource-variable/archivo` — fonte self-hosted com eixos de peso e largura.

Sem framework de animação nem de CSS: o parallax do nome usa scroll-driven animations nativas do CSS, e o resto é CSS Modules.
