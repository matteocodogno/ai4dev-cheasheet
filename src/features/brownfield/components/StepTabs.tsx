import { useT } from '@/i18n/useT'
import { Chip } from '@/ui'

import { brownfieldLabels, STEPS } from '../content'
import styles from './StepTabs.module.css'

type Props = { selected: number; onSelect: (i: number) => void }

const StepTabs = ({ selected, onSelect }: Props) => {
  const t = useT()
  return (
    <div className={styles.tabs} role="group" aria-label={t(brownfieldLabels.step)}>
      {STEPS.map((s, i) => (
        <span key={i} className={styles.tab}>
          {i > 0 && <span className={styles.arrow}>→</span>}
          <Chip
            tone={i === selected ? 'selected' : i < selected ? 'good' : 'idle'}
            onClick={() => onSelect(i)}
          >
            {i + 1}. {t(s.name)}
          </Chip>
        </span>
      ))}
    </div>
  )
}

export default StepTabs
