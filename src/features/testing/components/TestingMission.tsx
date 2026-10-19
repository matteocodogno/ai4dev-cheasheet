import { useT } from '@/i18n/useT'
import { Columns, Terminal, TerminalLines, linesToClipboard } from '@/ui'

import Mission from '../../missions/components/Mission'
import { KILL_PROMPT, testingCopy, testingLabels, TOOL_LINES } from '../content'
import CheatList from './CheatList'
import MutationLab from './MutationLab'

const TestingMission = () => {
  const t = useT()
  return (
    <Mission id="testing" copy={testingCopy}>
      <Columns>
        <CheatList />
        <Terminal title={t(testingLabels.prompt)} copyText={KILL_PROMPT} wrap>
          {KILL_PROMPT}
        </Terminal>
      </Columns>
      <div className="spaced">
        <MutationLab />
      </div>
      <div className="spaced">
        <Terminal title={t(testingLabels.tools)} copyText={linesToClipboard(TOOL_LINES)}>
          <TerminalLines lines={TOOL_LINES} />
        </Terminal>
      </div>
    </Mission>
  )
}

export default TestingMission
