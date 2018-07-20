import * as fc from 'fast-check';

export const sortedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const reverseArr = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const notSortedArr = [15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19];
export const equalArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const negativeArr = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3];
export const negativeArrSorted = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20];

export class SortTester {
  static testSort(SortingClass) {
    const sorter = new SortingClass();

    expect(sorter.sort([])).toEqual([]);
    expect(sorter.sort([1])).toEqual([1]);
    expect(sorter.sort([1, 2])).toEqual([1, 2]);
    expect(sorter.sort([2, 1])).toEqual([1, 2]);
    expect(sorter.sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
    expect(sorter.sort(sortedArr)).toEqual(sortedArr);
    expect(sorter.sort(reverseArr)).toEqual(sortedArr);
    expect(sorter.sort(notSortedArr)).toEqual(sortedArr);
    expect(sorter.sort(equalArr)).toEqual(equalArr);
  }

  static testNegativeNumbersSort(SortingClass) {
    const sorter = new SortingClass();
    expect(sorter.sort(negativeArr)).toEqual(negativeArrSorted);
  }

  static testSortWithCustomComparator(SortingClass) {
    const callbacks = {
      compareCallback: (a, b) => {
        if (a.length === b.length) {
          return 0;
        }
        return a.length < b.length ? -1 : 1;
      },
    };

    const sorter = new SortingClass(callbacks);

    expect(sorter.sort([''])).toEqual(['']);
    expect(sorter.sort(['a'])).toEqual(['a']);
    expect(sorter.sort(['aa', 'a'])).toEqual(['a', 'aa']);
    expect(sorter.sort(['aa', 'q', 'bbbb', 'ccc'])).toEqual(['q', 'aa', 'ccc', 'bbbb']);
    expect(sorter.sort(['aa', 'aa'])).toEqual(['aa', 'aa']);
  }

  static testSortStability(SortingClass) {
    const callbacks = {
      compareCallback: (a, b) => {
        if (a.length === b.length) {
          return 0;
        }
        return a.length < b.length ? -1 : 1;
      },
    };

    const sorter = new SortingClass(callbacks);

    expect(sorter.sort(['bb', 'aa', 'c'])).toEqual(['c', 'bb', 'aa']);
    expect(sorter.sort(['aa', 'q', 'a', 'bbbb', 'ccc'])).toEqual(['q', 'a', 'aa', 'ccc', 'bbbb']);
  }

  static testAlgorithmTimeComplexity(SortingClass, arrayToBeSorted, numberOfVisits) {
    const visitingCallback = jest.fn();
    const callbacks = { visitingCallback };
    const sorter = new SortingClass(callbacks);

    sorter.sort(arrayToBeSorted);

    expect(visitingCallback).toHaveBeenCalledTimes(numberOfVisits);
  }

  static testPropertyKeepTheSameItems(SortingClass, positiveOnly) {
    const integerValue = positiveOnly ? fc.nat(1000) : fc.integer(-1000, 1000);
    const sorter = new SortingClass();
    const count = (tab, element) => tab.filter(v => v === element).length;
    fc.assert(
      fc.property(
        fc.array(integerValue),
        data => {
          const sorted = sorter.sort(data.slice(0));
          expect(sorted.length).toEqual(data.length);
          for (const item of data)
            expect(count(sorted, item)).toEqual(count(data, item));
        }
      )
    );
  }

  static testPropertyOrderedArray(SortingClass, positiveOnly) {
    const integerValue = positiveOnly ? fc.nat(1000) : fc.integer(-1000, 1000);
    const sorter = new SortingClass();
    fc.assert(
      fc.property(
        fc.array(integerValue),
        data => {
          const sorted = sorter.sort(data.slice(0));
          for (let idx = 1; idx < sorted.length; ++idx)
            expect(sorted[idx - 1]).toBeLessThanOrEqual(sorted[idx]);
        }
      )
    );
  }

  static testPropertyStability(SortingClass, positiveOnly) {
    const integerValue = positiveOnly ? fc.nat(1000) : fc.integer(-1000, 1000);
    const callbacksA = { compareCallback: (a, b) => a[0] - b[0] };
    const callbacksB = { compareCallback: (a, b) => a[1] - b[1] };
    const callbacksAB = { compareCallback: (a, b) => (a[1] - b[1]) || (a[0] - b[0]) };
    const sorterA = new SortingClass(callbacksA);
    const sorterB = new SortingClass(callbacksB);
    const sorterAB = new SortingClass(callbacksAB);
    fc.assert(
      fc.property(
        fc.array(fc.tuple(integerValue, integerValue)),
        data => {
          const singleSort = sorterAB.sort(data.slice(0));
          const sorted = sorterB.sort(sorterA.sort(data.slice(0)));
          expect(sorted).toEqual(singleSort);
        }
      )
    );
  }
}
