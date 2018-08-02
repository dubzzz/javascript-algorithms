import * as fc from 'fast-check';
import bfMaximumSubarray from '../bfMaximumSubarray';

describe('bfMaximumSubarray', () => {
  it('should find maximum subarray using brute force algorithm', () => {
    expect(bfMaximumSubarray([])).toEqual([]);
    expect(bfMaximumSubarray([-1, -2, -3, -4, -5])).toEqual([-1]);
    expect(bfMaximumSubarray([1, 2, 3, 2, 3, 4, 5])).toEqual([1, 2, 3, 2, 3, 4, 5]);
    expect(bfMaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual([4, -1, 2, 1]);
    expect(bfMaximumSubarray([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual([4, -1, -2, 1, 5]);
    expect(bfMaximumSubarray([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual([7, 6, -1, 4, 11]);
  });
  it('should be the whole array for positive values [property]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(1, Number.MAX_SAFE_INTEGER)),
        arr => {
          expect(bfMaximumSubarray(arr)).toEqual(arr);
        }
      )
    );
  });
  it('should be a at least of sum [property]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()),
        fc.array(fc.integer(1, Number.MAX_SAFE_INTEGER), 1, 10),
        fc.array(fc.integer()),
        (beg, arr, end) => {
          const atLeastSum = arr.reduce((p,c) => p + c, 0);
          const maxSum = bfMaximumSubarray([...beg, ...arr, ...end]).reduce((p,c) => p + c, 0);
          return atLeastSum <= maxSum;
        }
      )
    );
  });
  /*it('should be a sub-array of the original one [property]', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), 1, 10),
        arr => {
          //expect(bfMaximumSubarray(arr)).to.toEqual(arr);
        }
      )
    );
  });*/
});
