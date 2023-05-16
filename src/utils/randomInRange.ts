export function randomInRange(start: number, end: number): number {
  return Math.random() * (end - start) + start;
}