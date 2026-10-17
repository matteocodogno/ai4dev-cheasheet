import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { useInViewOnce } from '@/shared/hooks/useInViewOnce'

import { graphLabels } from '../content'
import styles from './WorktreeGraph.module.css'

const delay = (s: number) => ({ animationDelay: `${s}s` })

/** Branch graph that draws itself the first time it scrolls into view. */
const WorktreeGraph = () => {
  const t = useT()
  const { ref, inView } = useInViewOnce<SVGSVGElement>(0.3)
  return (
    <svg
      ref={ref}
      className={clsx(styles.svg, inView && styles.play)}
      viewBox="0 0 1000 300"
      role="img"
      aria-label={t(graphLabels.aria)}
    >
      <text x="20" y="40" className={styles.lbl} fill="#fff">
        main
      </text>
      <path className={styles.lane} d="M90 150 H960" stroke="#f6efe0" />
      <path
        className={styles.lane}
        style={delay(0.5)}
        d="M180 150 C 230 150, 230 60, 290 60 H 700 C 760 60, 760 150, 810 150"
        stroke="#2be0e8"
      />
      <path
        className={styles.lane}
        style={delay(0.8)}
        d="M200 150 C 250 150, 250 240, 310 240 H 620 C 680 240, 680 150, 730 150"
        stroke="#ff2e7e"
      />
      <circle className={styles.commit} cx="120" cy="150" r="11" fill="#f6efe0" />
      <g className={styles.later} style={delay(1.4)}>
        {[400, 520, 640].map((x) => (
          <circle key={x} className={styles.commit} cx={x} cy="60" r="11" fill="#2be0e8" />
        ))}
      </g>
      <g className={styles.later} style={delay(1.7)}>
        {[420, 540].map((x) => (
          <circle key={x} className={styles.commit} cx={x} cy="240" r="11" fill="#ff2e7e" />
        ))}
      </g>
      <g className={styles.later} style={delay(2.4)}>
        {[730, 810].map((x) => (
          <circle key={x} className={styles.commit} cx={x} cy="150" r="14" fill="#ffd21f" />
        ))}
      </g>
      <text x="300" y="38" className={styles.lbl} fill="#2be0e8">
        ../t4d-age · feat/age-filter
      </text>
      <text x="320" y="283" className={styles.lbl} fill="#ff2e7e">
        ../t4d-notif · feat/notifications
      </text>
      <text x="300" y="98" className={clsx(styles.agent, styles.later)} style={delay(1.6)} fill="#2be0e8">
        {t(graphLabels.agentA)}
      </text>
      <text x="320" y="218" className={clsx(styles.agent, styles.later)} style={delay(1.9)} fill="#ff2e7e">
        {t(graphLabels.agentB)}
      </text>
      <text x="690" y="190" className={clsx(styles.agent, styles.later)} style={delay(2.6)} fill="#ffd21f">
        {t(graphLabels.merge)}
      </text>
    </svg>
  )
}

export default WorktreeGraph
