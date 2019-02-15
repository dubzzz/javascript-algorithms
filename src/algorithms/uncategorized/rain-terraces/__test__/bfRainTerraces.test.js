import fc from 'fast-check';
import bfRainTerraces from '../bfRainTerraces';
import dpRainTerraces from '../dpRainTerraces';

describe('bfRainTerraces', () => {
  it('equivalent', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat()),
        walls => expect(bfRainTerraces(walls)).toEqual(dpRainTerraces(walls)),
      ),
    );
  });
  it('reverse', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat()),
        walls => expect(dpRainTerraces(walls)).toEqual(dpRainTerraces(walls.reverse())),
      ),
    );
  });
  it('sorted', () => {
    fc.assert(
      fc.property(
        fc.array(fc.nat()).map(walls => [...walls].sort((a, b) => a - b)),
        walls => expect(dpRainTerraces(walls)).toEqual(0),
      ),
    );
  });
  it('should find the amount of water collected after raining', () => {
    expect(bfRainTerraces([1])).toBe(0);
    expect(bfRainTerraces([1, 0])).toBe(0);
    expect(bfRainTerraces([0, 1])).toBe(0);
    expect(bfRainTerraces([0, 1, 0])).toBe(0);
    expect(bfRainTerraces([0, 1, 0, 0])).toBe(0);
    expect(bfRainTerraces([0, 1, 0, 0, 1, 0])).toBe(2);
    expect(bfRainTerraces([0, 2, 0, 0, 1, 0])).toBe(2);
    expect(bfRainTerraces([2, 0, 2])).toBe(2);
    expect(bfRainTerraces([2, 0, 5])).toBe(2);
    expect(bfRainTerraces([3, 0, 0, 2, 0, 4])).toBe(10);
    expect(bfRainTerraces([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    expect(bfRainTerraces([1, 1, 1, 1, 1])).toBe(0);
    expect(bfRainTerraces([1, 2, 3, 4, 5])).toBe(0);
    expect(bfRainTerraces([4, 1, 3, 1, 2, 1, 2, 1])).toBe(4);
    expect(bfRainTerraces([0, 2, 4, 3, 4, 2, 4, 0, 8, 7, 0])).toBe(7);
  });
});
