import type { Preview } from '@storybook/react-vite'

import '../src/styles/fonts'
import '../src/styles/tokens.css'
import '../src/styles/global.css'

import LangProvider from '../src/i18n/LangProvider'
import type { Lang } from '../src/i18n/types'

const preview: Preview = {
  globalTypes: {
    lang: {
      description: 'Content language',
      toolbar: { title: 'Lang', icon: 'globe', items: ['it', 'en'], dynamicTitle: true },
    },
  },
  initialGlobals: { lang: 'it' },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, ctx) => (
      <LangProvider key={ctx.globals.lang as string} initialLang={ctx.globals.lang as Lang}>
        <Story />
      </LangProvider>
    ),
  ],
}

export default preview
