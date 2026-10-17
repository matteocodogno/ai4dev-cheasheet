import Mission from '../../missions/components/Mission'
import { infraCopy } from '../content'
import { useInfraDiagram } from '../hooks/useInfraDiagram'
import InfraDetail from './InfraDetail'
import InfraDiagram from './InfraDiagram'
import styles from './InfraMission.module.css'

const InfraMission = () => {
  const { nodes, edges, selected, select } = useInfraDiagram()
  return (
    <Mission id="infra" copy={infraCopy}>
      <div className={styles.layout}>
        <InfraDiagram nodes={nodes} edges={edges} selectedId={selected.id} onSelect={select} />
        <InfraDetail node={selected} />
      </div>
    </Mission>
  )
}

export default InfraMission
