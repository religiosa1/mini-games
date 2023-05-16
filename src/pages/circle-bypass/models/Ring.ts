import { randomInRange } from "src/utils/randomInRange";
import { PolarField } from "./PolarField";
import type { Obstacle } from "./Obstacle";
export class Ring {
  #centerSectionGap = 132;
  #ringThickness = 60;
  #gap = 12;

  staticObstacles!: Obstacle[];
  dynamicObstacles!: Obstacle[];

  constructor(
    public index: number,
    public nStaticObstacles: number,
    public nDynamicObstacles: number,
  ) {
    this.regenerateObstacles();
  }

  regenerateObstacles() {
    this.staticObstacles = Ring.generateObstacles(this.nStaticObstacles);
    this.dynamicObstacles = Ring.generateObstacles(this.nDynamicObstacles);
  }

  get radiusInner() {
    return this.#centerSectionGap + (this.#gap + this.#ringThickness) * this.index;
  }

  get radiusOutter() {
    return this.radiusInner + this.#ringThickness;
  }

  static generateObstacles(obstPerRing: number): Obstacle[] {
    return Array.from({ length: obstPerRing }, () => {
      return {
        // TODO учитывать уже созданные объекты
        coord: randomInRange(0, Math.PI * 2),
        // Скейлить в зависимости от индекса кольца
        size: PolarField.degToRad(randomInRange(12, 18)),
      };
    });
  }
}