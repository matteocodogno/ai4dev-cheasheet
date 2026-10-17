import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { onActivateKey } from '@/shared/utils/onActivateKey'

import { loopLabels, STEPS } from '../content'
import styles from './LoopDiagram.module.css'

type Props = { active: number; onPick: (i: number) => void }

const C = 220
const R = 150

const position = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}

/** The loop as a ring: a runner orbits continuously, each station is clickable. */
const LoopDiagram = ({ active, onPick }: Props) => {
  const t = useT()
  return (
    <svg className={styles.svg} viewBox="0 0 440 440" role="group" aria-label={t(loopLabels.diagram)}>
      <circle className={styles.track} cx={C} cy={C} r={R} />
      <circle className={clsx(styles.dashes, styles.orbit)} cx={C} cy={C} r={R} />
      <g className={styles.orbit}>
        <circle className={styles.runner} cx={C} cy={C - R} r={12} />
      </g>
      <text className={styles.center} x={C} y={212} textAnchor="middle">
        AGENT
      </text>
      <text className={styles.centerSub} x={C} y={242} textAnchor="middle">
        {t(loopLabels.untilDone)}
      </text>
      {STEPS.map((s, i) => {
        const { x, y } = position(i)
        return (
          <g
            key={i}
            className={clsx(styles.node, i === active && styles.on)}
            tabIndex={0}
            role="button"
            aria-label={t(s.title)}
            aria-pressed={i === active}
            onClick={() => onPick(i)}
            onKeyDown={onActivateKey(() => onPick(i))}
          >
            <circle cx={x + 4} cy={y + 4} r={46} fill="#000" />
            <circle className={styles.disc} cx={x} cy={y} r={46} fill={s.fill} />
            <text className={styles.label} x={x} y={y + 7} textAnchor="middle">
              {t(s.short)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default LoopDiagram
