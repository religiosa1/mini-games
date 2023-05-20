import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Countdown } from "./components/Countdown";
import { Ring } from "./components/Ring";
import { Cursor } from "~/apps/CircleBypass/components/Cursor";
import { FieldStore, FieldStoreProvider } from "~/apps/CircleBypass/contexts/FieldStore";

import "./CircleBypass.scss";


export function CircleBypass() {
  const [store] = createStore(new FieldStore());
  const [timeLeft, setTimeLeft] = createSignal<number>(10_000);

  return (
    <FieldStoreProvider value={store}>
      <svg
        class="CircleBypassGame"
        viewBox={`0 0 ${store.field.size} ${store.field.size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="50%" class="bg" fill="var(--clr-bg)" />
        <g class="rings">
          <For each={store.activeRings}>
            {(ring) => (
              <Ring ring={ring}></Ring>
            )}
          </For>
          <Ring ring={store.pitRing} inActive />
        </g>
        <Countdown value={timeLeft()} />
        <Cursor data={store.cursor} />
      </svg>
    </FieldStoreProvider>
  );
}
