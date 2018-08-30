import * as fc from 'fast-check';
import knuthMorrisPratt from '../knuthMorrisPratt';

describe('knuthMorrisPratt', () => {
  it('should find word position in given text', () => {
    expect(knuthMorrisPratt('', '')).toBe(0);
    expect(knuthMorrisPratt('a', '')).toBe(0);
    expect(knuthMorrisPratt('a', 'a')).toBe(0);
    expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1);
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });

  // Property:
  // for any s1, s2 strings and position = knuthMorrisPratt(s1, s2)
  // either position is -1 corresponding to a 'no match'
  // or position is such that s1[position : position + s2.length] === s2
  it('should either be a no match or a valid position [property]', () => fc.assert(
    fc.property(
      fc.fullUnicodeString(), fc.fullUnicodeString(),
      (s1, s2) => {
        const position = knuthMorrisPratt(s1, s2);
        return position === -1 || s1.slice(position, position + s2.length) === s2;
      }
    )
  ));
  
  // Property:
  // for any a, b, c strings
  // b is a substring of a + b + c
  it('should find a match if `word` is substring of `text` [property]', () => fc.assert(
    fc.property(
      fc.fullUnicodeString(), fc.fullUnicodeString(), fc.fullUnicodeString(),
      (a, b, c) => knuthMorrisPratt(a + b + c, b) !== -1
    )
  ));
});
