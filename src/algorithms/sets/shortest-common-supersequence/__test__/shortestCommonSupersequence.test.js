import fc from 'fast-check';
import shortestCommonSupersequence from '../shortestCommonSupersequence';

describe('shortestCommonSupersequence', () => {
  it('prop 1', () => {
    fc.assert(
      fc.property(
        fc.array(fc.char()),
        fc.array(fc.char()),
        (a, b) => expect(shortestCommonSupersequence(a, b).length)
          .toBe(shortestCommonSupersequence(b, a).length),
      ),
    );
  });
  it('prop 2', () => {
    fc.assert(
      fc.property(
        fc.array(fc.char()),
        fc.array(fc.char()),
        (a, b) => {
          const c = shortestCommonSupersequence(a, b);
          let idxC = 0;
          for (let idx = 0; idx !== a.length; idx += 1) {
            idxC = c.slice(idxC).indexOf(a[idx]) + 1;
            if (idxC === 0) return false;
          }
          idxC = 0;
          for (let idx = 0; idx !== b.length; idx += 1) {
            idxC = c.slice(idxC).indexOf(b[idx]) + 1;
            if (idxC === 0) return false;
          }
          return true;
        },
      ),
    );
  });
  it('should find shortest common supersequence of two sequences', () => {
    // LCS (longest common subsequence) is empty
    expect(shortestCommonSupersequence(
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
    )).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);

    // LCS (longest common subsequence) is "EE"
    expect(shortestCommonSupersequence(
      ['G', 'E', 'E', 'K'],
      ['E', 'K', 'E'],
    )).toEqual(['G', 'E', 'K', 'E', 'K']);

    // LCS (longest common subsequence) is "GTAB"
    expect(shortestCommonSupersequence(
      ['A', 'G', 'G', 'T', 'A', 'B'],
      ['G', 'X', 'T', 'X', 'A', 'Y', 'B'],
    )).toEqual(['A', 'G', 'G', 'X', 'T', 'X', 'A', 'Y', 'B']);

    // LCS (longest common subsequence) is "BCBA".
    expect(shortestCommonSupersequence(
      ['A', 'B', 'C', 'B', 'D', 'A', 'B'],
      ['B', 'D', 'C', 'A', 'B', 'A'],
    )).toEqual(['A', 'B', 'D', 'C', 'A', 'B', 'D', 'A', 'B']);

    // LCS (longest common subsequence) is "BDABA".
    expect(shortestCommonSupersequence(
      ['B', 'D', 'C', 'A', 'B', 'A'],
      ['A', 'B', 'C', 'B', 'D', 'A', 'B', 'A', 'C'],
    )).toEqual(['A', 'B', 'C', 'B', 'D', 'C', 'A', 'B', 'A', 'C']);
  });
});
