import type { Meta, StoryObj } from '@storybook/react-vite'

import DoDont from './DoDont'

const meta = {
  title: 'UI/DoDont',
  component: DoDont,
  args: {
    dos: ['Always go through a gateway (**LiteLLM**).', 'Pin the model tag (`qwen2.5-coder:7b`).'],
    donts: ['Provider API keys on developer laptops.', 'Exposing port `11434` on the network.'],
  },
} satisfies Meta<typeof DoDont>

export default meta

export const Default: StoryObj<typeof meta> = {}
