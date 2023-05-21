import { createContext, useContext, JSX } from "solid-js";
import { createMutable } from "solid-js/store";
import { bind } from "~/utils/bind";
import { degToRad, absRadian } from "~/utils/angle";
import { isRangeIntersection } from "~/utils/isRangeIntersection";
import { CursorModel } from "~/apps/CircleBypass/models/CursorModel";
import { PolarField } from "~/apps/CircleBypass/models/PolarField";
import { RingModel } from "~/apps/CircleBypass/models/RingModel";
import type { UserInput } from "~/apps/CircleBypass/models/UserInputs";
import type { DifficultySpecifier } from "~/apps/CircleBypass/models/DifficultySettings";

export class FieldStore {
  static readonly nRings = 4;
  velocity = degToRad(0.035);

  constructor(specifier?: DifficultySpecifier) {
    this.activeRings = Array.from(
      { length: FieldStore.nRings },
      (_, i) => createMutable(new RingModel(
        i,
        specifier?.[i]?.staticObstacles ?? 0,
        specifier?.[i]?.dynamicObstacles ?? 0
      ))
    );
  }

  field = new PolarField(1000);
  activeRings = Array.from({ length: FieldStore.nRings }, (_, i) => createMutable(new RingModel(i, 3, 3)));
  pitRing = createMutable(new RingModel(FieldStore.nRings, 0, 0));
  cursor = createMutable(new CursorModel(FieldStore.nRings));

  @bind getRingByIndex(index: number): RingModel | undefined {
    if (index === this.activeRings.length) {
      return this.pitRing;
    }
    return this.activeRings[index];
  }

  @bind reduceInputs(inputs: UserInput[], timeStep: number) {
    for (const i of inputs) {
      if (i.type === "advance" && this.cursor.ringIndex >= 0) {
        this.cursor.ringIndex--;
        // Left-right from keyboard (movement is zero)
      } else if (i.type === "moveLeft" && !i.movement) {
        this.cursor.angle = absRadian(this.cursor.angle + timeStep * this.velocity);
      } else if (i.type === "moveRight" && !i.movement) {
        this.cursor.angle = absRadian(this.cursor.angle - timeStep * this.velocity);
      }
    }
  }

  @bind isCusrorColliding(): boolean {
    if (this.cursor.ringIndex >= FieldStore.nRings || this.cursor.ringIndex < 0) {
      return false;
    }
    const ring = this.activeRings[this.cursor.ringIndex]!;
    if (!ring) {
      return false;
    }
    const coords = this.cursor.coords(ring);
    for (const obstacle of [...ring.staticObstacles, ...ring.dynamicObstacles]) {
      const isColliding = isRangeIntersection(
        [obstacle.coord, obstacle.coord + obstacle.size].map(absRadian) as [number, number],
        coords.map(absRadian) as [number, number],
      );
      if (isColliding) {
        return true;
      }
    }
    return false;
  }
}

const FieldStoreContext = createContext(new FieldStore());

interface FieldStoreProviderProps {
  value: FieldStore;
  children?: JSX.Element;
}
export function FieldStoreProvider(props: FieldStoreProviderProps) {

  return (
    <FieldStoreContext.Provider value={props.value}>
      {props.children}
    </FieldStoreContext.Provider>
  );
}

export function useFieldStore() {
  return useContext(FieldStoreContext);
}