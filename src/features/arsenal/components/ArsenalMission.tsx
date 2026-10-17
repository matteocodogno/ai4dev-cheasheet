import Mission from '../../missions/components/Mission'
import { arsenalCopy, GEAR } from '../content'
import GearCard from './GearCard'
import styles from './GearCard.module.css'
import GearQuiz from './GearQuiz'

const ArsenalMission = () => (
  <Mission id="arsenal" copy={arsenalCopy}>
    <div className={styles.grid}>
      {GEAR.map((g) => (
        <GearCard key={g.name} gear={g} />
      ))}
    </div>
    <GearQuiz />
  </Mission>
)

export default ArsenalMission
