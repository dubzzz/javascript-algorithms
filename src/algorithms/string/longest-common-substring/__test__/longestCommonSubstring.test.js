import * as fc from 'fast-check';
import longestCommonSubstring from '../longestCommonSubstring';

describe('longestCommonSubstring', () => {
  it('should find longest common substring between two strings', () => {
    expect(longestCommonSubstring('', '')).toBe('');
    expect(longestCommonSubstring('ABC', '')).toBe('');
    expect(longestCommonSubstring('', 'ABC')).toBe('');
    expect(longestCommonSubstring('ABABC', 'BABCA')).toBe('BABC');
    expect(longestCommonSubstring('BABCA', 'ABCBA')).toBe('ABC');
  });
  it('should find same length whatever the ordering of parameters [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        (s1, s2) => longestCommonSubstring(s1, s2).length === longestCommonSubstring(s2, s1).length
      )
    );
  });
  it('should be a substring of both strings [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        (s1, s2) => {
          const longest = longestCommonSubstring(s1, s2);
          return s1.includes(longest) && s2.includes(longest);
        }
      )
    );
  });
  it('should find the substring when its the whole string [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        (s, prefix, suffix) => longestCommonSubstring(prefix + s + suffix, s) === s
      )
    );
  });
  it('should find a substring greater or equal to the one we know [property]', () => {
    fc.assert(
      fc.property(
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        fc.fullUnicodeString(),
        (s, prefix1, suffix1, prefix2, suffix2) => {
          const s1 = prefix1 + s + suffix1;
          const s2 = prefix2 + s + suffix2;
          const match = longestCommonSubstring(s1, s2);
          return [...s].length <= [...match].length;
        }
      )
    );
  });
});
it('should find the longest common when two distinct areas match [property]', () => {
  fc.assert(
    fc.property(
      fc.fullUnicodeString(1, 10),
      fc.fullUnicodeString(1, 10),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      fc.fullUnicodeString(),
      (c1, c2, prefix1, mid1, suffix1, prefix2, mid2, suffix2) => {
        const s1 = prefix1 + c1 + mid1 + c2 + suffix1;
        const s2 = prefix2 + c1 + mid2 + c2 + suffix2;
        const match = longestCommonSubstring(s1, s2);
        return Math.max([...c1].length, [...c2].length) <= [...match].length;
      }
    )
  );
});
