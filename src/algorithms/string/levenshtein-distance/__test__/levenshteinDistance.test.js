import * as fc from 'fast-check';
import levenshteinDistance from '../levenshteinDistance';

describe('levenshteinDistance', () => {
  it('should calculate edit distance between two strings', () => {
    expect(levenshteinDistance('', '')).toBe(0);
    expect(levenshteinDistance('a', '')).toBe(1);
    expect(levenshteinDistance('', 'a')).toBe(1);
    expect(levenshteinDistance('abc', '')).toBe(3);
    expect(levenshteinDistance('', 'abc')).toBe(3);

    // Should just add I to the beginning.
    expect(levenshteinDistance('islander', 'slander')).toBe(1);

    // Needs to substitute M by K, T by M and add an A to the end
    expect(levenshteinDistance('mart', 'karma')).toBe(3);

    // Substitute K by S, E by I and insert G at the end.
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3);

    // Should add 4 letters FOOT at the beginning.
    expect(levenshteinDistance('ball', 'football')).toBe(4);

    // Should delete 4 letters FOOT at the beginning.
    expect(levenshteinDistance('football', 'foot')).toBe(4);

    // Needs to substitute the first 5 chars: INTEN by EXECU
    expect(levenshteinDistance('intention', 'execution')).toBe(5);
  });

  // Property:
  // for any a, b strings
  // levenshteinDistance(a, b) should be equal to levenshteinDistance(b, a)
  it('should be symmetric [property]', () => fc.assert(
    fc.property(
      fc.fullUnicodeString(), fc.fullUnicodeString(),
      (a, b) => levenshteinDistance(a, b) === levenshteinDistance(b, a)
    )
  ));

  // Property:
  // for any aBegin, aEnd, bBegin, bEnd, common strings
  // levenshteinDistance(
  //     aBegin + common + aEnd,
  //     bBegin + common + bEnd,
  //   ) <= Math.max(aBegin.length, bBegin.length) + Math.max(aEnd.length, bEnd.length)
  it('should not consider common string in the difference [property]', () => fc.assert(
    fc.property(
      fc.fullUnicodeString(), fc.fullUnicodeString(),
      fc.fullUnicodeString(), fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      (aBegin, aEnd, bBegin, bEnd, common) =>
        levenshteinDistance(aBegin + common + aEnd, bBegin + common + bEnd)
          <= Math.max([...aBegin].length, [...bBegin].length) + Math.max([...aEnd].length, [...bEnd].length)
    )
  ));
});
