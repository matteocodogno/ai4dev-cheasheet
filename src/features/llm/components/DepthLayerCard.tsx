import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { useT } from '@/i18n/useT'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { RichText } from '@/ui'

import type { DepthLayer } from '../content'
import styles from './LlmMission.module.css'
import NextTokenDemo from './NextTokenDemo'
import TransformerFlow from './TransformerFlow'

type Props = { layer: DepthLayer; level: number; justOpened: boolean }

const DepthLayerCard = ({ layer, level, justOpened }: Props) => {
  const t = useT()
  const ref = useRef<HTMLDivElement>(null)
  const body = t<string | readonly string[]>(layer.body)

  const reduced = useReducedMotion()

  useEffect(() => {
    if (justOpened) ref.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' })
  }, [justOpened, reduced])

  return (
    <div
      ref={ref}
      className={clsx(styles.layer, justOpened && styles.opening)}
      style={{ background: layer.background }}
    >
      <h3 className={styles.heading} style={{ color: layer.color }}>
        {t(layer.title)} <small className={styles.level}>LV {level}</small>
      </h3>
      {typeof body === 'string' ? (
        <p>
          <RichText text={body} />
        </p>
      ) : (
        <ul>
          {body.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      )}
      {layer.demo === 'next-token' && <NextTokenDemo />}
      {layer.demo === 'transformer' && <TransformerFlow />}
    </div>
  )
}

export default DepthLayerCard
