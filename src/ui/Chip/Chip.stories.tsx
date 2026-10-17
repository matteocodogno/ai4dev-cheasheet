import type { Meta, StoryObj } from '@storybook/react-vite'

import Chip from './Chip'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  args: { children: 'MatchService.kt', meta: '5k', tone: 'idle' },
  argTypes: { tone: { control: 'inline-radio', options: ['idle', 'selected', 'good', 'bad'] } },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}
export const Selected: Story = { args: { tone: 'selected' } }
export const Good: Story = { args: { tone: 'good', meta: '5k ✓' } }
export const Bad: Story = { args: { tone: 'bad', children: 'The whole repository', meta: '140k ✗' } }
