type Range = [start: number, end: number];
export function isRangeIntersection(source: Range, ...targets: Range[]): boolean {
  const [sourceStart, sourceEnd] = source;
  for (const [targetStart, targetEnd] of targets) {
    if (
      (sourceStart <= targetStart && targetStart < sourceEnd)
      || (sourceStart <= targetEnd && targetEnd < sourceEnd)
    ) {
      return true;
    }
  }
  return false;
}