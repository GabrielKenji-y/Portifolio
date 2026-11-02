import {
  ACESFilmicToneMapping,
  BackSide,
  BoxGeometry,
  DoubleSide,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  EdgesGeometry,
  Euler,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Quaternion,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { COMPACT_QUERY, stageAt, stagesFor, type Stage, type StageAnchor } from './stages'

export interface ChromeSceneOptions {
  canvas: HTMLCanvasElement
  /**
   * Começa em modo calmo: sem entrada animada, sem rotação automática e sem
   * resposta ao mouse. O objeto continua acompanhando o scroll, porque esse
   * movimento é o próprio visitante que produz.
   */
  calm: boolean
  /** Lê as posições das seções no DOM. Chamado em cada redimensionamento. */
  measureAnchors: () => StageAnchor[]
}

export interface ChromeScene {
  /** Pausa o movimento automático (rotação ociosa e resposta ao mouse). O scroll continua valendo. */
  setPaused: (paused: boolean) => void
  dispose: () => void
}

/** Módulos ausentes do bloco 3×3×3: dão silhueta e leitura de "peça". */
const VOIDS = new Set(['1,1,1', '1,1,0', '-1,-1,1', '0,-1,-1', '-1,1,-1'])
const SPACING = 1.08
const CUBE = 0.94
const FOV = 28
const CAMERA_Z = 16
interface Module {
  assembled: Vector3
  exploded: Vector3
  grid: Vector3
  delay: number
  spin: number
}

/** Hash determinístico para variar cada módulo sem aleatoriedade entre recarregamentos. */
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

function buildModules(): Module[] {
  const modules: Module[] = []
  let index = 0
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (VOIDS.has(`${x},${y},${z}`) || (x === 0 && y === 0 && z === 0)) continue
        const assembled = new Vector3(x, y, z).multiplyScalar(SPACING)
        // Vista explodida: cada módulo se afasta ao longo do próprio eixo dominante.
        const h = hash(index)
        const exploded = assembled.clone().multiplyScalar(1.85)
        const axis = [Math.abs(x), Math.abs(y), Math.abs(z)]
        const dominant = axis.indexOf(Math.max(...axis))
        exploded.setComponent(dominant, exploded.getComponent(dominant) + Math.sign(assembled.getComponent(dominant) || 1) * h * 0.5)
        modules.push({ assembled, exploded, grid: new Vector3(), delay: h * 0.3, spin: (h - 0.5) * 0.5 })
        index++
      }
    }
  }
  // Bancada: grade plana 6 × 4 no plano XZ.
  const cols = 6
  const rows = Math.ceil(modules.length / cols)
  modules.forEach((m, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    m.grid.set((col - (cols - 1) / 2) * 1.2, 0, (row - (rows - 1) / 2) * 1.2)
  })
  return modules
}

/**
 * Estúdio escuro com faixas de luz, só para gerar reflexos. Cromo de verdade
 * é quase todo preto com brilhos nítidos: é isso que separa metal de plástico cinza.
 */
function buildStudio(): { scene: Scene; dispose: () => void } {
  const studio = new Scene()
  const disposables: { dispose: () => void }[] = []

  const roomGeometry = new BoxGeometry(30, 20, 30)
  const roomMaterial = new MeshBasicMaterial({ color: '#202125', side: BackSide })
  studio.add(new Mesh(roomGeometry, roomMaterial))
  disposables.push(roomGeometry, roomMaterial)

  const panel = (w: number, h: number, intensity: number, position: [number, number, number], rotation: [number, number, number]) => {
    const geometry = new PlaneGeometry(w, h)
    const material = new MeshBasicMaterial({ color: new Color(1, 1, 1).multiplyScalar(intensity), side: DoubleSide, toneMapped: false })
    const mesh = new Mesh(geometry, material)
    mesh.position.set(...position)
    mesh.rotation.set(...rotation)
    studio.add(mesh)
    disposables.push(geometry, material)
  }

  panel(22, 12, 1.5, [0, 9.5, 0], [Math.PI / 2, 0, 0]) // softbox no teto: topos claros
  panel(3, 16, 4, [-11, 0, 2], [0, Math.PI / 2, 0]) // painel vertical à esquerda
  panel(1.4, 16, 2.4, [11, 0, -2], [0, -Math.PI / 2, 0]) // faixa vertical à direita
  panel(24, 0.5, 4, [0, 2.5, -14], [0, 0, 0]) // linha de horizonte ao fundo
  panel(16, 5, 1.35, [0, -1, 14], [0, Math.PI, 0]) // rebatedor frontal: faces prateadas
  panel(24, 2, 0.35, [0, -9, 0], [-Math.PI / 2, 0, 0]) // brilho fraco no piso

  return { scene: studio, dispose: () => disposables.forEach((d) => d.dispose()) }
}

const stagger = (t: number, delay: number) => {
  const local = MathUtils.clamp((t - delay) / (1 - 0.3), 0, 1)
  return local * local * (3 - 2 * local)
}

export function createChromeScene({ canvas, calm, measureAnchors }: ChromeSceneOptions): ChromeScene {
  const compactMedia = window.matchMedia(COMPACT_QUERY)
  let isCompact = compactMedia.matches

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 100)
  camera.position.set(0, 0, CAMERA_Z)

  // Reflexos de estúdio gerados em tempo de execução: nenhum HDR para baixar.
  const pmrem = new PMREMGenerator(renderer)
  const studio = buildStudio()
  const envTexture = pmrem.fromScene(studio.scene, 0.02).texture
  scene.environment = envTexture
  studio.dispose()
  pmrem.dispose()

  const key = new DirectionalLight(0xffffff, 0.6)
  key.position.set(-4, 6, 8)
  scene.add(key)

  const modules = buildModules()
  const geometry = new RoundedBoxGeometry(1, 1, 1, isCompact ? 3 : 5, 0.07)
  const material = new MeshStandardMaterial({
    color: new Color('#e8ebef'),
    metalness: 1,
    roughness: 0.09,
  })
  const mesh = new InstancedMesh(geometry, material, modules.length)
  mesh.instanceMatrix.setUsage(DynamicDrawUsage)

  const frameGeometry = new EdgesGeometry(new BoxGeometry(1, 1, 1))
  const frameMaterial = new LineBasicMaterial({ color: '#5d626b', transparent: true, opacity: 0 })
  const frame = new LineSegments(frameGeometry, frameMaterial)

  const rig = new Group()
  rig.add(mesh, frame)
  scene.add(rig)

  // Estado
  let anchors: StageAnchor[] = []
  let halfW = 1
  let halfH = 1
  let current: Stage = { ...stagesFor(isCompact).inicio }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const intro = { start: performance.now(), value: calm ? 1 : 0 }
  let raf = 0
  let last = performance.now()
  let idle = 0
  let disposed = false
  let appliedOpacity = 1
  let paused = calm
  // Realce quando o cursor está sobre um link ou botão: o bloco se abre um pouco.
  const emphasis = { value: 0, target: 0 }
  let lastScrollY = -1
  let settledFrames = 0

  const tmpMatrix = new Matrix4()
  const tmpPos = new Vector3()
  const tmpQuat = new Quaternion()
  const tmpEuler = new Euler()
  const tmpScale = new Vector3()

  function resize() {
    const width = window.innerWidth
    const height = window.innerHeight
    isCompact = compactMedia.matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.5 : 1.75))
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    halfH = Math.tan(MathUtils.degToRad(FOV / 2)) * CAMERA_Z
    halfW = halfH * camera.aspect
    anchors = measureAnchors()
  }

  function targetStage(): Stage {
    return stageAt(window.scrollY, anchors, stagesFor(isCompact))
  }

  function apply(stage: Stage, time: number) {
    const introEase = 1 - Math.pow(1 - intro.value, 3)
    const focus = emphasis.value

    // Escala base proporcional à tela: o bloco ocupa cerca de metade da altura.
    const base = Math.min(halfH * 0.2, halfW * 0.32)
    rig.scale.setScalar(base * stage.scale * (0.86 + 0.14 * introEase))
    rig.position.set(stage.x * halfW, stage.y * halfH, 0)
    rig.rotation.set(
      stage.rotX + pointer.y * 0.16,
      stage.rotY + idle + pointer.x * 0.24 - (1 - introEase) * 0.6,
      0,
    )

    modules.forEach((m, i) => {
      const e = stagger(Math.min(1, stage.explode + focus * 0.22), m.delay)
      const g = stagger(stage.grid, m.delay)
      tmpPos.copy(m.assembled).lerp(m.exploded, e).lerp(m.grid, g)
      // Na vista explodida, um leve giro próprio mostra que cada peça é independente.
      tmpEuler.set(m.spin * e, m.spin * e * 1.4 + (paused ? 0 : Math.sin(time * 0.0004 + i) * 0.04 * e), 0)
      tmpQuat.setFromEuler(tmpEuler)
      tmpScale.set(CUBE, MathUtils.lerp(CUBE, 0.3, g), CUBE)
      tmpMatrix.compose(tmpPos, tmpQuat, tmpScale)
      mesh.setMatrixAt(i, tmpMatrix)
    })
    mesh.instanceMatrix.needsUpdate = true

    const span = SPACING * 3 * (1 + stage.explode * 0.9) + 0.5
    frame.scale.set(span, span * (1 - stage.grid * 0.75), span)
    frameMaterial.opacity = stage.frame * 0.5 * introEase

    renderer.toneMappingExposure = (stage.exposure + focus * 0.18) * (0.35 + 0.65 * introEase)

    // Opacidade no elemento: o compositor resolve, sem custo de transparência no WebGL.
    if (Math.abs(stage.opacity - appliedOpacity) > 0.004) {
      appliedOpacity = stage.opacity
      canvas.style.opacity = appliedOpacity.toFixed(3)
    }
  }

  function frameLoop(now: number) {
    if (disposed) return
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now

    intro.value = Math.min(1, (now - intro.start) / 1100)
    if (!paused) idle += dt * 0.07

    const k = 1 - Math.exp(-dt * 4.5)
    pointer.x += (pointer.tx - pointer.x) * k * 0.7
    pointer.y += (pointer.ty - pointer.y) * k * 0.7
    const emphasisStep = (emphasis.target - emphasis.value) * k * 1.4
    emphasis.value += emphasisStep

    const target = targetStage()
    let delta = 0
    for (const prop of Object.keys(current) as (keyof Stage)[]) {
      const step = (target[prop] - current[prop]) * k
      current[prop] += step
      delta += Math.abs(step)
    }

    // Pausado e parado: não redesenha um quadro idêntico.
    const scrolled = window.scrollY !== lastScrollY
    lastScrollY = window.scrollY
    const moving =
      !paused ||
      intro.value < 1 ||
      scrolled ||
      delta > 1e-4 ||
      Math.abs(emphasisStep) > 1e-4 ||
      Math.abs(pointer.x) + Math.abs(pointer.y) > 1e-3
    settledFrames = moving ? 0 : settledFrames + 1
    if (settledFrames < 2) {
      apply(current, now)
      renderer.render(scene, camera)
    }
    raf = requestAnimationFrame(frameLoop)
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || paused) return
    pointer.tx = (event.clientX / window.innerWidth) * 2 - 1
    pointer.ty = (event.clientY / window.innerHeight) * 2 - 1
  }

  function onPointerLeave() {
    pointer.tx = 0
    pointer.ty = 0
  }

  function onPointerOver(event: PointerEvent) {
    if (paused || event.pointerType !== 'mouse') return
    const target = event.target as Element | null
    emphasis.target = target?.closest('main a, main button, footer a') ? 1 : 0
  }

  function onResize() {
    resize()
    settledFrames = 0
  }

  function onContextLost(event: Event) {
    event.preventDefault()
    cancelAnimationFrame(raf)
  }

  // Seções mudam de altura quando a fonte carrega: remede as âncoras.
  const bodyObserver = new ResizeObserver(() => {
    anchors = measureAnchors()
  })
  bodyObserver.observe(document.body)

  resize()
  window.addEventListener('resize', onResize)
  canvas.addEventListener('webglcontextlost', onContextLost)
  compactMedia.addEventListener('change', onResize)

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerover', onPointerOver, { passive: true })
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  current = { ...targetStage() }
  raf = requestAnimationFrame(frameLoop)

  return {
    setPaused(value) {
      paused = value
      settledFrames = 0
      if (paused) {
        pointer.tx = 0
        pointer.ty = 0
        emphasis.target = 0
      }
    },
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      bodyObserver.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      compactMedia.removeEventListener('change', onResize)
      geometry.dispose()
      material.dispose()
      frameGeometry.dispose()
      frameMaterial.dispose()
      envTexture.dispose()
      renderer.dispose()
    },
  }
}
