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
  
  it('should find a valid word position [property]', () => {
    fc.assert(fc.property(fc.fullUnicodeString(), fc.fullUnicodeString(), (s1, s2) => {
      const position = knuthMorrisPratt(s1, s2);
      return position === -1 || s1.slice(position, position + s2.length) === s2;
    }));
  });
  
  it('should find a match [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(), fc.fullUnicodeString(), fc.fullUnicodeString(),
        (a, b, c) => knuthMorrisPratt(a + b + c, b) !== -1
      )
    );
  });
});
