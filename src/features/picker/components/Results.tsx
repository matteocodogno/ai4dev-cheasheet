import { useT } from '@/i18n/useT'

import { pickerLabels } from '../content'
import type { Result } from '../recommend'
import styles from './ResultCard.module.css'
import ResultCard from './ResultCard'

type Props = { result: Result }

const Results = ({ result }: Props) => {
  const t = useT()
  return (
    <div aria-live="polite">
      {result.picks.length === 0 ? (
        <p className={styles.none}>{t(pickerLabels.none)}</p>
      ) : (
        <div className={styles.list}>
          {result.picks.map((p, i) => (
            <ResultCard key={p.option.id} pick={p} rank={i} />
          ))}
        </div>
      )}
      {result.excluded.length > 0 && (
        <div className={styles.excluded}>
          <b>{t(pickerLabels.excluded)}</b>
          <ul>
            {result.excluded.map((e) => (
              <li key={e.option.id}>
                {t(e.option.name)}:{' '}
                {t(e.reason === 'data' ? pickerLabels.excludedData : pickerLabels.excludedHardware)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Results
