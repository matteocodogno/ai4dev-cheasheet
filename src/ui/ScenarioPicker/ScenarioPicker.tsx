import clsx from 'clsx'
import type { ReactNode } from 'react'

import Chip from '../Chip/Chip'
import Panel from '../Panel/Panel'
import RichText from '../RichText/RichText'
import styles from './ScenarioPicker.module.css'

type Props = {
  title: ReactNode
  hint?: ReactNode
  options: readonly string[]
  selected: number | null
  onSelect: (index: number) => void
  /** Shown under the list when nothing is selected. */
  emptyText: ReactNode
  /** Verdict for the selected option. */
  children?: ReactNode
  /** Lay the options out as a wrapping row instead of a column. */
  inline?: boolean
  className?: string
}

/** A list of situations to pick from, with a paper verdict box underneath. */
const ScenarioPicker = ({
  title,
  hint,
  options,
  selected,
  onSelect,
  emptyText,
  children,
  inline = false,
  className,
}: Props) => (
  <Panel className={clsx(styles.panel, className)} title={title}>
    {hint && <p className="hint">{hint}</p>}
    <div className={clsx(styles.list, inline && styles.inline)}>
      {options.map((option, i) => (
        <Chip
          key={option}
          className={styles.item}
          tone={i === selected ? 'selected' : 'idle'}
          onClick={() => onSelect(i)}
        >
          <RichText text={option} />
        </Chip>
      ))}
    </div>
    <div className={styles.result} aria-live="polite">
      {selected === null ? <span className={styles.empty}>{emptyText}</span> : children}
    </div>
  </Panel>
)

export default ScenarioPicker
