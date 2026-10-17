import { useT } from '@/i18n/useT'
import { Button, Chip, Panel, Pips, type PipState } from '@/ui'

import { pickerLabels, QUESTIONS, type Answers } from '../content'
import { useModelPicker } from '../hooks/useModelPicker'
import styles from './ModelPicker.module.css'
import QuestionStep from './QuestionStep'
import Results from './Results'

const choiceLabel = (answers: Answers, i: number) => {
  const q = QUESTIONS[i]
  if (!q) return undefined
  const value = answers[q.id]
  return (q.choices as readonly { value: string; label: { it: string; en: string } }[]).find(
    (c) => c.value === value,
  )?.label
}

const pips = (answers: Answers, step: number): PipState[] =>
  QUESTIONS.map((q, i) => (i === step ? 'current' : answers[q.id] !== undefined ? 'on' : 'empty'))

/** Four-question wizard that ends in a ranked shortlist of model options. */
const ModelPicker = () => {
  const t = useT()
  const mp = useModelPicker()
  return (
    <Panel>
      <div className={styles.top}>
        <Pips states={pips(mp.answers, mp.step)} label={`${Math.min(mp.step + 1, mp.total)} / ${mp.total}`} />
        <div className={styles.summary}>
          {QUESTIONS.map((q, i) => {
            const label = choiceLabel(mp.answers, i)
            return label ? (
              <Chip
                key={q.id}
                className={styles.summaryItem}
                tone={i === mp.step ? 'selected' : 'idle'}
                onClick={() => mp.goTo(i)}
                data-no-burst
              >
                {t(label)}
              </Chip>
            ) : null
          })}
        </div>
      </div>

      {mp.question ? (
        <QuestionStep question={mp.question} answers={mp.answers} onAnswer={mp.answer} />
      ) : (
        mp.result && (
          <>
            <h3 className={styles.question}>{t(pickerLabels.resultsTitle)}</h3>
            <Results result={mp.result} />
          </>
        )
      )}

      <div className={styles.actions}>
        {mp.step > 0 && (
          <Button variant="secondary" onClick={mp.back}>
            {t(pickerLabels.back)}
          </Button>
        )}
        {Object.keys(mp.answers).length > 0 && (
          <Button onClick={mp.restart}>{t(pickerLabels.restart)}</Button>
        )}
      </div>
      <p className={styles.disclaimer}>{t(pickerLabels.disclaimer)}</p>
    </Panel>
  )
}

export default ModelPicker
