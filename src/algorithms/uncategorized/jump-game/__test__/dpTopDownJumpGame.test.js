import * as fc from 'fast-check';
import dpTopDownJumpGame from '../dpTopDownJumpGame';
import backtrackingJumpGame from '../backtrackingJumpGame';

describe('dpTopDownJumpGame', () => {
  it('should solve Jump Game problem in top-down dynamic programming manner', () => {
    expect(dpTopDownJumpGame([1, 0])).toBe(true);
    expect(dpTopDownJumpGame([100, 0])).toBe(true);
    expect(dpTopDownJumpGame([2, 3, 1, 1, 4])).toBe(true);
    expect(dpTopDownJumpGame([1, 1, 1, 1, 1])).toBe(true);
    expect(dpTopDownJumpGame([1, 1, 1, 10, 1])).toBe(true);
    expect(dpTopDownJumpGame([1, 5, 2, 1, 0, 2, 0])).toBe(true);

    expect(dpTopDownJumpGame([1, 0, 1])).toBe(false);
    expect(dpTopDownJumpGame([3, 2, 1, 0, 4])).toBe(false);
    expect(dpTopDownJumpGame([0, 0, 0, 0, 0])).toBe(false);
    expect(dpTopDownJumpGame([5, 4, 3, 2, 1, 0, 0])).toBe(false);
  });
  // Property
  // for all array of positive integers
  // dpTopDownJumpGame and backtrackingJumpGame should give the same result
  it('should give the same answer as backtrackingJumpGame [property]', () => fc.assert(
    fc.property(
      fc.array(fc.nat(100), 100),
      arr => dpTopDownJumpGame(arr) === backtrackingJumpGame(arr)
    )
  ));
});
