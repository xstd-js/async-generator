import { AsyncGeneratorFunction } from './async-generator-function.js';

/* istanbul ignore next -- @preserve */
const AsyncGeneratorFunctionConstructor = async function* () {}.constructor;

export function isAsyncGeneratorFunction<GArguments extends readonly any[], GValue, GReturn, GNext>(
  input: unknown,
): input is AsyncGeneratorFunction<GArguments, GValue, GReturn, GNext> {
  return input instanceof AsyncGeneratorFunctionConstructor;
}
