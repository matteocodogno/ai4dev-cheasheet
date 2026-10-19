import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'

import styles from './HighlightCard.module.css'

export type HighlightState = 'idle' | 'on' | 'off'

type Props = {
  title: ReactNode
  /** Handwritten line under the title. */
  kicker?: ReactNode
  color: string
  state?: HighlightState
  /** Sticker shown when the card is on or off (e.g. "MATCH", "SKIP"). */
  stamp?: ReactNode
  children?: ReactNode
  className?: string
}

/** Card that can light up or fade out when a scenario is picked. */
const HighlightCard = ({ title, kicker, color, state = 'idle', stamp, children, className }: Props) => (
  <div
    className={clsx(styles.card, state !== 'idle' && styles[state], className)}
    style={{ '--card': color } as CSSProperties}
  >
    <div className={styles.cap}>
      <i className={styles.capFill} />
    </div>
    {state !== 'idle' && stamp && (
      <div key={state} className={styles.stamp}>
        {stamp}
      </div>
    )}
    <h3 className={styles.title}>{title}</h3>
    {kicker && <div className={styles.kicker}>{kicker}</div>}
    {children}
  </div>
)

export default HighlightCard
