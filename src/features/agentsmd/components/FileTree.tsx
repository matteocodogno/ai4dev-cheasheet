import { useT } from '@/i18n/useT'

import { treeCopy, type LevelId } from '../content'
import styles from './AgentsMdMission.module.css'
import TreeFile from './TreeFile'

type Props = { onPick: (id: LevelId) => void }

/** The project tree with the three AGENTS.md files as buttons. */
const FileTree = ({ onPick }: Props) => {
  const t = useT()
  return (
    <pre className={styles.tree}>
      <TreeFile id="home" label="~/.config/opencode/AGENTS.md" onPick={onPick} />
      {'   '}
      {t(treeCopy.or)}
      {'\ntinder4dogs/\n├── '}
      <TreeFile id="proj" label="AGENTS.md" onPick={onPick} />
      {'\n├── CLAUDE.md          '}
      {t(treeCopy.importNote)}
      {'\n├── pom.xml\n├── matching/\n│   ├── '}
      <TreeFile id="mod" label="AGENTS.md" onPick={onPick} />
      {'\n│   └── src/...\n└── notifications/\n    └── src/...'}
    </pre>
  )
}

export default FileTree
