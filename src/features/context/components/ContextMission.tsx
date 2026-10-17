import { useT } from '@/i18n/useT'
import { Columns, Panel, RichText } from '@/ui'

import Mission from '../../missions/components/Mission'
import { compactCopy, composeCopy, contextCopy } from '../content'
import Loadout from './Loadout'

const ContextMission = () => {
  const t = useT()
  return (
    <Mission id="context" copy={contextCopy}>
      <Loadout />
      <Columns spaced>
        <Panel tone="paper" title={t(composeCopy.title)}>
          <ul>
            {t(composeCopy.items).map((item) => (
              <li key={item}>
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title={t(compactCopy.title)}>
          <p>
            <RichText text={t(compactCopy.intro)} />
          </p>
          <ul>
            {t(compactCopy.items).map((item) => (
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

export default ContextMission
