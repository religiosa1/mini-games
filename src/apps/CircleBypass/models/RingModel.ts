import { randomInRange } from "src/utils/randomInRange";
import type { ObstacleModel } from "./ObstacleModel";
import { CircularRangeRandom } from "./CircularRangeRandom";
import { degToRad } from "~/utils/angle";

const obstacleGap = degToRad(10);

export class RingModel {
  #centerSectionGap = 132;
  #ringThickness = 60;
  #gap = 12;

  staticObstacles!: ObstacleModel[];
  dynamicObstacles!: ObstacleModel[];

  constructor(
    public index: number,
    public nStaticObstacles: number,
    public nDynamicObstacles: number,
  ) {
    this.regenerateObstacles();
  }

  regenerateObstacles() {
    this.staticObstacles = RingModel.generateObstacles(this.nStaticObstacles);
    this.dynamicObstacles = RingModel.generateObstacles(this.nDynamicObstacles);
  }

  get radiusInner() {
    return this.#centerSectionGap + (this.#gap + this.#ringThickness) * this.index;
  }

  get radiusOutter() {
    return this.radiusInner + this.#ringThickness;
  }

  static generateObstacles(obstPerRing: number): ObstacleModel[] {
    const circleRange = new CircularRangeRandom(0, Math.PI * 2);
    const obstacles: ObstacleModel[] = [];

    for (let i = 0; i < obstPerRing; i++) {
      try {
        // TODO Скейлить в зависимости от индекса кольца
        const size = degToRad(randomInRange(12, 18));
        const [coord, coordEnd] = circleRange.randomRange(size);
        circleRange.exclude(coord - obstacleGap, coordEnd + obstacleGap);
        obstacles.push({ size, coord });
      } catch (e) {
        console.log("Error during obstacle generation, probably out of available space", e);
        break;
      }
    }

    return obstacles;
  }
}