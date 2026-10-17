import Mission from '../../missions/components/Mission'
import { safetyCopy, SHIELDS } from '../content'
import { useIncidentSimulator } from '../hooks/useIncidentSimulator'
import IncidentPicker from './IncidentPicker'
import ShieldCard from './ShieldCard'
import styles from './ShieldCard.module.css'

const SafetyMission = () => {
  const sim = useIncidentSimulator()
  return (
    <Mission id="safety" copy={safetyCopy}>
      <IncidentPicker selected={sim.index} incident={sim.incident} onSelect={sim.select} />
      <div className={styles.grid}>
        {SHIELDS.map((s) => (
          <ShieldCard key={s.id} shield={s} outcome={sim.outcome(s.id)} />
        ))}
      </div>
    </Mission>
  )
}

export default SafetyMission
