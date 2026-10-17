import AgentsMdMission from '../../agentsmd/components/AgentsMdMission'
import ArsenalMission from '../../arsenal/components/ArsenalMission'
import ContextMission from '../../context/components/ContextMission'
import InfraMission from '../../infra/components/InfraMission'
import LlmMission from '../../llm/components/LlmMission'
import LoopMission from '../../loop/components/LoopMission'
import OllamaMission from '../../ollama/components/OllamaMission'
import PickerMission from '../../picker/components/PickerMission'
import SafetyMission from '../../safety/components/SafetyMission'
import SandboxMission from '../../sandbox/components/SandboxMission'
import SddMission from '../../sdd/components/SddMission'
import TokensMission from '../../tokens/components/TokensMission'
import WeightsMission from '../../weights/components/WeightsMission'
import WorktreeMission from '../../worktree/components/WorktreeMission'

/** All missions in course order. The order here must match MISSIONS in registry.ts (numbering). */
const Missions = () => (
  <>
    <InfraMission />
    <LlmMission />
    <TokensMission />
    <WeightsMission />
    <PickerMission />
    <OllamaMission />
    <ContextMission />
    <ArsenalMission />
    <AgentsMdMission />
    <LoopMission />
    <SandboxMission />
    <SafetyMission />
    <WorktreeMission />
    <SddMission />
  </>
)

export default Missions
