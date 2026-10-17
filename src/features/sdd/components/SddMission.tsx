import { useT } from '@/i18n/useT'
import { useAutoCycle } from '@/shared/hooks/useAutoCycle'
import { useInViewOnce } from '@/shared/hooks/useInViewOnce'
import { Columns, Panel, Terminal } from '@/ui'

import Mission from '../../missions/components/Mission'
import { sddCopy, SPEC_EXAMPLE, STAGES } from '../content'
import Pipeline from './Pipeline'
import SpecCode from './SpecCode'

const SddMission = () => {
  const t = useT()
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3)
  const { index, pick } = useAutoCycle(STAGES.length, inView, 2600)
  const stage = STAGES[index]
  return (
    <Mission id="sdd" copy={sddCopy}>
      <div ref={ref}>
        <Pipeline active={index} onPick={pick} />
      </div>
      <Columns spaced>
        {stage && (
          <Panel tone="paper" title={`${stage.name}: ${t(stage.tagline).toLowerCase()}`} aria-live="polite">
            <p>{t(stage.body)}</p>
          </Panel>
        )}
        <Terminal title="specs/004-age-filter/spec.md" wrap>
          <SpecCode source={t(SPEC_EXAMPLE)} />
        </Terminal>
      </Columns>
    </Mission>
  )
}

export default SddMission
