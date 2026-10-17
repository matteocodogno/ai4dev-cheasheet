import clsx from 'clsx'
import { useT } from '@/i18n/useT'
import { onActivateKey } from '@/shared/utils/onActivateKey'
import { Panel } from '@/ui'

import { infraLabels, NODE_H, NODE_W, ZONES, type InfraNode, type InfraNodeId } from '../content'
import type { InfraEdge } from '../hooks/useInfraDiagram'
import FitText from './FitText'
import styles from './InfraDiagram.module.css'

type Props = {
  nodes: readonly InfraNode[]
  edges: readonly InfraEdge[]
  selectedId: InfraNodeId
  onSelect: (id: InfraNodeId) => void
}

/** Clickable architecture map. Data flows are animated dashes; the selected node's edges speed up. */
const InfraDiagram = ({ nodes, edges, selectedId, onSelect }: Props) => {
  const t = useT()
  return (
    <Panel className={styles.wrap}>
      <svg className={styles.svg} viewBox="0 0 1100 660" role="group" aria-label={t(infraLabels.diagram)}>
        {ZONES.map((z) => (
          <g key={z.x}>
            <rect className={styles.zone} x={z.x} y={z.y} width={z.w} height={z.h} stroke={z.color} />
            <text className={styles.zoneLabel} x={z.x + 6} y={z.y - 7} fill={z.color.slice(0, 7)}>
              {t(z.label)}
            </text>
          </g>
        ))}
        <g>
          {edges.map((e, i) => (
            <g key={e.key}>
              <path className={styles.edge} d={e.d} />
              <path
                className={clsx(styles.flow, e.highlighted && styles.hl)}
                d={e.d}
                stroke={e.color}
                style={{ animationDelay: `${-(i % 7) / 7}s` }}
              />
            </g>
          ))}
        </g>
        <g>
          {nodes.map((n) => (
            <g
              key={n.id}
              className={clsx(styles.node, n.id === selectedId && styles.active)}
              tabIndex={0}
              role="button"
              aria-label={n.label}
              aria-pressed={n.id === selectedId}
              onClick={() => onSelect(n.id)}
              onKeyDown={onActivateKey(() => onSelect(n.id))}
            >
              <rect className={styles.shadow} x={n.x + 6} y={n.y + 6} width={NODE_W} height={NODE_H} />
              <rect className={styles.body} x={n.x} y={n.y} width={NODE_W} height={NODE_H} fill={n.color} />
              <FitText
                className={styles.label}
                x={n.x + 10}
                y={n.y + 28}
                text={n.label}
                maxWidth={NODE_W - 18}
              />
              <FitText
                className={styles.sub}
                x={n.x + 10}
                y={n.y + 49}
                text={t(n.sub)}
                maxWidth={NODE_W - 18}
              />
            </g>
          ))}
        </g>
      </svg>
    </Panel>
  )
}

export default InfraDiagram
