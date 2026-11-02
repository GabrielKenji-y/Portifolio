import { useCallback, useState } from 'react'

const STORAGE_KEY = 'gk:motion-paused'

function readStored(): boolean | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === null ? null : value === '1'
  } catch {
    return null
  }
}

/**
 * Animação automática do objeto 3D (rotação, resposta ao mouse) ligada ou
 * pausada. Sem escolha salva, segue o sistema: quem pediu movimento reduzido
 * começa pausado e pode ligar pelo botão do topo. A escolha fica salva.
 */
export function useMotionPause(prefersReduced: boolean): [paused: boolean, toggle: () => void] {
  const [stored, setStored] = useState(readStored)
  const paused = stored ?? prefersReduced

  const toggle = useCallback(() => {
    const next = !paused
    setStored(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      // Armazenamento indisponível: a escolha vale só nesta visita.
    }
  }, [paused])

  return [paused, toggle]
}
