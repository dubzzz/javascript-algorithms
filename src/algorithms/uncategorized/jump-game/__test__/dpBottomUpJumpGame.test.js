import * as fc from 'fast-check';
import dpBottomUpJumpGame from '../dpBottomUpJumpGame';
import backtrackingJumpGame from '../backtrackingJumpGame';

describe('dpBottomUpJumpGame', () => {
  it('should solve Jump Game problem in bottom-up dynamic programming manner', () => {
    expect(dpBottomUpJumpGame([1, 0])).toBe(true);
    expect(dpBottomUpJumpGame([100, 0])).toBe(true);
    expect(dpBottomUpJumpGame([2, 3, 1, 1, 4])).toBe(true);
    expect(dpBottomUpJumpGame([1, 1, 1, 1, 1])).toBe(true);
    expect(dpBottomUpJumpGame([1, 1, 1, 10, 1])).toBe(true);
    expect(dpBottomUpJumpGame([1, 5, 2, 1, 0, 2, 0])).toBe(true);

    expect(dpBottomUpJumpGame([1, 0, 1])).toBe(false);
    expect(dpBottomUpJumpGame([3, 2, 1, 0, 4])).toBe(false);
    expect(dpBottomUpJumpGame([0, 0, 0, 0, 0])).toBe(false);
    expect(dpBottomUpJumpGame([5, 4, 3, 2, 1, 0, 0])).toBe(false);
  });
  // Property
  // for all array of positive integers
  // dpBottomUpJumpGame and backtrackingJumpGame should give the same result
  it('should give the same answer as backtrackingJumpGame [property]', () => fc.assert(
    fc.property(
      fc.array(fc.nat(100), 100),
      arr => dpBottomUpJumpGame(arr) === backtrackingJumpGame(arr)
    )
  ));
});
