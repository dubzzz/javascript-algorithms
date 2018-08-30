import * as fc from 'fast-check';
import rabinKarp from '../rabinKarp';

describe('rabinKarp', () => {
  it('should find substring in a string', () => {
    expect(rabinKarp('', '')).toBe(0);
    expect(rabinKarp('a', '')).toBe(0);
    expect(rabinKarp('a', 'a')).toBe(0);
    expect(rabinKarp('ab', 'b')).toBe(1);
    expect(rabinKarp('abcbcglx', 'abca')).toBe(-1);
    expect(rabinKarp('abcbcglx', 'bcgl')).toBe(3);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15);
    expect(rabinKarp('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1);
    expect(rabinKarp('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca')).toBe(12);
    expect(rabinKarp('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa')).toBe(11);
    expect(rabinKarp('^ !/\'#\'pp', ' !/\'#\'pp')).toBe(1);
  });

  it('should work with bigger texts', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and '
    + 'typesetting industry. Lorem Ipsum has been the industry\'s standard '
    + 'dummy text ever since the 1500s, when an unknown printer took a '
    + 'galley of type and scrambled it to make a type specimen book. It '
    + 'has survived not only five centuries, but also the leap into '
    + 'electronic typesetting, remaining essentially unchanged. It was '
    + 'popularised in the 1960s with the release of Letraset sheets '
    + 'containing Lorem Ipsum passages, and more recently with desktop'
    + 'publishing software like Aldus PageMaker including versions of Lorem '
    + 'Ipsum.';

    expect(rabinKarp(text, 'Lorem')).toBe(0);
    expect(rabinKarp(text, 'versions')).toBe(549);
    expect(rabinKarp(text, 'versions of Lorem Ipsum.')).toBe(549);
    expect(rabinKarp(text, 'versions of Lorem Ipsum:')).toBe(-1);
    expect(rabinKarp(text, 'Lorem Ipsum passages, and more recently with')).toBe(446);
  });

  it('should work with UTF symbols', () => {
    expect(rabinKarp('a\u{ffff}', '\u{ffff}')).toBe(1);
    expect(rabinKarp('\u0000耀\u0000', '耀\u0000')).toBe(1);
    // @TODO: Provide Unicode support for characters outside of the BMP plan.
    // expect(rabinKarp('a\u{20000}', '\u{20000}')).toBe(1);
  });

  // Property:
  // for any s1, s2 strings and position = knuthMorrisPratt(s1, s2)
  // either position is -1 corresponding to a 'no match'
  // or position is such that s1[position : position + s2.length] === s2
  it('should either be a no match or a valid position [property]', () => fc.assert(
    fc.property(
      fc.unicodeString(), fc.unicodeString(),
      // @TODO: Provide Unicode support for characters outside of the BMP plan.
      // @TODO: Replace previous line by the one below:
      // fc.fullUnicodeString(), fc.fullUnicodeString(),
      (s1, s2) => {
        const position = rabinKarp(s1, s2);
        return position === -1 || s1.slice(position, position + s2.length) === s2;
      }
    )
  ));
  
  // Property:
  // for any a, b, c strings
  // b is a substring of a + b + c
  it('should find a match if `word` is substring of `text` [property]', () => fc.assert(
    fc.property(
      fc.unicodeString(), fc.unicodeString(), fc.unicodeString(),
      // @TODO: Provide Unicode support for characters outside of the BMP plan.
      // @TODO: Replace previous line by the one below:
      // fc.fullUnicodeString(), fc.fullUnicodeString(), fc.fullUnicodeString(),
      (a, b, c) => rabinKarp(a + b + c, b) !== -1
    )
  ));
});
