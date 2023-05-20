import { degToRad } from "~/utils/angle";

export class CursorModel {
  static width = degToRad(2.5);
  constructor(
    public ringIndex: number,
    public angle = Math.PI / 2
  ) { }
}