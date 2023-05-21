import type { RingModel } from "~/apps/CircleBypass/models/RingModel";
import { degToRad } from "~/utils/angle";

export class CursorModel {
  static width = degToRad(2.5);
  constructor(
    public ringIndex: number,
    public angle = Math.PI / 2
  ) { }

  // TODO fixed size disregarding the ring
  coords(_ring: RingModel): [start: number, end: number] {
    return [this.angle, this.angle + CursorModel.width];
  }
}