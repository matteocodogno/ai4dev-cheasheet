import type { Meta, StoryObj } from '@storybook/react-vite'

import Panel from '../Panel/Panel'
import MissionSection from './MissionSection'

const meta = {
  title: 'UI/MissionSection',
  component: MissionSection,
  parameters: { layout: 'fullscreen' },
  args: {
    id: 'm-demo',
    number: 7,
    title: 'The arsenal',
    lead: 'Seven tools that look alike. The right question: _who triggers it, and when?_',
    accent: 'var(--purple)',
    rarityLabel: 'Epic',
    rarityColor: 'var(--rarity-epic)',
    dos: ['What **must** always happen goes in a hook.'],
    donts: ['Writing "ALWAYS run ktlint" in `AGENTS.md` and hoping.'],
    children: <Panel title="Body">Mission content goes here.</Panel>,
  },
} satisfies Meta<typeof MissionSection>

export default meta

export const Default: StoryObj<typeof meta> = {}
