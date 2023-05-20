export function degToRad(deg: number): number {
  return deg * Math.PI / 180;
}

export function radToDeg(rad: number): number {
  return rad * 180 / Math.PI;
}

export function absRadian(rad: number): number {
  rad = rad % (2 * Math.PI);
  if (rad < 0) {
    return 2 * Math.PI + rad;
  }
  return rad;
}
