interface NumericRangeOptions {
  step?: number;
  inclusive?: boolean
}

export function range(end: number): Generator<number>;
export function range(start: number, end: number, step?: number): Generator<number>;
export function range(start: number, end: number, options?: NumericRangeOptions): Generator<number>;
export function* range(start: number, end?: number, options?: number | NumericRangeOptions): Generator<number> {
  if (typeof end !== "number") {
    end = start;
    start = 0;
  }
  const step = (typeof options === "number" ? options : options?.step) ?? 1;
  if (
    (step > 0 && end < start)
    || (step < 0 && end > start)
    || (step === 0 || !Number.isFinite(step))
  ) {
    throw new RangeError();
  }
  const inclusive = !!(typeof options === "object" && options?.inclusive);

  if (inclusive) {
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
}