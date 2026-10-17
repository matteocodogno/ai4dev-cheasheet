import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import { MISSIONS } from './features/missions/registry'

beforeAll(() => {
  // jsdom lacks these browser APIs used by the effects
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true, // reduced motion: no animations, no canvas
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
  window.IntersectionObserver = class {
    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()
    takeRecords = vi.fn()
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver
  Element.prototype.scrollIntoView = vi.fn()
})

beforeEach(() => {
  window.history.replaceState(null, '', '/?lang=it')
  localStorage.clear()
})

describe('App', () => {
  it('renders every mission in Italian', () => {
    render(<App />)
    const nav = screen.getByRole('navigation')
    expect(within(nav).getAllByRole('link')).toHaveLength(MISSIONS.length)
    expect(screen.getByRole('heading', { name: 'La mappa del territorio' })).toBeInTheDocument()
  })

  it('switches to English and remembers the choice', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: 'Map of the territory' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(localStorage.getItem('ai4dev-lang')).toBe('en')
    expect(window.location.search).toContain('lang=en')
  })

  it('opens the next LLM layer when digging', async () => {
    render(<App />)
    expect(screen.queryByText('Prossimo token')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Scava più a fondo' }))
    expect(screen.getByText('Prossimo token')).toBeInTheDocument()
  })
})
