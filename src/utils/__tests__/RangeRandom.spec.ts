import { describe, it, expect } from "vitest";
import { RangeRandom } from "../RangeRandom";

describe("RangeRandom", () => {
  it("throws on invalid range in constuctor", () => {
    expect(() => new RangeRandom(5, 5)).toThrow();
    expect(() => new RangeRandom(5, 4)).toThrow();
  });

  it("allows to check if a number is excluded", () => {
    const rr = new RangeRandom(0, 10);
    rr.exclude(0, 3);
    expect(rr.isExcluded(2)).toBe(true);
    expect(rr.isExcluded(3)).toBe(false);
    expect(rr.isInRange(10)).toBe(false);
    expect(rr.isInRange(-1)).toBe(false);
  });

  it("allows to check if a number is in range after exclusion", () => {
    const rr = new RangeRandom(0, 10);
    rr.exclude(0, 3);
    expect(rr.isInRange(2)).toBe(false);
    expect(rr.isInRange(3)).toBe(true);
    expect(rr.isInRange(10)).toBe(false);
    expect(rr.isInRange(-1)).toBe(false);
  });

  it("allows to check if a number is in initial range", () => {
    const rr = new RangeRandom(0, 10);
    rr.exclude(0, 3);
    expect(rr.isInInitialRange(2)).toBe(true);
    expect(rr.isInInitialRange(3)).toBe(true);
    expect(rr.isInInitialRange(10)).toBe(false);
    expect(rr.isInInitialRange(-1)).toBe(false);
  });

  describe("exclusions", () => {
    it("allows to exclude a sub-range", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(3, 5);
      rr.exclude(7, 9);
      expect(Array.from(rr.exclusions())).toEqual([[3, 5], [7, 9]]);
      expect(Array.from(rr.validRanges())).toEqual([[0, 3], [5, 7], [9, 10]]);
    });

    it("throws on invalid range in exclude", () => {
      const rr = new RangeRandom(0, 10);
      expect(() => rr.exclude(10, 11)).toThrow();
      expect(() => rr.exclude(-3, -2)).toThrow();
      expect(() => rr.exclude(2, 1)).toThrow();
    });

    it("caps the excluded subrange to range min/max", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(-12, 3);
      rr.exclude(7, 12);
      expect(Array.from(rr.exclusions())).toEqual([[0, 3], [7, 10]]);
      expect(Array.from(rr.validRanges())).toEqual([[3, 7]]);
    });

    it("excludes correctly resizes validRanges", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(3, 4);
      expect(Array.from(rr.exclusions())).toEqual([[3, 4]]);
      expect(Array.from(rr.validRanges())).toEqual([[0, 3], [4, 10]]);
      rr.exclude(0, 1);
      expect(Array.from(rr.exclusions())).toEqual([[0, 1], [3, 4]]);
      expect(Array.from(rr.validRanges())).toEqual([[1, 3], [4, 10]]);
      rr.exclude(1, 2);
      expect(Array.from(rr.exclusions())).toEqual([[0, 2], [3, 4]]);
      expect(Array.from(rr.validRanges())).toEqual([[2, 3], [4, 10]]);
      rr.exclude(4, 5);
      expect(Array.from(rr.exclusions())).toEqual([[0, 2], [3, 5]]);
      expect(Array.from(rr.validRanges())).toEqual([[2, 3], [5, 10]]);
      rr.exclude(2, 5);
      expect(Array.from(rr.exclusions())).toEqual([[0, 5]]);
      expect(Array.from(rr.validRanges())).toEqual([[5, 10]]);
    });

    it("excludes correctly removes valid ranges if necessary", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(2, 3);
      rr.exclude(5, 6);
      rr.exclude(8, 9);
      expect(Array.from(rr.exclusions())).toEqual([[2, 3], [5, 6], [8, 9]]);
      expect(Array.from(rr.validRanges())).toEqual([[0, 2], [3, 5], [6, 8], [9, 10]]);
      rr.exclude(6, 8);
      expect(Array.from(rr.exclusions())).toEqual([[2, 3], [5, 9]]);
      expect(Array.from(rr.validRanges())).toEqual([[0, 2], [3, 5], [9, 10]]);
    });

    it("range can be fully depleted", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(0, 10);
      expect(Array.from(rr.exclusions())).toEqual([[0, 10]]);
      expect(Array.from(rr.validRanges())).toEqual([]);
    });

    it("allows to clear exclusions", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(0, 3);
      expect(Array.from(rr.exclusions())).toEqual([[0, 3]]);
      expect(Array.from(rr.validRanges())).toEqual([[3, 10]]);
      rr.clear();
      expect(Array.from(rr.exclusions())).toEqual([]);
      expect(Array.from(rr.validRanges())).toEqual([[0, 10]]);
    });
  });

  describe("randomizing", () => {
    it("generates random number in requested range", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(0, 5);
      const randomN = Array.from({ length: 10e3 }, () => rr.random());
      for (let i = 0; i < randomN.length; i++) {
        const r = randomN[i]!;
        if (r < 5 || r > 10) {
          throw new Error(`random number ${i} out of range: ${r}`);
        }
      }
    });

    it("generates random range in requested range", () => {
      const rr = new RangeRandom(0, 10);
      rr.exclude(0, 5);
      const randomN = Array.from({ length: 1 }, () => rr.randomRange(3));
      for (let i = 0; i < randomN.length; i++) {
        const [start, end] = randomN[i]!;
        if (start < 5 || end > 10) {
          throw new Error(`random number ${i} out of range: ${start}..${end}`);
        }
        expect(end - start).toBeCloseTo(3);
      }
    });

  });

});