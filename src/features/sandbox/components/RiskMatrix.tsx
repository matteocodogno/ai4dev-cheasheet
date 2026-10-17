import clsx from 'clsx'
import { Fragment } from 'react'

import { useT } from '@/i18n/useT'
import { RichText } from '@/ui'

import { MATRIX } from '../content'
import styles from './RiskMatrix.module.css'

/** 2x2: permissions (rows) against sandbox (columns). */
const RiskMatrix = () => {
  const t = useT()
  return (
    <div className={styles.matrix} role="table">
      <div role="row" style={{ display: 'contents' }}>
        <div className={clsx(styles.head, styles.corner)} role="columnheader" />
        {MATRIX.cols.map((c) => (
          <div key={c} className={styles.head} role="columnheader">
            {c}
          </div>
        ))}
      </div>
      {MATRIX.rows.map((row) => (
        <Fragment key={row.label.en}>
          <div role="row" style={{ display: 'contents' }}>
            <div className={styles.head} role="rowheader">
              {t(row.label)}
            </div>
            {row.cells.map((cell) => (
              <div key={cell.title.en} role="cell" style={{ background: cell.bg }}>
                <b className={styles.cellTitle} style={{ color: cell.color }}>
                  {t(cell.title)}
                </b>
                <RichText text={t(cell.body)} />
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default RiskMatrix
