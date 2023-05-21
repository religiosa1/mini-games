import { For, createEffect, createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Countdown } from "~/apps/CircleBypass/components/Countdown";
import { Ring } from "~/apps/CircleBypass/components/Ring";
import { Cursor } from "~/apps/CircleBypass/components/Cursor";
import { FieldStore, FieldStoreProvider } from "~/apps/CircleBypass/contexts/FieldStore";
import { useInputs } from "~/apps/CircleBypass/useInputs";
import "./Game.scss";

const defaultTimeLeft = 15_000;

interface GameProps {
  isRunning?: boolean;
  onGameEnd: (won: boolean) => void;
}
export function Game(props: GameProps) {
  const [store, setStore] = createStore(new FieldStore());
  const [timeLeft, setTimeleft] = createSignal<number>(defaultTimeLeft);

  const inputs = useInputs(() => !!props.isRunning);

  createEffect(() => {
    let previousTime = performance.now();
    function step(time: DOMHighResTimeStamp) {
      if (timeLeft() <= 0) {
        props.onGameEnd(false);
        return;
      }
      if (!props.isRunning) {
        return;
      }
      const elapsed = time - previousTime;
      previousTime = time;
      setStore(produce(store => {
        store.activeRings.forEach((ring, index) => {
          const getCoord = index % 2
            ? (c: number) => c + store.velocity * elapsed
            : (c: number) => c - store.velocity * elapsed
          for (const o of ring.dynamicObstacles) {
            o.coord = getCoord(o.coord);
          }
        });
        const inp = inputs.get();
        if (inp.length) {
          store.reduceInputs(inp, elapsed);
          inputs.clear();
        }
      }));
      setTimeleft(v => v - elapsed);
      if (store.cursor.ringIndex < 0) {
        props.onGameEnd(true);
      }
      requestAnimationFrame(step);
    }
    if (props.isRunning) {
      setStore(new FieldStore());
      setTimeleft(defaultTimeLeft);
      requestAnimationFrame(step);
    }
  });

  return (
    <FieldStoreProvider value={store}>
      <svg
        onClick={inputs.advanceCursor}
        class="game"
        viewBox={`0 0 ${store.field.size} ${store.field.size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="50%" class="game__bg " />
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
