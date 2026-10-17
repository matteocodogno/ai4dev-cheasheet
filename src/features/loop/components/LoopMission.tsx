import { useT } from '@/i18n/useT'
import { useAutoCycle } from '@/shared/hooks/useAutoCycle'
import { useInViewOnce } from '@/shared/hooks/useInViewOnce'
import { Panel, Terminal } from '@/ui'

import Mission from '../../missions/components/Mission'
import { KOTLIN_LOOP, loopCopy, STEPS } from '../content'
import KotlinCode from './KotlinCode'
import LoopDiagram from './LoopDiagram'
import styles from './LoopMission.module.css'

const LoopMission = () => {
  const t = useT()
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3)
  const { index, pick } = useAutoCycle(STEPS.length, inView, 3200)
  const step = STEPS[index] ?? STEPS[0]
  return (
    <Mission id="loop" copy={loopCopy}>
      <div className={styles.layout} ref={ref}>
        <LoopDiagram active={index} onPick={pick} />
        <div>
          {step && (
            <Panel tone="paper" aria-live="polite">
              <h3 className={styles.step} style={{ color: step.ink }}>
                {index + 1}. {t(step.title)}
              </h3>
              <p>{t(step.body)}</p>
            </Panel>
          )}
          <Terminal title="AgentLoop.kt" className="spaced">
            <KotlinCode source={KOTLIN_LOOP} />
          </Terminal>
        </div>
      </div>
    </Mission>
  )
}

export default LoopMission
