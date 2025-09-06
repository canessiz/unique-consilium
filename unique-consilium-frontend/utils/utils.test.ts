// Minimal test global declarations to avoid adding deps
declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void): void;
declare function expect(actual: unknown): {
  toBe: (expected: unknown) => void;
  toEqual: (expected: unknown) => void;
  toThrow: () => void;
};

import { capitalize } from './capitalize';
import { clamp, isNonEmptyString, partition, uniqueBy, assertNever, noop } from './utils';

describe('capitalize', () => {
  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  it('respects rest unchanged', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });
  it('optional trim', () => {
    expect(capitalize(' hello', { trim: true })).toBe('Hello');
  });
});

describe('utils', () => {
  it('isNonEmptyString', () => {
    expect(isNonEmptyString('a')).toBe(true);
    expect(isNonEmptyString('  ')).toBe(false);
    expect(isNonEmptyString(1)).toBe(false);
  });
  it('clamp', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
    expect(() => clamp(0, 10, 0)).toThrow();
  });
  it('partition', () => {
    const [evens, odds] = partition([1,2,3,4], (n) => n % 2 === 0);
    expect(evens).toEqual([2,4]);
    expect(odds).toEqual([1,3]);
  });
  it('uniqueBy', () => {
    const res = uniqueBy([{id:1},{id:1},{id:2}], (x) => x.id);
    expect(res).toEqual([{id:1},{id:2}]);
  });
  it('assertNever', () => {
    expect(() => assertNever(undefined as never)).toThrow();
  });
  it('noop', () => {
    expect(noop()).toBe(undefined);
  });
});
