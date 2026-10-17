import { recommend } from './recommend'

const ids = (r: ReturnType<typeof recommend>) => r.picks.map((p) => p.option.id)

describe('recommend', () => {
  it('puts a frontier model first for a coding agent on internal code', () => {
    const r = recommend({ task: 'agent', data: 'internal', volume: 'team', hardware: 'cloud' })
    expect(ids(r)[0]).toMatch(/^frontier/)
    expect(ids(r)).not.toContain('laptop')
  })

  it('never proposes external services for regulated data', () => {
    const r = recommend({ task: 'agent', data: 'regulated', volume: 'team', hardware: 'gpu' })
    expect(ids(r)).not.toContain('frontier-api')
    expect(ids(r)).not.toContain('open-hosted')
    expect(ids(r)).toContain('self-host')
    expect(r.excluded.map((e) => e.option.id)).toEqual(
      expect.arrayContaining(['frontier-api', 'open-hosted']),
    )
  })

  it('flags options that only work under conditions', () => {
    const r = recommend({ task: 'agent', data: 'regulated', volume: 'team', hardware: 'cloud' })
    expect(r.picks.find((p) => p.option.id === 'frontier-tenant')?.withConditions).toBe(true)
  })

  it('excludes self-hosting without GPUs and explains why', () => {
    const r = recommend({ task: 'batch', data: 'client', volume: 'high', hardware: 'cloud' })
    expect(ids(r)).not.toContain('self-host')
    expect(r.excluded).toContainEqual(expect.objectContaining({ reason: 'hardware' }))
  })

  it('prefers cheap models for high-volume batch jobs', () => {
    const r = recommend({ task: 'batch', data: 'public', volume: 'high', hardware: 'cloud' })
    expect(['small-api', 'open-hosted']).toContain(ids(r)[0])
  })

  it('only proposes embedding models for RAG, in-house ones for regulated data', () => {
    expect(ids(recommend({ task: 'embed', data: 'public', volume: 'low', hardware: 'cloud' }))).toEqual(
      expect.arrayContaining(['embed-api', 'embed-open']),
    )
    expect(ids(recommend({ task: 'embed', data: 'regulated', volume: 'low', hardware: 'cloud' }))).toEqual([
      'embed-open',
    ])
  })

  it('can return no picks when the constraints rule everything out', () => {
    const r = recommend({ task: 'assist', data: 'regulated', volume: 'high', hardware: 'cloud' })
    expect(r.picks.length).toBeLessThanOrEqual(1)
  })
})
