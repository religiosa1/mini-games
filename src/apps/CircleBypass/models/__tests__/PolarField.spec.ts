import { describe, it, expect } from 'vitest';
import { PolarField } from "../PolarField";

describe("PolarField", () => {
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