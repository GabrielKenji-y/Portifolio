import { useEffect, useRef } from 'react'
import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import styles from './Hero.module.css'

/** Letras separadas para o eixo de largura reagir ao cursor, uma a uma. */
function Letters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((char, i) => (
        <span key={i} className={styles.letter} aria-hidden="true">
          {char}
        </span>
      ))}
    </>
  )
}

/*
 * Assinatura do site: perto do cursor, as letras do nome se comprimem e ganham
 * peso, como peças se encaixando; longe dele, voltam à largura total.
 * Só com mouse e sem "reduzir movimento". Tudo por requestAnimationFrame.
 */
function useFittingLetters(ref: React.RefObject<HTMLHeadingElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled || !window.matchMedia('(pointer: fine)').matches) return

    const letters = [...el.querySelectorAll<HTMLElement>(`.${styles.letter}`)]
    const base = { wdth: 125, wght: 820 }
    const current = letters.map(() => ({ ...base }))
    let centers: { x: number; y: number }[] = []
    let pointer: { x: number; y: number } | null = null
    let frame = 0

    const measure = () => {
      centers = letters.map((letter) => {
        const r = letter.getBoundingClientRect()
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      })
    }

    const tick = () => {
      frame = 0
      let moving = false
      const radius = Math.max(220, window.innerWidth * 0.18)
      letters.forEach((letter, i) => {
        let target = base
        if (pointer && centers[i]) {
          const d = Math.hypot(pointer.x - centers[i].x, pointer.y - centers[i].y)
          const t = Math.max(0, 1 - d / radius) ** 2
          target = { wdth: base.wdth - 38 * t, wght: base.wght + 80 * t }
        }
        const c = current[i]
        c.wdth += (target.wdth - c.wdth) * 0.16
        c.wght += (target.wght - c.wght) * 0.16
        if (Math.abs(target.wdth - c.wdth) > 0.05) moving = true
        letter.style.fontStretch = `${c.wdth.toFixed(2)}%`
        letter.style.fontWeight = `${Math.round(c.wght)}`
      })
      if (moving) frame = requestAnimationFrame(tick)
    }

    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      if (!centers.length) measure()
      pointer = { x: event.clientX, y: event.clientY }
      request()
    }
    const onLeave = () => {
      pointer = null
      request()
    }
    const onLayout = () => {
      centers = []
    }

    const hero = el.closest('section') ?? el
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', onLayout)
    window.addEventListener('scroll', onLayout, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onLayout)
      window.removeEventListener('scroll', onLayout)
      letters.forEach((letter) => {
        letter.style.fontStretch = ''
        letter.style.fontWeight = ''
      })
    }
  }, [ref, enabled])
}

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  useFittingLetters(nameRef, !reducedMotion)

  return (
    <section id={sectionIds.hero} data-stage="inicio" aria-labelledby="hero-titulo" className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
      </div>

      <h1
        id="hero-titulo"
        ref={nameRef}
        className={styles.name}
        translate="no"
        aria-label={`${profile.firstName} ${profile.lastName}`}
      >
        <span className={styles.line}>
          <span className={styles.word}>
            <Letters text={profile.firstName} />
          </span>
        </span>
        <span className={styles.line}>
          <span className={styles.word}>
            <Letters text={profile.lastName} />
          </span>
        </span>
      </h1>

      <a className={styles.cue} href={`#${sectionIds.projects}`}>
        <span>Ver projetos</span>
        <span className={styles.cueLine} aria-hidden="true" />
      </a>
    </section>
  )
}
