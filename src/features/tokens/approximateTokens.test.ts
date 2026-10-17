import { approximateTokens } from './approximateTokens'

describe('approximateTokens', () => {
  it('splits camelCase and punctuation', () => {
    expect(approximateTokens('findByBreed(dog)')).toEqual(['find', 'By', 'Breed', '(', 'dog', ')'])
  })

  it('keeps leading whitespace attached to the next token', () => {
    expect(approximateTokens('a cat')).toEqual(['a', ' cat'])
  })

  it('chunks long words every five letters', () => {
    expect(approximateTokens('repository')).toEqual(['repos', 'itory'])
  })

  it('round-trips the original text', () => {
    const text = 'fun findMatches(dog: Dog): List<Match> =\n  repository.findByBreed(dog.breed)  '
    expect(approximateTokens(text).join('')).toBe(text)
  })
})
