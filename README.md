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
| `projects` | Projetos | `Project[]` — só `id` e `name` são obrigatórios; resumo, tecnologias, imagem, links e ano aparecem quando preenchidos |
| `skills` | Habilidades | `{ title, items[] }[]` |
| `education` | Formação | `{ id, institution, program, period?, status?, description? }[]` |
| `email` | Contato | opcional; vira um canal `mailto:` |

Os tipos estão em `src/types/content.ts`. Imagens de projeto vão em `public/projetos/` e precisam de `width`, `height` e `alt` reais.

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
