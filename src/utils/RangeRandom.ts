/** Generating random numbers and ranges in the specific range with 'holes' (exclusions) in it.
 * Initial purpose -- to generate non-repetetive numbers and ranges separated by a gap.
 */
export class RangeRandom {
  constructor(public start: number, public end: number) {
    if (start >= end) {
      throw new RangeError("Start and end range values overlap");
    }
    this.#validRanges = [[start, end]];
  }

  #validRanges: Array<[start: number, end: number]> = [];
  *validRanges(): Generator<[start: number, end: number]> {
    for (const range of this.#validRanges) {
      yield range;
    }
  }

  *exclusions(): Generator<[start: number, end: number]> {
    const firstRange = this.#validRanges[0];
    if (!firstRange) {
      return yield [this.start, this.end];
    }
    if (firstRange[0] > this.start) {
      yield [this.start, firstRange[0]];
    }
    let start = firstRange[1]!;
    let end = NaN;
    for (const range of this.#validRanges.slice(1)) {
      end = range[0];
      yield [start, end];
      start = range[1];
    }
    const lastRange = this.#validRanges.at(-1)!;
    if (lastRange[1] < this.end) {
      yield [lastRange[1], this.end];
    }
  }

  exclude(eStart: number, eEnd: number) {
    // capping the values, so we don't go through the range
    eStart = Math.max(eStart, this.start);
    eEnd = Math.min(eEnd, this.end);
    if (eStart >= eEnd) {
      throw new RangeError("Start and end range values overlap");
    }
    const newValidRanges: Array<[number, number]> = [];
    for (const [rStart, rEnd] of this.#validRanges) {
      // The valid subrange completely outside of the exlusion -- copying it entirely
      if (rEnd < eStart || rStart >= eEnd) {
        newValidRanges.push([rStart, rEnd]);
        continue;
      }
      // The valid subrange is completely inside the exclusion -- ommiting it entirely
      if (rStart >= eStart && rEnd <= eEnd) {
        continue;
      }
      if (eStart > rStart) {
        newValidRanges.push([rStart, eStart]);
      }
      if (eEnd < rEnd) {
        newValidRanges.push([eEnd, rEnd]);
      }
    }
    this.#validRanges = newValidRanges;
  }

  clear() {
    if (this.start >= this.end) {
      throw new RangeError("Start and end range values overlap");
    }
    this.#validRanges = [[this.start, this.end]];
  }

  isExcluded(value: number): boolean {
    for (const [start, stop] of this.exclusions()) {
      if (start <= value && value < stop) {
        return true;
      }
    }
    return false;
  }

  isInRange(value: number): boolean {
    return this.#validRanges.some(([start, end]) => start <= value && value < end);
  }

  isInInitialRange(value: number): boolean {
    return this.start <= value && value < this.end;
  }

  random(): number {
    const [start, end] = this.#validRanges[Math.floor(Math.random() * this.#validRanges.length)]!;
    return Math.random() * (end - start) + start;
  }

  randomRange(size: number): [start: number, end: number] {
    const applicableRanges = this.#validRanges.filter(([start, stop]) => stop - start >= size);
    if (!applicableRanges.length) {
      throw new Error("Not enough size in range set to accomodate the range of requested size");
    }
    const [start, end] = applicableRanges[Math.floor(Math.random() * applicableRanges.length)]!;
    const endOfRandom = end - size;
    const randomRangeStart = Math.random() * (endOfRandom - start) + start;
    return [randomRangeStart, randomRangeStart + size];
  }
}