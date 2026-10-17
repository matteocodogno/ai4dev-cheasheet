import Mission from '../../missions/components/Mission'
import { pickerCopy } from '../content'
import ModelPicker from './ModelPicker'

const PickerMission = () => (
  <Mission id="picker" copy={pickerCopy}>
    <ModelPicker />
  </Mission>
)

export default PickerMission
