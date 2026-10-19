import type { Meta, StoryObj } from '@storybook/react-vite'

import HighlightCard from './HighlightCard'

const meta = {
  title: 'UI/HighlightCard',
  component: HighlightCard,
  args: {
    title: 'Orchestrator-workers',
    kicker: 'the plan is decided at runtime',
    color: 'var(--purple)',
    children: 'An orchestrator splits the task and hands pieces to workers with a clean context.',
  },
} satisfies Meta<typeof HighlightCard>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}
export const On: Story = { args: { state: 'on', stamp: 'MATCH' } }
export const Off: Story = { args: { state: 'off', stamp: 'NO' } }
