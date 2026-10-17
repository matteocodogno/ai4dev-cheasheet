import { useT } from '@/i18n/useT'
import { Chip, Panel } from '@/ui'

import { INCIDENTS, incidentLabels, SHIELDS, type Incident } from '../content'
import styles from './IncidentPicker.module.css'

type Props = { selected: number | null; incident: Incident | null; onSelect: (i: number) => void }

const shieldName = (id: string) => SHIELDS.find((s) => s.id === id)?.name ?? id

const IncidentPicker = ({ selected, incident, onSelect }: Props) => {
  const t = useT()
  return (
    <Panel className={styles.panel} title={t(incidentLabels.title)}>
      <p className="hint">{t(incidentLabels.hint)}</p>
      <div className={styles.list}>
        {INCIDENTS.map((inc, i) => (
          <Chip
            key={i}
            className={styles.item}
            tone={i === selected ? 'selected' : 'idle'}
            onClick={() => onSelect(i)}
          >
            {t(inc.what)}
          </Chip>
        ))}
      </div>
      <div className={styles.result} aria-live="polite">
        {incident ? (
          <>
            <b className={styles.head}>
              {incident.savedBy.length
                ? `${t(incidentLabels.savedBy)}: ${incident.savedBy.map(shieldName).join(' + ')}`
                : t(incidentLabels.noShield)}
            </b>
            {t(incident.why)}
          </>
        ) : (
          <span className={styles.empty}>{t(incidentLabels.none)}</span>
        )}
      </div>
    </Panel>
  )
}

export default IncidentPicker
