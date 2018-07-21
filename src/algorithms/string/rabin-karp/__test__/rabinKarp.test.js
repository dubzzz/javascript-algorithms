import * as fc from 'fast-check';

import { rabinKarp, hashWord, reHashWord } from '../rabinKarp';

describe('rabinKarp', () => {
  it('should correctly calculates hash and re-hash', () => {
    expect(hashWord('a')).toBe(97);
    expect(hashWord('b')).toBe(98);
    expect(hashWord('abc')).toBe(941094);
    expect(hashWord('bcd')).toBe(950601);
    expect(reHashWord(hashWord('abc'), 'abc', 'bcd')).toBe(950601);
    expect(reHashWord(hashWord('abc'), 'abc', 'bcd')).toBe(hashWord('bcd'));
  });

  it('should find substring in a string', () => {
    expect(rabinKarp('abcbcglx', 'abca')).toBe(-1);
    expect(rabinKarp('abcbcglx', 'bcgl')).toBe(3);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(rabinKarp('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(rabinKarp('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
  });
  
  it('should find a valid word position [property]', () => {
    fc.assert(fc.property(fc.fullUnicodeString(), fc.fullUnicodeString(), (s1, s2) => {
      const position = rabinKarp(s1, s2);
      return position === -1 || s1.slice(position, position + s2.length) === s2;
    }));
  });
  
  it('should find a match [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(), fc.fullUnicodeString(), fc.fullUnicodeString(),
        (a, b, c) => rabinKarp(a + b + c, b) !== -1
      )
    );
  });
});
