export interface AsyncGeneratorFunction<GArguments extends readonly any[], GValue, GReturn, GNext> {
  (...args: GArguments): AsyncGenerator<GValue, GReturn, GNext>;
}

