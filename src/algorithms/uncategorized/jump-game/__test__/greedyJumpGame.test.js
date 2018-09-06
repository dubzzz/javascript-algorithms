import * as fc from 'fast-check';
import greedyJumpGame from '../greedyJumpGame';
import backtrackingJumpGame from '../backtrackingJumpGame';

describe('greedyJumpGame', () => {
  it('should solve Jump Game problem in greedy manner', () => {
    expect(greedyJumpGame([1, 0])).toBe(true);
    expect(greedyJumpGame([100, 0])).toBe(true);
    expect(greedyJumpGame([2, 3, 1, 1, 4])).toBe(true);
    expect(greedyJumpGame([1, 1, 1, 1, 1])).toBe(true);
    expect(greedyJumpGame([1, 1, 1, 10, 1])).toBe(true);
    expect(greedyJumpGame([1, 5, 2, 1, 0, 2, 0])).toBe(true);

    expect(greedyJumpGame([1, 0, 1])).toBe(false);
    expect(greedyJumpGame([3, 2, 1, 0, 4])).toBe(false);
    expect(greedyJumpGame([0, 0, 0, 0, 0])).toBe(false);
    expect(greedyJumpGame([5, 4, 3, 2, 1, 0, 0])).toBe(false);
  });
  // Property
  // for all array of positive integers
  // greedyJumpGame and backtrackingJumpGame should give the same result
  it('should give the same answer as backtrackingJumpGame [property]', () => fc.assert(
    fc.property(
      fc.array(fc.nat(100), 100),
      arr => greedyJumpGame(arr) === backtrackingJumpGame(arr)
    )
  ));
});
