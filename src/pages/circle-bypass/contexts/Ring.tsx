import { createContext, useContext, JSX } from "solid-js";
import { Ring } from "../models/Ring";
import { range } from "src/utils/range";
import { assertExists } from "src/utils/assertion";

const RingContext = createContext<Ring[]>([]);

interface RingProviderProps {
  nRings?: number;
  children?: JSX.Element;
}
export function RingProvider(props: RingProviderProps) {
  const value = Array.from(range(0, props.nRings ?? 5), (i) => new Ring(i));

  return (
    <RingContext.Provider value={value}>
      {props.children}
    </RingContext.Provider>
  );
}

export function useRing(): Ring[];
export function useRing(index: number): Ring | undefined;
export function useRing(index?: number): Ring[] | Ring | undefined {
  const ctx = useContext(RingContext);
  if (typeof index !== "number") {
    return ctx;
  }
  return ctx[index];
}
