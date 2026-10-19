import { useT } from '@/i18n/useT'
import { HighlightCard, RichText, type HighlightState } from '@/ui'

import { orchestrationLabels, type Pattern } from '../content'
import FlowChain from './FlowChain'
import styles from './PatternCard.module.css'

type Props = { pattern: Pattern; state: HighlightState }

const PatternCard = ({ pattern, state }: Props) => {
  const t = useT()
  return (
    <HighlightCard
      title={pattern.name}
      kicker={t(pattern.kind)}
      color={pattern.color}
      state={state}
      stamp={state === 'on' ? t(orchestrationLabels.match) : undefined}
    >
      <FlowChain flow={pattern.flow} />
      <p className={styles.body}>
        <RichText text={t(pattern.body)} />
      </p>
      <p className={styles.line}>
        <b>{t(orchestrationLabels.useFor)}:</b> {t(pattern.useFor)}
      </p>
      <p className={styles.cost}>
        <b>{t(orchestrationLabels.cost)}:</b> {t(pattern.cost)}
      </p>
    </HighlightCard>
  )
}

export default PatternCard
