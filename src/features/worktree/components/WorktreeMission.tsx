import { useT } from '@/i18n/useT'
import { Columns, linesToClipboard, Panel, RichText, Terminal, TerminalLines } from '@/ui'

import Mission from '../../missions/components/Mission'
import { notIsolatedCopy, worktreeCopy, WT_LINES } from '../content'
import WorktreeGraph from './WorktreeGraph'

const WorktreeMission = () => {
  const t = useT()
  const lines = t(WT_LINES)
  return (
    <Mission id="worktree" copy={worktreeCopy}>
      <WorktreeGraph />
      <Columns spaced>
        <Terminal title="terminal" copyText={linesToClipboard(lines)}>
          <TerminalLines lines={lines} />
        </Terminal>
        <Panel tone="paper" title={t(notIsolatedCopy.title)}>
          <ul>
            {t(notIsolatedCopy.items).map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Panel>
      </Columns>
    </Mission>
  )
}

export default WorktreeMission
