/**
 * Estado do objeto em cada seção. O scroll interpola entre estes estágios.
 *
 * x e y são frações da meia-largura/meia-altura visível (−1 a 1), então a
 * composição acompanha qualquer proporção de tela.
 */
export interface Stage {
  x: number
  y: number
  scale: number
  /** 0 = montado, 1 = vista explodida. */
  explode: number
  /** 0 = bloco, 1 = bancada plana. */
  grid: number
  rotX: number
  rotY: number
  /** Exposição do tone mapping: controla quanto o cromo brilha. */
  exposure: number
  /** Opacidade da moldura de medição (0–1). */
  frame: number
  /** Opacidade do palco inteiro: em telas estreitas o objeto recua atrás do texto. */
  opacity: number
}

export type StageKey = 'inicio' | 'sobre' | 'projetos' | 'habilidades' | 'contato'

const TAU = Math.PI * 2

/** Telas estreitas ou em retrato usam a composição compacta. */
export const COMPACT_QUERY = '(max-width: 760px), (max-aspect-ratio: 4/5)'

const wide: Record<StageKey, Stage> = {
  inicio: { x: 0.56, y: 0.26, scale: 0.9, explode: 0, grid: 0, rotX: 0.42, rotY: 0.62, exposure: 1, frame: 0, opacity: 1 },
  sobre: { x: 0.46, y: 0, scale: 0.92, explode: 1, grid: 0, rotX: 0.3, rotY: 1.85, exposure: 1.12, frame: 1, opacity: 1 },
  projetos: { x: 0.44, y: -0.04, scale: 0.86, explode: 0, grid: 1, rotX: 0.95, rotY: 3.3, exposure: 1.05, frame: 0, opacity: 1 },
  habilidades: { x: 0.6, y: 0.05, scale: 0.56, explode: 0.3, grid: 0, rotX: 0.55, rotY: 4.7, exposure: 0.8, frame: 0, opacity: 1 },
  contato: { x: 0.42, y: 0.06, scale: 1.02, explode: 0, grid: 0, rotX: 0.42, rotY: TAU + 0.62, exposure: 0.72, frame: 0, opacity: 1 },
}

/** Telas estreitas: o objeto sai de trás do texto e fica no alto. */
const compact: Record<StageKey, Stage> = {
  inicio: { x: 0.12, y: 0.4, scale: 0.92, explode: 0, grid: 0, rotX: 0.42, rotY: 0.62, exposure: 1, frame: 0, opacity: 1 },
  sobre: { x: 0.56, y: 0.74, scale: 0.36, explode: 1, grid: 0, rotX: 0.3, rotY: 1.85, exposure: 0.55, frame: 0.5, opacity: 0.42 },
  projetos: { x: 0.52, y: 0.75, scale: 0.36, explode: 0, grid: 1, rotX: 0.95, rotY: 3.3, exposure: 0.5, frame: 0, opacity: 0.42 },
  habilidades: { x: 0.6, y: 0.76, scale: 0.3, explode: 0.3, grid: 0, rotX: 0.55, rotY: 4.7, exposure: 0.45, frame: 0, opacity: 0.35 },
  contato: { x: 0.5, y: 0.72, scale: 0.42, explode: 0, grid: 0, rotX: 0.42, rotY: TAU + 0.62, exposure: 0.6, frame: 0, opacity: 0.6 },
}

export function stagesFor(isCompact: boolean): Record<StageKey, Stage> {
  return isCompact ? compact : wide
}

export const stageKeys = Object.keys(wide) as StageKey[]

export function mixStage(a: Stage, b: Stage, t: number): Stage {
  const m = (p: number, q: number) => p + (q - p) * t
  return {
    x: m(a.x, b.x),
    y: m(a.y, b.y),
    scale: m(a.scale, b.scale),
    explode: m(a.explode, b.explode),
    grid: m(a.grid, b.grid),
    rotX: m(a.rotX, b.rotX),
    rotY: m(a.rotY, b.rotY),
    exposure: m(a.exposure, b.exposure),
    frame: m(a.frame, b.frame),
    opacity: m(a.opacity, b.opacity),
  }
}

export interface StageAnchor {
  key: StageKey
  /** scrollY em que o estágio está completo. */
  scrollY: number
}

const smooth = (t: number) => t * t * (3 - 2 * t)

/** Estágio para um scrollY, a partir das âncoras medidas no DOM. */
export function stageAt(
  scrollY: number,
  anchors: StageAnchor[],
  table: Record<StageKey, Stage>,
): Stage {
  if (anchors.length === 0) return table.inicio
  if (scrollY <= anchors[0].scrollY) return table[anchors[0].key]

  for (let i = 0; i < anchors.length - 1; i++) {
    const from = anchors[i]
    const to = anchors[i + 1]
    if (scrollY <= to.scrollY) {
      const span = Math.max(1, to.scrollY - from.scrollY)
      return mixStage(table[from.key], table[to.key], smooth((scrollY - from.scrollY) / span))
    }
  }
  return table[anchors[anchors.length - 1].key]
}
