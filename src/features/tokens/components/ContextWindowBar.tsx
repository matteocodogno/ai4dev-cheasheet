import clsx from 'clsx'
import { useState } from 'react'

import { useT } from '@/i18n/useT'
import { Panel } from '@/ui'

import { WINDOW_BLOCKS, WINDOW_SIZE_K, windowCopy } from '../content'
import styles from './ContextWindowBar.module.css'

const used = WINDOW_BLOCKS.reduce((a, b) => a + b.k, 0)

/** Stacked bar of a 200k-token window. Clicking a block (or its legend entry) explains it. */
const ContextWindowBar = () => {
  const t = useT()
  const [selected, setSelected] = useState<number | null>(null)
  const current = selected === null ? null : WINDOW_BLOCKS[selected]
  return (
    <Panel title={t(windowCopy.title)} style={{ marginTop: 24 }}>
      <p className="hint">{t(windowCopy.hint)}</p>
      <div className={styles.bar}>
        {WINDOW_BLOCKS.map((b, i) => (
          <button
            key={i}
            type="button"
            className={clsx(styles.block, selected === i && styles.on)}
            style={{ flexBasis: `${(b.k / WINDOW_SIZE_K) * 100}%`, background: b.color }}
            title={t(b.name)}
            aria-label={`${t(b.name)} ${b.k}k`}
            onClick={() => setSelected(i)}
            data-no-burst
          >
            {b.k >= 12 ? `${b.k}k` : ''}
          </button>
        ))}
        <div
          className={styles.free}
          style={{ flexBasis: `${((WINDOW_SIZE_K - used) / WINDOW_SIZE_K) * 100}%` }}
        >
          {WINDOW_SIZE_K - used}k {t(windowCopy.free)}
        </div>
      </div>
      <div className={styles.legend}>
        {WINDOW_BLOCKS.map((b, i) => (
          <button
            key={i}
            type="button"
            className={styles.legendItem}
            onClick={() => setSelected(i)}
            data-no-burst
          >
            <i className={styles.swatch} style={{ background: b.color }} />
            {t(b.name)} <span className={styles.k}>{b.k}k</span>
          </button>
        ))}
      </div>
      <div className={styles.info} aria-live="polite">
        {current ? (
          <>
            <b>
              {t(current.name)} ({current.k}k token)
            </b>
            : {t(current.desc)}
          </>
        ) : (
          t(windowCopy.empty)
        )}
      </div>
    </Panel>
  )
}

export default ContextWindowBar
