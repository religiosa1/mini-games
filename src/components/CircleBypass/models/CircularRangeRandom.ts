import { RangeRandom } from "src/utils/RangeRandom";

/**
 * Variant of rangeRandom, allowing randomRanges to be generated in uninon
 * between end and start of valid range
 */
export class CircularRangeRandom extends RangeRandom {
  override exclude(eStart: number, eEnd: number): void {
    eEnd %= (this.end - this.start);
    eStart %= (this.end - this.start);
    if (eStart > eEnd) {
      super.exclude(this.start, eEnd);
      super.exclude(eStart, this.end);
    } else {
      super.exclude(eStart, eEnd);
    }
  }

  get isCircular() {
    return this.validRangesStart === this.start && this.validRangesEnd === this.end;
  }

  override randomRange(size: number): [start: number, end: number] {
    const range = super.randomRange(size);
    if (range[1] > this.end) {
      range[1] %= (this.end - this.start);
    }
    return range;
  }

  protected override getApplicableRanges(size: number): Array<[start: number, end: number]> {
    if (!this.isCircular) {
      return super.getApplicableRanges(size);
    }
    const allRanges = Array.from(this.validRanges());

    if (!allRanges.length) {
      return [];
    }
    const firstRange = allRanges[0]!;
    const lastRange = structuredClone(allRanges.at(-1)!);
    const firstRangeLength = firstRange[1] - firstRange[0];
    lastRange[1] += firstRangeLength;
    if (allRanges.length === 1) {
      return allRanges;
    }

    const virtualRanges = [...allRanges.slice(1, -1), lastRange];

    return virtualRanges.filter(([start, end]) => end - start > size)
  }
}