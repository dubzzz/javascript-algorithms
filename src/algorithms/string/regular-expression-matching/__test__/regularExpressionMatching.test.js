import * as fc from 'fast-check';
import regularExpressionMatching from '../regularExpressionMatching';

describe('regularExpressionMatching', () => {
  it('should match regular expressions in a string', () => {
    expect(regularExpressionMatching('', '')).toBeTruthy();
    expect(regularExpressionMatching('a', 'a')).toBeTruthy();
    expect(regularExpressionMatching('aa', 'aa')).toBeTruthy();
    expect(regularExpressionMatching('aab', 'aab')).toBeTruthy();
    expect(regularExpressionMatching('aab', 'aa.')).toBeTruthy();
    expect(regularExpressionMatching('aab', '.a.')).toBeTruthy();
    expect(regularExpressionMatching('aab', '...')).toBeTruthy();
    expect(regularExpressionMatching('a', 'a*')).toBeTruthy();
    expect(regularExpressionMatching('aaa', 'a*')).toBeTruthy();
    expect(regularExpressionMatching('aaab', 'a*b')).toBeTruthy();
    expect(regularExpressionMatching('aaabb', 'a*b*')).toBeTruthy();
    expect(regularExpressionMatching('aaabb', 'a*b*c*')).toBeTruthy();
    expect(regularExpressionMatching('', 'a*')).toBeTruthy();
    expect(regularExpressionMatching('xaabyc', 'xa*b.c')).toBeTruthy();
    expect(regularExpressionMatching('aab', 'c*a*b*')).toBeTruthy();
    expect(regularExpressionMatching('mississippi', 'mis*is*.p*.')).toBeTruthy();
    expect(regularExpressionMatching('ab', '.*')).toBeTruthy();

    expect(regularExpressionMatching('', 'a')).toBeFalsy();
    expect(regularExpressionMatching('a', '')).toBeFalsy();
    expect(regularExpressionMatching('aab', 'aa')).toBeFalsy();
    expect(regularExpressionMatching('aab', 'baa')).toBeFalsy();
    expect(regularExpressionMatching('aabc', '...')).toBeFalsy();
    expect(regularExpressionMatching('aaabbdd', 'a*b*c*')).toBeFalsy();
    expect(regularExpressionMatching('mississippi', 'mis*is*p*.')).toBeFalsy();
    expect(regularExpressionMatching('ab', 'a*')).toBeFalsy();
    expect(regularExpressionMatching('abba', 'a*b*.c')).toBeFalsy();
    expect(regularExpressionMatching('abba', '.*c')).toBeFalsy();
  });
  it('should match on (text, pattern) pairs [property]', () => {
    const oneC = fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz");
    const myGen = fc.array(fc.oneof(
        fc.record({
          type: fc.constant('exact'),
          value: oneC
        }),
        fc.record({
          type: fc.constant('all'),
          value: oneC
        }),
        fc.record({
          type: fc.constant('allNum'),
          value: fc.stringOf(oneC)
        }),
        fc.record({
          type: fc.constant('num'),
          value: oneC,
          num: fc.nat(10)
        }),
    )).map(conf => {
        return {
            text: conf.map(v => {
                if (v.type === 'value') return v.value;
                if (v.type === 'all') return v.value;
                if (v.type === 'allNum') return v.value;
                else return [...Array(v.num)].map(_ => v.value).join('');
            }).join(''),
            pattern: conf.map(v => {
                if (v.type === 'value') return v.value;
                if (v.type === 'all') return '.';
                if (v.type === 'allNum') return '.*';
                else return v.value + '*';
            }).join('')
        };
    });

    fc.assert(
      fc.property(
        myGen,
        s => regularExpressionMatching(s.text, s.pattern)
    ));
  });
});
