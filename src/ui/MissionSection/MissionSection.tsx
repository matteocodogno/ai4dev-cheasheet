import clsx from 'clsx'
import { useEffect, type CSSProperties, type ReactNode } from 'react'

import { useInViewOnce } from '@/shared/hooks/useInViewOnce'

import Badge from '../Badge/Badge'
import DoDont from '../DoDont/DoDont'
import RichText from '../RichText/RichText'
import styles from './MissionSection.module.css'

type Props = {
  id: string
  number: number
  title: string
  /** Lead paragraph; supports RichText markup (_marker_ uses the accent colour). */
  lead: string
  accent: string
  rarityLabel: string
  rarityColor: string
  dos: readonly string[]
  donts: readonly string[]
  /** Fired once, the first time the section scrolls into view. */
  onSeen?: (id: string) => void
  children?: ReactNode
}

/** One mission of the field manual: numbered heading, lead, body, closing Do / Don't block. */
const MissionSection = ({
  id,
  number,
  title,
  lead,
  accent,
  rarityLabel,
  rarityColor,
  dos,
  donts,
  onSeen,
  children,
}: Props) => {
  const { ref, inView } = useInViewOnce<HTMLElement>()

  useEffect(() => {
    if (inView) onSeen?.(id)
  }, [inView, id, onSeen])

  return (
    <section
      ref={ref}
      id={id}
      className={clsx(styles.mission, inView && styles.seen)}
      style={{ '--accent': accent } as CSSProperties}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.head}>
        <div className={styles.num} aria-hidden="true">
          {String(number).padStart(2, '0')}
        </div>
        <h2 className={styles.title} id={`${id}-title`}>
          {title}
        </h2>
        <Badge color={rarityColor}>{rarityLabel}</Badge>
      </div>
      <p className={styles.lead}>
        <RichText text={lead} />
      </p>
      {children}
      <DoDont dos={dos} donts={donts} />
    </section>
  )
}

export default MissionSection
