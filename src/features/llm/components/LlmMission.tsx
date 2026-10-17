import { useT } from '@/i18n/useT'
import { Button, Pips } from '@/ui'

import Mission from '../../missions/components/Mission'
import { LAYERS, llmCopy, llmLabels } from '../content'
import { useDepth } from '../hooks/useDepth'
import DepthLayerCard from './DepthLayerCard'
import styles from './LlmMission.module.css'
import VideoSource from './VideoSource'

const LlmMission = () => {
  const t = useT()
  const { depth, canDig, canGoUp, dig, goUp } = useDepth(LAYERS.length)
  return (
    <Mission id="llm" copy={llmCopy}>
      <VideoSource />
      <div>
        {LAYERS.slice(0, depth).map((layer, i) => (
          <DepthLayerCard key={i} layer={layer} level={i + 1} justOpened={i > 0 && i === depth - 1} />
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.meter}>
          {t(llmLabels.depth)}
          <Pips
            states={LAYERS.map((_, i) => (i < depth ? 'on' : 'empty'))}
            label={`${depth} / ${LAYERS.length}`}
          />
        </div>
        <Button onClick={dig} disabled={!canDig}>
          {t(llmLabels.dig)}
        </Button>
        <Button variant="secondary" onClick={goUp} disabled={!canGoUp}>
          {t(llmLabels.up)}
        </Button>
      </div>
    </Mission>
  )
}

export default LlmMission
