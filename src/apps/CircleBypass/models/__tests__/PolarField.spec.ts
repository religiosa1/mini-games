import { describe, it, expect } from 'vitest';
import { PolarField } from "../PolarField";

describe("PolarField", () => {
  it("converts degrees to radian", () => {
    expect(PolarField.degToRad(0)).toBeCloseTo(0);
    expect(PolarField.degToRad(90)).toBeCloseTo(Math.PI / 2);
    expect(PolarField.degToRad(180)).toBeCloseTo(Math.PI);
    expect(PolarField.degToRad(270)).toBeCloseTo(Math.PI * 1.5);
  });

  it("converts radians to degrees", () => {
    expect(PolarField.radToDeg(0)).toBeCloseTo(0);
    expect(PolarField.radToDeg(Math.PI / 2)).toBeCloseTo(90);
    expect(PolarField.radToDeg(Math.PI)).toBeCloseTo(180);
    expect(PolarField.radToDeg(Math.PI * 1.5)).toBeCloseTo(270);
  });

  it("Converts radian to absolute value in circle", () => {
    expect(PolarField.absRadian(Math.PI * 2.5)).toBeCloseTo(Math.PI * 0.5);
    expect(PolarField.absRadian(Math.PI * 2)).toBeCloseTo(0);

    expect(PolarField.absRadian(-Math.PI * 0.5)).toBeCloseTo(Math.PI * 1.5);
    expect(PolarField.absRadian(-Math.PI)).toBeCloseTo(Math.PI);
    expect(PolarField.absRadian(-Math.PI * 1.5)).toBeCloseTo(Math.PI * 0.5);
    expect(PolarField.absRadian(-Math.PI * 2)).toBeCloseTo(0);
  });

  describe("polar/svg coordinate conversion", () => {
    const angleMap = [
      [0, [1000, 500]],
      [Math.PI * 0.5, [500, 1000]],
      [Math.PI, [0, 500]],
      [Math.PI * 1.5, [500, 0]],
    ] as const;

    it.each(
      Array.from(angleMap, ([angle, coords]) => [...coords, angle])
    )("converts svg coordinates to polar at extremes (%i:%i) -> %f", (x, y, angle) => {
      const field = new PolarField(1000);
      const [resAngle, resRadius] = field.svgToPolar(x, y);
      expect(resAngle).toBeCloseTo(angle);
      expect(resRadius).toBeCloseTo(500);
    });

    it.each(
      Array.from(angleMap, (i) => i.flat())
    )("converts polar coordinates to svg at extremes (%f) -> %i:%i", (angle, x, y) => {
      const field = new PolarField(1000);
      const [resX, resY] = field.polarToSvg(angle, 500);
      expect(resX).toBeCloseTo(x);
      expect(resY).toBeCloseTo(y);
    });
  });
});