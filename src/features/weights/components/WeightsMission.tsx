import { useT } from '@/i18n/useT'
import { Columns, Panel, RichText } from '@/ui'

import Mission from '../../missions/components/Mission'
import { SIDES, trapCopy, weightsCopy } from '../content'

const WeightsMission = () => {
  const t = useT()
  return (
    <Mission id="weights" copy={weightsCopy}>
      <Columns>
        {SIDES.map((side) => (
          <Panel key={side.title} title={side.title} shadowColor={side.color} titleColor={side.color}>
            {t(side.paragraphs).map((p) => (
              <p key={p}>
                <RichText text={p} />
              </p>
            ))}
          </Panel>
        ))}
      </Columns>
      <Panel tone="paper" title={t(trapCopy.title)} style={{ marginTop: 24 }}>
        <p>{t(trapCopy.body)}</p>
      </Panel>
    </Mission>
  )
}

export default WeightsMission
