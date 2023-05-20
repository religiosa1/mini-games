import { absRadian } from "~/utils/angle";

export class PolarField {
  #size!: number
  #middle!: number;

  constructor(size: number) {
    this.size = size;
  }

  get size() {
    return this.#size;
  }
  set size(val: number) {
    this.#size = val;
    this.#middle = this.#size / 2;
  }

  get middle() {
    return this.#middle;
  }


  svgToPolar(x: number, y: number): [angle: number, radius: number] {
    x -= this.#middle;
    y -= this.#middle;
    const angle = absRadian(Math.atan2(y, x));
    const radius = Math.sqrt(x ** 2 + y ** 2);
    return [angle, radius];
  }

  polarToSvg(angle: number, radius: number): [x: number, y: number] {
    const x = radius * Math.cos(angle) + this.middle;
    const y = radius * Math.sin(angle) + this.middle;
    return [x, y];
  }
}