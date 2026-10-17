import type { Meta, StoryObj } from '@storybook/react-vite'

import Stat from './Stat'

const meta = {
  title: 'UI/Stat',
  component: Stat,
  args: { label: 'estimated tokens', value: 36 },
} satisfies Meta<typeof Stat>

export default meta

export const Default: StoryObj<typeof meta> = {}
