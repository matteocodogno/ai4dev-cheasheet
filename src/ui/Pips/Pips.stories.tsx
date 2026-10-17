import type { Meta, StoryObj } from '@storybook/react-vite'

import Pips from './Pips'

const meta = {
  title: 'UI/Pips',
  component: Pips,
  args: { states: ['good', 'bad', 'good', 'current', 'empty', 'empty', 'empty'] },
} satisfies Meta<typeof Pips>

export default meta
type Story = StoryObj<typeof meta>

export const QuizProgress: Story = {}
export const DepthMeter: Story = { args: { states: ['on', 'on', 'empty', 'empty', 'empty'] } }
