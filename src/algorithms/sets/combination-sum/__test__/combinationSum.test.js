import combinationSum from '../combinationSum';

describe('combinationSum', () => {
  /* it('prop', () => {
    fc.assert(
      fc.property(
        fc.set(fc.nat()),
        fc.nat(1000),
        (elements, target) => {
          const combinations = combinationSum(elements, target);
          const combinationsStr = combinations.map(arr => arr.join(','));
          expect([...new Set(combinationsStr)]).toEqual(combinationsStr); // no duplicates
          for (const comb of combinations) {
            expect(comb.reduce((a,b) => a+b, 0)).toBe(target);
          }
        }
      ), {verbose: 2}
    )
  }); */
  it('should find all combinations with specific sum', () => {
    expect(combinationSum([1], 4)).toEqual([
      [1, 1, 1, 1],
    ]);

    expect(combinationSum([2, 3, 6, 7], 7)).toEqual([
      [2, 2, 3],
      [7],
    ]);

    expect(combinationSum([2, 3, 5], 8)).toEqual([
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ]);

    expect(combinationSum([2, 5], 3)).toEqual([]);

    expect(combinationSum([], 3)).toEqual([]);
  });
});
