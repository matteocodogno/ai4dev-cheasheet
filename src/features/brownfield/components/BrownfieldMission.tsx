import { useT } from '@/i18n/useT'
import { useSelection } from '@/shared/hooks/useSelection'
import { Panel, Terminal, TerminalLines, linesToClipboard } from '@/ui'

import Mission from '../../missions/components/Mission'
import { brownfieldCopy, brownfieldLabels, HOTSPOT_LINES, STEPS } from '../content'
import StepPanel from './StepPanel'
import StepTabs from './StepTabs'

const BrownfieldMission = () => {
  const t = useT()
  const { index, item, select } = useSelection(STEPS, 0)
  return (
    <Mission id="brownfield" copy={brownfieldCopy}>
      <StepTabs selected={index ?? 0} onSelect={select} />
      {item && <StepPanel key={index} step={item} number={(index ?? 0) + 1} />}
      <div className="spaced">
        <Terminal title={t(brownfieldLabels.hotspots)} copyText={linesToClipboard(HOTSPOT_LINES)}>
          <TerminalLines lines={HOTSPOT_LINES} />
        </Terminal>
      </div>
      <Panel tone="paper" className="spaced">
        {t(brownfieldLabels.order)}
      </Panel>
    </Mission>
  )
}

export default BrownfieldMission
