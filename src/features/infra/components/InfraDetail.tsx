import clsx from 'clsx'

import { useT } from '@/i18n/useT'
import { Badge, Panel } from '@/ui'

import { infraLabels, type InfraNode } from '../content'
import styles from './InfraDetail.module.css'

type Props = { node: InfraNode }

const InfraDetail = ({ node }: Props) => {
  const t = useT()
  return (
    <Panel as="aside" tone="paper" className={styles.detail} key={node.id} aria-live="polite">
      <Badge size="sm" color={node.color}>
        {t(node.kind)}
      </Badge>
      <h3 className={styles.name}>{node.label}</h3>
      <p>{t(node.desc)}</p>
      <p className={styles.flows}>
        <b>{t(infraLabels.flows)}:</b> {t(node.flow)}
      </p>
      <div className={clsx(styles.mini, styles.good)}>
        <b>Do</b>
        {t(node.do)}
      </div>
      <div className={clsx(styles.mini, styles.bad)}>
        <b>Don't</b>
        {t(node.dont)}
      </div>
    </Panel>
  )
}

export default InfraDetail
