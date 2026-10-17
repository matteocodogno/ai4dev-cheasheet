import clsx from 'clsx'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import styles from './Panel.module.css'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
  tone?: 'dark' | 'paper'
  title?: ReactNode
  /** Colour of the offset shadow (defaults to black). */
  shadowColor?: string
  /** Colour of the title (defaults to yellow on dark, magenta on paper). */
  titleColor?: string
  as?: 'div' | 'aside' | 'section'
}

const Panel = ({
  tone = 'dark',
  title,
  shadowColor,
  titleColor,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: Props) => (
  <Tag
    className={clsx(styles.panel, tone === 'paper' && styles.paper, className)}
    style={{ ...style, '--panel-shadow': shadowColor, '--panel-title': titleColor } as CSSProperties}
    {...rest}
  >
    {title !== undefined && <h3 className={styles.title}>{title}</h3>}
    {children}
  </Tag>
)

export default Panel
