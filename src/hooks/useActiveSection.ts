import { useEffect, useState } from 'react'

/**
 * Retorna o id da seção atual: a última cujo topo já passou do meio da tela.
 * O IntersectionObserver só avisa quando alguma seção cruza essa linha; não há
 * trabalho a cada evento de scroll. Seções lado a lado (mesmo topo) resolvem
 * para a primeira na ordem do documento.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const resolve = () => {
      const middle = window.innerHeight / 2
      let current: HTMLElement | null = null
      let currentTop = -Infinity
      for (const el of elements) {
        const top = el.getBoundingClientRect().top
        if (top <= middle && top > currentTop + 1) {
          current = el
          currentTop = top
        }
      }
      setActive(current?.id ?? null)
    }

    // A metade de cima da tela: qualquer seção entrando ou saindo dela dispara a conta.
    const observer = new IntersectionObserver(resolve, {
      rootMargin: '0px 0px -50% 0px',
      threshold: [0, 1],
    })
    elements.forEach((el) => observer.observe(el))
    resolve()

    return () => observer.disconnect()
  }, [key])

  return active
}
