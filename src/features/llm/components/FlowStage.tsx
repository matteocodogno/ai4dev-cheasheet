import clsx from 'clsx'
import type { CSSProperties } from 'react'

import styles from './TransformerFlow.module.css'

type Props = { label: string; color: string; pulse?: boolean }

const FlowStage = ({ label, color, pulse = false }: Props) => (
  <span className={clsx(styles.stage, pulse && styles.pulse)} style={{ '--stage': color } as CSSProperties}>
    {label}
  </span>
)

export default FlowStage
