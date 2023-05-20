import { describe, it, expect } from "vitest";
import { CircularRangeRandom } from "../CircularRangeRandom";

describe("CircularRangeRandom", () => {
  it("allows circular exclusions", () => {
    const rr = new CircularRangeRandom(0, 10);
    rr.exclude(7, 3);
    expect(Array.from(rr.exclusions())).toEqual([[0, 3], [7, 10]]);
    expect(Array.from(rr.validRanges())).toEqual([[3, 7]]);
  });

  it("Throws if not enough space to allocate a new range", () => {
    const rr = new CircularRangeRandom(0, 3);
    rr.exclude(1, 2);
    expect(Array.from(rr.validRanges())).toEqual([[0, 1], [2, 3]]);
    expect(() => rr.randomRange(2)).toThrow();
  });

  it("allows generation of overllaping from end to start ranges ranges", () => {
    const rr = new CircularRangeRandom(0, 4);
    rr.exclude(1, 2);
    expect(Array.from(rr.validRanges())).toEqual([[0, 1], [2, 4]]);
    const range = rr.randomRange(2);
    expect(range[0] >= 2).toBeTruthy();
    expect(range[0] < 3).toBeTruthy();
    expect(range[1] >= 0).toBeTruthy();
    expect(range[1] < 1).toBeTruthy();
  });

  // aka test that we're not mutating out original range with virtual in getApplicableRanges
  it.todo("Generates ranges in sequences");
});