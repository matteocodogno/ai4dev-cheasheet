import { LEVELS, type LevelId } from '../content'
import styles from './AgentsMdMission.module.css'

type Props = { id: LevelId; label: string; onPick: (id: LevelId) => void }

/** A highlighted AGENTS.md file in the tree; clicking it jumps to its level. */
const TreeFile = ({ id, label, onPick }: Props) => (
  <button
    type="button"
    className={styles.file}
    style={{ background: LEVELS.find((l) => l.id === id)?.color }}
    onClick={() => onPick(id)}
  >
    {label}
  </button>
)

export default TreeFile
