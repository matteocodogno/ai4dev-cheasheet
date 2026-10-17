import type { Meta, StoryObj } from '@storybook/react-vite'

import Badge from './Badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  args: { children: 'Legendary', color: 'var(--rarity-legendary)' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Rarity: Story = {}
export const Small: Story = { args: { size: 'sm', children: 'BUFF', color: 'var(--green)' } }
