export class AssertionError extends Error {
  override name = "AssertionError" as const;
}

export function assertExists<T>(
  item: T,
  message = "Assertion Failed, item is null or undefined"
): asserts item is NonNullable<T> {
  if (item == null) {
    throw new AssertionError(message);
  }
}