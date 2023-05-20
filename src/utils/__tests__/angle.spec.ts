import { describe, it, expect } from "vitest";
import { absRadian, degToRad, radToDeg } from "~/utils/angle";

describe("angle", () => {

  it("converts degrees to radian", () => {
    expect(degToRad(0)).toBeCloseTo(0);
    expect(degToRad(90)).toBeCloseTo(Math.PI / 2);
    expect(degToRad(180)).toBeCloseTo(Math.PI);
    expect(degToRad(270)).toBeCloseTo(Math.PI * 1.5);
  });

  it("converts radians to degrees", () => {
    expect(radToDeg(0)).toBeCloseTo(0);
    expect(radToDeg(Math.PI / 2)).toBeCloseTo(90);
    expect(radToDeg(Math.PI)).toBeCloseTo(180);
    expect(radToDeg(Math.PI * 1.5)).toBeCloseTo(270);
  });

  it("Converts radian to absolute value in circle", () => {
    expect(absRadian(Math.PI * 2.5)).toBeCloseTo(Math.PI * 0.5);
    expect(absRadian(Math.PI * 2)).toBeCloseTo(0);

    expect(absRadian(-Math.PI * 0.5)).toBeCloseTo(Math.PI * 1.5);
    expect(absRadian(-Math.PI)).toBeCloseTo(Math.PI);
    expect(absRadian(-Math.PI * 1.5)).toBeCloseTo(Math.PI * 0.5);
    expect(absRadian(-Math.PI * 2)).toBeCloseTo(0);
  });

});
