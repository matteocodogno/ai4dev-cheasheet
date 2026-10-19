import { useT } from '@/i18n/useT'
import { useSelection } from '@/shared/hooks/useSelection'
import { Columns, RichText, ScenarioPicker } from '@/ui'

import Mission from '../../missions/components/Mission'
import { laneLabel, PULL_REQUESTS, reviewCopy, reviewLabels, TECHNIQUES } from '../content'
import TechniqueCard from './TechniqueCard'

const ReviewMission = () => {
  const t = useT()
  const { index, item, select } = useSelection(PULL_REQUESTS)
  return (
    <Mission id="review" copy={reviewCopy}>
      <ScenarioPicker
        title={t(reviewLabels.title)}
        hint={t(reviewLabels.hint)}
        options={PULL_REQUESTS.map((pr) => t(pr.what))}
        selected={index}
        onSelect={select}
        emptyText={t(reviewLabels.none)}
      >
        {item && (
          <>
            <b>{t(laneLabel[item.lane])}</b>
            <RichText text={t(item.why)} />
          </>
        )}
      </ScenarioPicker>
      <Columns>
        {TECHNIQUES.map((tech, i) => (
          <TechniqueCard
            key={tech.id}
            technique={tech}
            number={i + 1}
            state={item ? (item.use.includes(tech.id) ? 'on' : 'off') : 'idle'}
          />
        ))}
      </Columns>
    </Mission>
  )
}

export default ReviewMission
