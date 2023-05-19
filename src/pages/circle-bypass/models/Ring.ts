import { randomInRange } from "src/utils/randomInRange";
import { PolarField } from "./PolarField";
import type { Obstacle } from "./Obstacle";
import { RangeRandom } from "src/utils/RangeRandom";

const obstacleGap = PolarField.degToRad(10);

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
    const circleRange = new RangeRandom(0, Math.PI * 2);
    const obstacles: Obstacle[] = [];

    for (let i = 0; i < obstPerRing; i++) {
      try {
        // TODO Скейлить в зависимости от индекса кольца
        const size = PolarField.degToRad(randomInRange(12, 18));
        const [coord, coordEnd] = circleRange.randomRange(size);
        circleRange.exclude(coord - obstacleGap, coordEnd + obstacleGap);
        obstacles.push({ size, coord });
        // TODO making it circular?..
      } catch (e) { break; }
    }

    return obstacles;
  }
}