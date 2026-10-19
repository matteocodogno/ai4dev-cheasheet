import { Fragment } from 'react'

import styles from './FlowChain.module.css'

type Props = { flow: readonly (string | readonly string[])[] }

/** Tiny box-and-arrow diagram; a nested array renders as stacked parallel lanes. */
const FlowChain = ({ flow }: Props) => (
  <div className={styles.flow} aria-hidden="true">
    {flow.map((stage, i) => (
      <Fragment key={i}>
        {i > 0 && <span className={styles.arrow}>→</span>}
        {typeof stage === 'string' ? (
          <span className={styles.box}>{stage}</span>
        ) : (
          <span className={styles.lanes}>
            {stage.map((lane, j) => (
              <span key={j} className={styles.box}>
                {lane}
              </span>
            ))}
          </span>
        )}
      </Fragment>
    ))}
  </div>
)

export default FlowChain
