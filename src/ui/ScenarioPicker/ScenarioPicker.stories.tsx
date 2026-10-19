import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import ScenarioPicker from './ScenarioPicker'

const OPTIONS = ['Rename a variable', 'Switch from REST to gRPC', 'Use jOOQ instead of JPA']

const Demo = () => {
  const [selected, setSelected] = useState<number | null>(1)
  return (
    <ScenarioPicker
      title="Is it worth an ADR?"
      hint="Pick a decision."
      options={OPTIONS}
      selected={selected}
      onSelect={setSelected}
      emptyText="Nothing selected."
    >
      <b>ADR</b>Hard to reverse and it crosses team boundaries.
    </ScenarioPicker>
  )
}

const meta = { title: 'UI/ScenarioPicker', component: Demo } satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
