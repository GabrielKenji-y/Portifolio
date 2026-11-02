const paths = {
  /** Link que abre fora do site. */
  external: 'M7 17 17 7M8 7h9v9',
  /** Volta ao topo. */
  up: 'M12 19V5M5.5 11.5 12 5l6.5 6.5',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  pause: 'M9 6v12M15 6v12',
  play: 'M8 5.5v13l10.5-6.5z',
} as const

export type IconName = keyof typeof paths

interface IconProps {
  name: IconName
  className?: string
}

/** Ícones de traço único, 1.5px, desenhados para este site. Sempre decorativos. */
export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
