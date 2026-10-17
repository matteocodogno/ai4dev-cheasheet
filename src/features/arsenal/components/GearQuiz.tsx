import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { Button, Chip, Panel, Pips, Stat, type ChipTone, type PipState } from '@/ui'

import { GEAR, quizLabels, SCENARIOS, type GearName, type Scenario } from '../content'
import { useQuiz, type Answer } from '../hooks/useQuiz'
import styles from './GearQuiz.module.css'

const pipStates = (total: number, index: number, answers: readonly Answer<GearName>[]): PipState[] =>
  Array.from({ length: total }, (_, i) => {
    const a = answers[i]
    if (a) return a.correct ? 'good' : 'bad'
    return i === index ? 'current' : 'empty'
  })

const optionTone = (name: GearName, scenario: Scenario, answer?: Answer<GearName>): ChipTone => {
  if (!answer) return 'idle'
  if (name === scenario.answer) return 'good'
  return name === answer.pick ? 'bad' : 'idle'
}

/** Scenario quiz: which building block fits? Counter and progress pips at the top right. */
const GearQuiz = () => {
  const t = useT()
  const q = useQuiz<GearName, Scenario>(SCENARIOS)
  const nextLabel = q.finished ? quizLabels.again : q.isLast ? quizLabels.result : quizLabels.next

  return (
    <Panel className="spaced">
      <div className={styles.top}>
        <div>
          <h3 className={styles.title}>{t(quizLabels.title)}</h3>
          <Pips states={pipStates(q.total, q.index, q.answers)} />
        </div>
        <div className={styles.counter}>
          <Stat label={t(quizLabels.scenario)} value={`${Math.min(q.index + 1, q.total)} / ${q.total}`} />
          <Stat label={t(quizLabels.hits)} value={q.hits} />
        </div>
      </div>

      {q.finished || !q.current ? (
        <>
          <p className={styles.question}>
            {t(quizLabels.final).replace('{hits}', String(q.hits)).replace('{total}', String(q.total))}
          </p>
          <div className={styles.feedback}>
            {q.hits === q.total ? (
              <b className={clsx(styles.verdict, styles.hit)}>{t(quizLabels.legendary)}</b>
            ) : (
              <span className="hint">{t(quizLabels.retry)}</span>
            )}
          </div>
        </>
      ) : (
        <>
          <p className={styles.question}>{t(q.current.prompt)}</p>
          <div className={styles.options}>
            {GEAR.map((g) => (
              <Chip
                key={g.name}
                tone={optionTone(g.name, q.current as Scenario, q.currentAnswer)}
                disabled={q.currentAnswer !== undefined}
                onClick={() => q.answer(g.name)}
              >
                {g.name}
              </Chip>
            ))}
          </div>
          <div className={styles.feedback} aria-live="polite">
            {q.currentAnswer && (
              <>
                <b className={clsx(styles.verdict, q.currentAnswer.correct ? styles.hit : styles.miss)}>
                  {t(q.currentAnswer.correct ? quizLabels.hit : quizLabels.miss)}
                </b>
                {t(q.current.why)}
              </>
            )}
          </div>
        </>
      )}

      <Button
        variant="secondary"
        className={styles.next}
        onClick={q.next}
        disabled={!q.finished && !q.currentAnswer}
      >
        {t(nextLabel)}
      </Button>
    </Panel>
  )
}

export default GearQuiz
