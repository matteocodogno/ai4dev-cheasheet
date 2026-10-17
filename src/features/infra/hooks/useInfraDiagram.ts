import { useState } from 'react'

import { edgePath } from '../edgePath'
import { EDGES, NODE_H, NODE_W, NODES, type InfraNode, type InfraNodeId } from '../content'

export type InfraEdge = { key: string; d: string; color: string; highlighted: boolean }

const byId = new Map(NODES.map((n) => [n.id, n]))
const box = (n: InfraNode) => ({ x: n.x, y: n.y, w: NODE_W, h: NODE_H })

const PATHS = EDGES.map(([from, to]) => {
  const a = byId.get(from)
  const b = byId.get(to)
  if (!a || !b) throw new Error(`Bad edge ${from} -> ${to}`)
  return { from, to, d: edgePath(box(a), box(b)), color: a.color }
})

export const useInfraDiagram = (initial: InfraNodeId = 'harness') => {
  const [selectedId, setSelectedId] = useState<InfraNodeId>(initial)
  const selected = byId.get(selectedId) ?? (NODES[0] as InfraNode)
  const edges: InfraEdge[] = PATHS.map((p) => ({
    key: `${p.from}-${p.to}`,
    d: p.d,
    color: p.color,
    highlighted: p.from === selectedId || p.to === selectedId,
  }))
  return { nodes: NODES, edges, selected, select: setSelectedId }
}
