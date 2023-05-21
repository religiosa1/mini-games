import { For, createEffect, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Countdown } from "./components/Countdown";
import { Ring } from "./components/Ring";
import { Cursor } from "~/apps/CircleBypass/components/Cursor";
import { FieldStore, FieldStoreProvider } from "~/apps/CircleBypass/contexts/FieldStore";
import { degToRad } from "~/utils/angle";

import "./CircleBypass.scss";

const velocity = degToRad(0.035);

export function CircleBypass() {
  const [store, setStore] = createStore(new FieldStore());
  const [timeLeft, setTimeleft] = createSignal<number>(15_000);

  createEffect(() => {
    let previousTime = performance.now();
    function step(time: DOMHighResTimeStamp) {
      if (timeLeft() <= 0) {
        return;
      }
      const elapsed = time - previousTime;
      previousTime = time;
      setStore(produce(store => {
        store.activeRings.forEach((ring, index) => {
          const getCoord = index % 2
            ? (c: number) => c + velocity * elapsed
            : (c: number) => c - velocity * elapsed
          for (const o of ring.dynamicObstacles) {
            o.coord = getCoord(o.coord);
          }
        });
      }));
      setTimeleft(v => v - elapsed);
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

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
