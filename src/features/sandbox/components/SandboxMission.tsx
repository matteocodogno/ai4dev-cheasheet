import { useT } from '@/i18n/useT'
import { Columns, Panel, RichText } from '@/ui'

import Mission from '../../missions/components/Mission'
import { sandboxCopy, SIDES } from '../content'
import RiskMatrix from './RiskMatrix'

const SandboxMission = () => {
  const t = useT()
  return (
    <Mission id="sandbox" copy={sandboxCopy}>
      <Columns>
        {SIDES.map((side) => (
          <Panel key={side.color} title={t(side.title)} shadowColor={side.color} titleColor={side.color}>
            <ul>
              {t(side.items).map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </Columns>
      <RiskMatrix />
    </Mission>
  )
}

export default SandboxMission
