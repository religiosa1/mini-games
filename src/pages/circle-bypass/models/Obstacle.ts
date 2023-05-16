import { randomInRange } from "src/utils/randomInRange";
import { PolarField } from "./PolarField";

export interface Obstacle {
  coord: number;
  size: number;
}

export function generateStaticObstacles(nRings: number, obstPerRing: number): Array<Obstacle[]> {
  const rings: Array<Obstacle[]> = Array.from({ length: nRings }, () => []);
  for (const ring of rings) {
    for (let i = 0; i < obstPerRing; i++) {
      ring.push({
        // TODO учитывать уже созданные объекты
        coord: randomInRange(0, Math.PI * 2),
        size: PolarField.degToRad(randomInRange(7, 10)),
      });
    }
  }
  return rings;
}