import clsx from 'clsx'
import type { CSSProperties } from 'react'

import { useT } from '@/i18n/useT'

import { STAGES } from '../content'
import styles from './Pipeline.module.css'

type Props = { active: number; onPick: (i: number) => void }

/** Five stages with approval gates between them; a packet travels to the active stage. */
const Pipeline = ({ active, onPick }: Props) => {
  const t = useT()
  const color = STAGES[active]?.color ?? '#ff2e7e'
  return (
    <div className={styles.pipe}>
      <div
        className={styles.packet}
        aria-hidden="true"
        style={{
          left: `calc(${((active + 0.5) / STAGES.length) * 100}% - 15px)`,
          background: color,
          boxShadow: `0 0 14px ${color}`,
        }}
      />
      {STAGES.map((s, i) => (
        <button
          key={s.name}
          type="button"
          className={clsx(styles.stage, i === active && styles.on)}
          style={{ '--stage': s.color } as CSSProperties}
          aria-pressed={i === active}
          onClick={() => onPick(i)}
        >
          <span className={styles.name}>{s.name}</span>
          <span className={styles.file}>{t(s.file)}</span>
          <span className={styles.tagline}>{t(s.tagline)}</span>
          {i < STAGES.length - 1 && (
            <span className={styles.gate} aria-hidden="true">
              <span>OK</span>
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export default Pipeline
