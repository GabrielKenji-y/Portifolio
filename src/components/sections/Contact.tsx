import { profile } from '../../data/profile'
import { sectionIds } from '../../data/navigation'
import { Section } from '../ui/Section'
import { Icon } from '../ui/Icon'
import styles from './Contact.module.css'

interface Channel {
  label: string
  detail: string
  href: string
  external: boolean
}

export function Contact() {
  const { profiles, email } = profile
  const channels: Channel[] = [
    { label: profiles.linkedin.label, detail: profiles.linkedin.handle, href: profiles.linkedin.href, external: true },
    { label: profiles.github.label, detail: profiles.github.handle, href: profiles.github.href, external: true },
  ]
  if (email) channels.unshift({ label: 'E-mail', detail: email, href: `mailto:${email}`, external: false })

  return (
    <Section
      id={sectionIds.contact}
      title="Contato"
      stage="contato"
      className={styles.contact}
      lead="Para falar de trabalho ou de um projeto, escreva por um destes canais."
    >
      <ul className={styles.channels}>
        {channels.map((channel) => (
          <li key={channel.href}>
            <a
              className={styles.channel}
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className={styles.label} translate="no">
                {channel.label}
              </span>
              <span className={styles.detail} translate="no">
                {channel.detail}
              </span>
              <Icon name="external" className={styles.icon} />
              {channel.external ? <span className="visually-hidden"> (abre em nova aba)</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
