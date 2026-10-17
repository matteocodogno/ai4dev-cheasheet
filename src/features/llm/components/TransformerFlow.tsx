import { Fragment } from 'react'

import { useT } from '@/i18n/useT'

import { TRANSFORMER_FLOW, transformerLabels } from '../content'
import FlowStage from './FlowStage'
import styles from './TransformerFlow.module.css'

/** text → embeddings → [attention → feed-forward] × many layers → next-word probabilities */
const TransformerFlow = () => {
  const t = useT()
  const before = TRANSFORMER_FLOW.filter((s, i) => !s.repeat && i < 2)
  const loop = TRANSFORMER_FLOW.filter((s) => s.repeat)
  const after = TRANSFORMER_FLOW.filter((s, i) => !s.repeat && i >= 2)
  return (
    <div className={styles.flow} role="img" aria-label={t(transformerLabels.aria)}>
      {before.map((s) => (
        <Fragment key={s.label.en}>
          <FlowStage label={t(s.label)} color={s.color} />
          <span className={styles.arrow}>→</span>
        </Fragment>
      ))}
      <span className={styles.loop}>
        {loop.map((s, i) => (
          <Fragment key={s.label.en}>
            {i > 0 && <span className={styles.arrow}>→</span>}
            <FlowStage label={t(s.label)} color={s.color} pulse />
          </Fragment>
        ))}
        <span className={styles.times}>{t(transformerLabels.repeat)}</span>
      </span>
      {after.map((s) => (
        <Fragment key={s.label.en}>
          <span className={styles.arrow}>→</span>
          <FlowStage label={t(s.label)} color={s.color} />
        </Fragment>
      ))}
    </div>
  )
}

export default TransformerFlow
