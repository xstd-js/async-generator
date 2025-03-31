import { describe, expect, it } from 'vitest';
import { isAsyncGeneratorFunction } from './is-async-generator-function.js';

describe('isAsyncGeneratorFunction', (): void => {
  it('should detect the correct type', () => {
    expect(isAsyncGeneratorFunction(0)).toBe(false);
    expect(isAsyncGeneratorFunction('a')).toBe(false);
    expect(isAsyncGeneratorFunction(null)).toBe(false);
    expect(isAsyncGeneratorFunction(() => {})).toBe(false);
    expect(isAsyncGeneratorFunction(async () => {})).toBe(false);
    expect(isAsyncGeneratorFunction(function () {})).toBe(false);
    expect(isAsyncGeneratorFunction(async function () {})).toBe(false);
    expect(isAsyncGeneratorFunction(function* () {})).toBe(false);
    expect(isAsyncGeneratorFunction(async function* () {})).toBe(true);
  });
});
