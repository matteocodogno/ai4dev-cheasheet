import { useT } from '@/i18n/useT'
import { useSelection } from '@/shared/hooks/useSelection'
import { Columns, ScenarioPicker } from '@/ui'

import Mission from '../../missions/components/Mission'
import { orchestrationCopy, orchestrationLabels, PATTERNS, SCENARIOS } from '../content'
import PatternCard from './PatternCard'

const OrchestrationMission = () => {
  const t = useT()
  const { index, item, select } = useSelection(SCENARIOS)
  return (
    <Mission id="orchestration" copy={orchestrationCopy}>
      <ScenarioPicker
        title={t(orchestrationLabels.title)}
        hint={t(orchestrationLabels.hint)}
        options={SCENARIOS.map((s) => t(s.what))}
        selected={index}
        onSelect={select}
        emptyText={t(orchestrationLabels.none)}
      >
        {item && (
          <>
            <b>{PATTERNS.find((p) => p.id === item.best)?.name}</b>
            {t(item.why)}
          </>
        )}
      </ScenarioPicker>
      <Columns>
        {PATTERNS.map((p) => (
          <PatternCard key={p.id} pattern={p} state={item ? (item.best === p.id ? 'on' : 'off') : 'idle'} />
        ))}
      </Columns>
      <p className="hint spaced">
        <a href={orchestrationLabels.sourceUrl} target="_blank" rel="noopener noreferrer">
          {t(orchestrationLabels.source)}
        </a>
      </p>
    </Mission>
  )
}

export default OrchestrationMission
