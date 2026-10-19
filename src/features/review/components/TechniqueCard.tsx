import { useT } from '@/i18n/useT'
import { HighlightCard, type HighlightState } from '@/ui'

import { reviewLabels, type Technique } from '../content'
import styles from './TechniqueCard.module.css'

type Props = { technique: Technique; number: number; state: HighlightState }

const TechniqueCard = ({ technique, number, state }: Props) => {
  const t = useT()
  return (
    <HighlightCard
      title={`${number}. ${t(technique.name)}`}
      color={technique.color}
      state={state}
      stamp={state === 'on' ? t(reviewLabels.use) : undefined}
    >
      <p className={styles.body}>{t(technique.body)}</p>
      {technique.evidence && <p className={styles.evidence}>{t(technique.evidence)}</p>}
      <p className={styles.cost}>
        <b>{t(reviewLabels.cost)}:</b> {t(technique.cost)}
      </p>
    </HighlightCard>
  )
}

export default TechniqueCard
