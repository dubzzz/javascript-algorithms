import fc from 'fast-check';
import bfMaximumSubarray from '../bfMaximumSubarray';
import dpMaximumSubarray from '../dpMaximumSubarray';

describe('bfMaximumSubarray', () => {
  it('prop', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), 1, 10),
        fc.nat(9),
        fc.integer(1, 10),
        (data, rawStartIdx, size) => {
          const startIdx = rawStartIdx % data.length;
          const subData = data.slice(startIdx, startIdx + size);
          expect(bfMaximumSubarray(data).reduce((a, b) => a + b, 0))
            .toBeGreaterThanOrEqual(subData.reduce((a, b) => a + b, 0));
        },
      ),
    );
  });
  it('prop', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), 1, 10),
        (data) => {
          expect(bfMaximumSubarray(data)).toEqual(dpMaximumSubarray(data));
          expect(bfMaximumSubarray(data).reduce((a, b) => a + b, 0))
            .toEqual(dpMaximumSubarray(data).reduce((a, b) => a + b, 0));
        },
      ),
    );
  });
  it('should find maximum subarray using brute force algorithm', () => {
    expect(bfMaximumSubarray([])).toEqual([]);
    expect(bfMaximumSubarray([0, 0])).toEqual([0]);
    expect(bfMaximumSubarray([0, 0, 1])).toEqual([0, 0, 1]);
    expect(bfMaximumSubarray([0, 0, 1, 2])).toEqual([0, 0, 1, 2]);
    expect(bfMaximumSubarray([0, 0, -1, 2])).toEqual([2]);
    expect(bfMaximumSubarray([-1, -2, -3, -4, -5])).toEqual([-1]);
    expect(bfMaximumSubarray([1, 2, 3, 2, 3, 4, 5])).toEqual([1, 2, 3, 2, 3, 4, 5]);
    expect(bfMaximumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual([4, -1, 2, 1]);
    expect(bfMaximumSubarray([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual([4, -1, -2, 1, 5]);
    expect(bfMaximumSubarray([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual([7, 6, -1, 4, 11]);
  });
});
