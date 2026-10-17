import { useT } from '@/i18n/useT'
import { Chip } from '@/ui'

import type { Answers, Question, QuestionId } from '../content'
import styles from './ModelPicker.module.css'

type Props = { question: Question; answers: Answers; onAnswer: (id: QuestionId, value: string) => void }

/** One question of the wizard: big title and a grid of choice cards. */
const QuestionStep = ({ question, answers, onAnswer }: Props) => {
  const t = useT()
  const current = answers[question.id]
  return (
    <div key={question.id}>
      <h3 className={styles.question}>{t(question.title)}</h3>
      <div className={styles.choices} role="group" aria-label={t(question.title)}>
        {question.choices.map((c) => (
          <Chip
            key={c.value}
            className={styles.choice}
            tone={current === c.value ? 'selected' : 'idle'}
            onClick={() => onAnswer(question.id, c.value)}
          >
            {t(c.label)}
            <span className={styles.hintText}>{t(c.hint)}</span>
          </Chip>
        ))}
      </div>
    </div>
  )
}

export default QuestionStep
