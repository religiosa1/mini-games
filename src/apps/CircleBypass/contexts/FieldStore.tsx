import { createContext, useContext, JSX } from "solid-js";
import { createMutable } from "solid-js/store";
import { CursorModel } from "~/apps/CircleBypass/models/CursorModel";
import { PolarField } from "~/apps/CircleBypass/models/PolarField";
import { RingModel } from "~/apps/CircleBypass/models/RingModel";
import { bind } from "~/utils/bind";

export const nRings = 4;

export class FieldStore {
  static readonly nRings = 4;

  field = new PolarField(1000);
  activeRings = Array.from({ length: FieldStore.nRings }, (_, i) => createMutable(new RingModel(i, 3, 3)));
  pitRing = createMutable(new RingModel(nRings, 0, 0));
  cursor = createMutable(new CursorModel(nRings + 1));

  @bind getRingByIndex(index: number): RingModel | undefined {
    if (index === this.activeRings.length + 1) {
      return this.pitRing;
    }
    return this.activeRings[index];
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