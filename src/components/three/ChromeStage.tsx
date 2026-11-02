import { useEffect, useRef, useState } from 'react'
import { COMPACT_QUERY, stageKeys, type StageAnchor, type StageKey } from './stages'
import type { ChromeScene } from './createChromeScene'
import styles from './ChromeStage.module.css'

/**
 * Mede onde cada estágio fica completo. No desktop, com a seção centralizada;
 * em telas estreitas, com o título logo abaixo do objeto, que ocupa o alto da tela.
 */
function measureAnchors(): StageAnchor[] {
  const viewport = window.innerHeight
  const compact = window.matchMedia(COMPACT_QUERY).matches
  const maxScroll = document.documentElement.scrollHeight - viewport
  const anchors: StageAnchor[] = []

  document.querySelectorAll<HTMLElement>('[data-stage]').forEach((el) => {
    const key = el.dataset.stage as StageKey
    if (!stageKeys.includes(key)) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const resting = compact ? top - viewport * 0.36 : top + el.offsetHeight / 2 - viewport / 2
    const scrollY = key === 'inicio' ? 0 : Math.min(Math.max(0, resting), maxScroll)
    const previous = anchors.at(-1)
    // Âncoras precisam ser crescentes; seções curtas no fim da página colapsam.
    if (previous && scrollY <= previous.scrollY + 1) return
    anchors.push({ key, scrollY })
  })

  return anchors
}

/**
 * Palco fixo do objeto cromado. O Three.js só é baixado depois da primeira
 * pintura, então o nome e o texto aparecem sem esperar pelo WebGL.
 */
interface ChromeStageProps {
  /** Movimento automático pausado pelo visitante. */
  paused: boolean
}

export function ChromeStage({ paused }: ChromeStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<ChromeScene | null>(null)
  const pausedRef = useRef(paused)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    let dispose: (() => void) | undefined

    const start = () => {
      import('./createChromeScene')
        .then(({ createChromeScene }) => {
          if (cancelled) return
          const scene = createChromeScene({ canvas, calm: pausedRef.current, measureAnchors })
          sceneRef.current = scene
          dispose = scene.dispose
          setStatus('ready')
        })
        .catch(() => {
          // Sem WebGL (ou falha de rede no chunk): a página segue completa sem o objeto.
          if (!cancelled) setStatus('unavailable')
        })
    }

    const idle = window.requestIdleCallback?.(start, { timeout: 600 }) ?? window.setTimeout(start, 120)

    return () => {
      cancelled = true
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
      dispose?.()
      sceneRef.current = null
    }
  }, [])

  useEffect(() => {
    pausedRef.current = paused
    sceneRef.current?.setPaused(paused)
  }, [paused])

  if (status === 'unavailable') return null

  return (
    <div
      className={styles.stage}
      data-ready={status === 'ready'}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
