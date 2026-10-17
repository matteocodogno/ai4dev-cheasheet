import clsx from 'clsx'

import { useT } from '@/i18n/useT'

import { heroCopy } from '../content'
import styles from './Hero.module.css'

const LETTERS = ['A', 'I', '4', 'D', 'E', 'V'] as const

/** Opening screen: the one orchestrated page-load sequence (letters slam in, the panel shakes). */
const Hero = () => {
  const t = useT()
  return (
    <div className={styles.hero}>
      <div className={styles.beam} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={clsx(styles.scribble, styles.top)}>{t(heroCopy.scribbleTop)}</span>
        <h1 className={styles.title} aria-label="AI4Dev">
          {LETTERS.map((l, i) => (
            <span key={i} className={styles.letter} style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              {l}
            </span>
          ))}
        </h1>
        <br />
        <div className={styles.subtitle}>{t(heroCopy.subtitle)}</div>
        <p className={styles.tagline}>{t(heroCopy.tagline)}</p>
        <span className={clsx(styles.scribble, styles.bottom)}>{t(heroCopy.scribbleBottom)}</span>
        <a className={clsx(styles.start, styles.delayed)} href="#select">
          {t(heroCopy.start)}
        </a>
      </div>
    </div>
  )
}

export default Hero
