import { block } from '@xstd/block';
import { describe, expect, test } from 'vitest';

/**
 * Generic AsyncGenerator tests.
 */
describe('async-generator', (): void => {
  test('return', async () => {
    let count: number = 0;

    const a = block(async function* () {
      try {
        while (true) {
          try {
            yield 1;
          } finally {
            expect(count).toBe(0);
            count++;
            try {
              yield 2;
            } finally {
              expect(count).toBe(1);
              count++;
              yield 3;
              expect(false).toBe(true); // should never happen
            }
          }
        }
      } finally {
        expect(count).toBe(2);
        count++;
        return 5;
      }
    });

    expect(count).toBe(0);
    expect(await a.next()).toEqual({ value: 1, done: false });
    expect(count).toBe(0);
    expect(await a.return(-1)).toEqual({ value: 2, done: false });
    expect(count).toBe(1);
    expect(await a.return(-2)).toEqual({ value: 3, done: false });
    expect(count).toBe(2);
    expect(await a.return(-3)).toEqual({ value: 5, done: true });
    expect(await a.return(-4)).toEqual({ value: -4, done: true });
  });

  test('throw', async () => {
    let count: number = 0;

    const a = block(async function* () {
      try {
        while (true) {
          try {
            yield 1;
          } catch (error: unknown) {
            expect(error).toBe(-1);
            expect(count).toBe(0);
            count++;
            try {
              yield 2;
            } catch (error: unknown) {
              expect(error).toBe(-2);
              expect(count).toBe(1);
              count++;
              yield 3;
              expect(false).toBe(true); // should never happen
            }
          }
        }
      } finally {
        expect(count).toBe(2);
        count++;
        return 5;
      }
    });

    expect(count).toBe(0);
    expect(await a.next()).toEqual({ value: 1, done: false });
    expect(count).toBe(0);
    expect(await a.throw(-1)).toEqual({ value: 2, done: false });
    expect(count).toBe(1);
    expect(await a.throw(-2)).toEqual({ value: 3, done: false });
    expect(count).toBe(2);
    expect(await a.throw(-3)).toEqual({ value: 5, done: true });
    await expect(() => a.throw(-4)).rejects.toEqual(-4);
  });

  test('infinite', async () => {
    const a = block(async function* () {
      while (true) {
        try {
          yield 1;
        } finally {
          continue;
        }
      }
    });

    console.log(await a.next());
    // @ts-ignore
    console.log(await a.return());
    // @ts-ignore
    console.log(await a.return());
    // @ts-ignore
    console.log(await a.return());
    // @ts-ignore
    console.log(await a.throw());
    // @ts-ignore
    console.log(await a.throw());
    // @ts-ignore
    console.log(await a.return());
  });

  // test('for await', async () => {
  //   const a = block(async function* () {
  //     for (let i: number = 0; i < 3; i++) {
  //       yield i;
  //     }
  //   });
  //
  //   console.log(await a.next());
  //   console.log(await a.return());
  //   console.log(await a.return());
  //   console.log(await a.return());
  //   console.log(await a.throw());
  //   console.log(await a.throw());
  //   console.log(await a.return());
  // });
});
