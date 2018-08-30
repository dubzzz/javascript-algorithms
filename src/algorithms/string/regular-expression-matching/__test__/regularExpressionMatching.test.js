import * as fc from 'fast-check';
import regularExpressionMatching from '../regularExpressionMatching';

describe('regularExpressionMatching', () => {
  it('should match regular expressions in a string', () => {
    expect(regularExpressionMatching('', '')).toBe(true);
    expect(regularExpressionMatching('a', 'a')).toBe(true);
    expect(regularExpressionMatching('aa', 'aa')).toBe(true);
    expect(regularExpressionMatching('aab', 'aab')).toBe(true);
    expect(regularExpressionMatching('aab', 'aa.')).toBe(true);
    expect(regularExpressionMatching('aab', '.a.')).toBe(true);
    expect(regularExpressionMatching('aab', '...')).toBe(true);
    expect(regularExpressionMatching('a', 'a*')).toBe(true);
    expect(regularExpressionMatching('aaa', 'a*')).toBe(true);
    expect(regularExpressionMatching('aaab', 'a*b')).toBe(true);
    expect(regularExpressionMatching('aaabb', 'a*b*')).toBe(true);
    expect(regularExpressionMatching('aaabb', 'a*b*c*')).toBe(true);
    expect(regularExpressionMatching('', 'a*')).toBe(true);
    expect(regularExpressionMatching('xaabyc', 'xa*b.c')).toBe(true);
    expect(regularExpressionMatching('aab', 'c*a*b*')).toBe(true);
    expect(regularExpressionMatching('mississippi', 'mis*is*.p*.')).toBe(true);
    expect(regularExpressionMatching('ab', '.*')).toBe(true);

    expect(regularExpressionMatching('', 'a')).toBe(false);
    expect(regularExpressionMatching('a', '')).toBe(false);
    expect(regularExpressionMatching('aab', 'aa')).toBe(false);
    expect(regularExpressionMatching('aab', 'baa')).toBe(false);
    expect(regularExpressionMatching('aabc', '...')).toBe(false);
    expect(regularExpressionMatching('aaabbdd', 'a*b*c*')).toBe(false);
    expect(regularExpressionMatching('mississippi', 'mis*is*p*.')).toBe(false);
    expect(regularExpressionMatching('ab', 'a*')).toBe(false);
    expect(regularExpressionMatching('abba', 'a*b*.c')).toBe(false);
    expect(regularExpressionMatching('abba', '.*c')).toBe(false);
  });

  // Property:
  // for any text, pattern strings
  // where pattern is a valid regex pattern
  //   and text is built such that it matches pattern
  // there should be a match
  it('should match on any valid (text, pattern) pairs [property]', () => {
    // Generator of valid characters for our regex
    const oneCharacterArb = fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz");
    // Generator of valid pattern structures
    const patternStructureArb = fc.array(fc.oneof(
        fc.record({ // pattern: a, text: a
          type: fc.constant('singleExact'),
          value: oneCharacterArb
        }),
        fc.record({ // pattern: ., text: a
          type: fc.constant('singleAny'),
          value: oneCharacterArb
        }),
        fc.record({ // pattern: a*, text: aaa
          type: fc.constant('multiExact'),
          value: oneCharacterArb,
          num: fc.nat(10)
        }),
        fc.record({ // pattern: .*, text: abc
          type: fc.constant('multiAny'),
          value: fc.stringOf(oneCharacterArb)
        }),
    ));
    // Generator of {text: string, pattern: string}
    // where text is built such that it matches pattern
    const patternAndTextArb = patternStructureArb.map(conf => {
        return {
            text: conf.map(v => {
                if (v.type === 'singleExact') return v.value;
                if (v.type === 'singleAny') return v.value;
                if (v.type === 'multiExact') return v.value.repeat(v.num);
                if (v.type === 'multiAny') return v.value;
            }).join(''),
            pattern: conf.map(v => {
                if (v.type === 'singleExact') return v.value;
                if (v.type === 'singleAny') return '.';
                if (v.type === 'multiExact') return v.value + '*';
                if (v.type === 'multiAny') return '.*';
            }).join('')
        };
    });
    fc.assert(
      fc.property(
        patternAndTextArb,
        s => regularExpressionMatching(s.text, s.pattern)
    ));
  });
});
