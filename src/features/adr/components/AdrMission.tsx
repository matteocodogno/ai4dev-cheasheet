import { useT } from '@/i18n/useT'
import { useSelection } from '@/shared/hooks/useSelection'
import { Columns, ScenarioPicker, Terminal } from '@/ui'

import Mission from '../../missions/components/Mission'
import SpecCode from '../../sdd/components/SpecCode'
import { ADR_PROMPT, ADR_TEMPLATE, adrCopy, adrLabels, DECISIONS, verdictLabel } from '../content'
import AdrLifecycle from './AdrLifecycle'

const AdrMission = () => {
  const t = useT()
  const { index, item, select } = useSelection(DECISIONS)
  return (
    <Mission id="adr" copy={adrCopy}>
      <ScenarioPicker
        title={t(adrLabels.pickerTitle)}
        hint={t(adrLabels.pickerHint)}
        options={DECISIONS.map((d) => t(d.what))}
        selected={index}
        onSelect={select}
        emptyText={t(adrLabels.none)}
      >
        {item && (
          <>
            <b>{t(verdictLabel[item.verdict])}</b>
            {t(item.why)}
          </>
        )}
      </ScenarioPicker>
      <Columns>
        <Terminal title={`docs/adr/0007-jooq.md · ${t(adrLabels.template)}`} copyText={ADR_TEMPLATE} wrap>
          <SpecCode source={ADR_TEMPLATE} />
        </Terminal>
        <Terminal title={t(adrLabels.prompt)} copyText={ADR_PROMPT} wrap>
          {ADR_PROMPT}
        </Terminal>
      </Columns>
      <AdrLifecycle />
    </Mission>
  )
}

export default AdrMission
