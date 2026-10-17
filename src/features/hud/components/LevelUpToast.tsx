import { useLevelUpToast } from '../hooks/useLevelUpToast'
import styles from './LevelUpToast.module.css'

const LevelUpToast = () => {
  const key = useLevelUpToast()
  if (key === null) return null
  return (
    <div key={key} className={styles.toast} aria-hidden="true">
      LEVEL UP!
    </div>
  )
}

export default LevelUpToast
