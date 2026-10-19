import type { CSSProperties } from 'react'

import { useT } from '@/i18n/useT'
import { RichText, Terminal } from '@/ui'

import { brownfieldLabels, type BrownfieldStep } from '../content'
import styles from './StepPanel.module.css'

type Props = { step: BrownfieldStep; number: number }

const StepPanel = ({ step, number }: Props) => {
  const t = useT()
  return (
    <div className={styles.panel} style={{ '--step': step.color } as CSSProperties}>
      <div className={styles.text}>
        <h3 className={styles.name}>
          {number}. {t(step.name)}
        </h3>
        <p>
          <b>{t(brownfieldLabels.goal)}:</b> {t(step.goal)}
        </p>
        <p>
          <b>{t(brownfieldLabels.output)}:</b> <RichText text={t(step.output)} />
        </p>
        <ul className={styles.list}>
          {t(step.contents).map((c) => (
            <li key={c}>
              <RichText text={c} />
            </li>
          ))}
        </ul>
        <p className={styles.trap}>
          <b>{t(brownfieldLabels.trap)}:</b> {t(step.trap)}
        </p>
      </div>
      <Terminal title={step.promptTitle} copyText={step.prompt} wrap>
        {step.prompt}
      </Terminal>
    </div>
  )
}

export default StepPanel
