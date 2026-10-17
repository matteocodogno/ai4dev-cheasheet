import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { Button } from '@/ui'
import Cursor from '@/ui/Terminal/Cursor'

import { llmLabels } from '../content'
import { useNextToken } from '../hooks/useNextToken'
import styles from './NextTokenDemo.module.css'

/** Interactive sampling: shows the probability of each candidate and draws one at the chosen temperature. */
const NextTokenDemo = () => {
  const t = useT()
  const nt = useNextToken()
  return (
    <div>
      <div className={styles.sentence} aria-live="polite">
        {nt.prompt}{' '}
        {nt.chosen.map((w, i) => (
          <b key={i}>{w} </b>
        ))}
        {!nt.complete && <Cursor />}
      </div>
      {nt.complete ? (
        <p className={styles.done}>{t(llmLabels.complete)}</p>
      ) : (
        <div className={styles.bars}>
          {nt.candidates.map((c, i) => (
            <div key={c.token} className={clsx(styles.row, nt.drawn === i && styles.pick)}>
              <span>{c.token}</span>
              <span className={styles.track}>
                <i className={styles.fill} style={{ width: `${(c.probability * 100).toFixed(1)}%` }} />
              </span>
              <span>{Math.round(c.probability * 100)}%</span>
            </div>
          ))}
        </div>
      )}
      <div className={styles.controls}>
        <label>
          Temperature <b>{nt.temperature.toFixed(1)}</b>{' '}
          <input
            className={styles.slider}
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={nt.temperature}
            onChange={(e) => nt.setTemperature(Number(e.target.value))}
          />
        </label>
        <Button onClick={nt.sample} disabled={!nt.canSample}>
          {t(llmLabels.sample)}
        </Button>
        <Button variant="secondary" onClick={nt.reset}>
          {t(llmLabels.reset)}
        </Button>
      </div>
    </div>
  )
}

export default NextTokenDemo
