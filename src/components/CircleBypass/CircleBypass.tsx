import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { RingElement } from "./RingElement";
import { Ring } from "./models/Ring";
import { FieldProvider } from "./contexts/Field";
import { PolarField } from "./models/PolarField";

import "./CircleBypass.scss";
import { Countdown } from "./Countdown";

const nRings = 4;
const size = 1000;

export function CircleBypass() {
  const field = new PolarField(size);
  const [rings] = createStore({
    active: Array.from({ length: 4 }, (_, i) => new Ring(i, 3, 3)),
    pitRing: new Ring(nRings, 0, 0)
  });
  const [timeLeft, setTimeLeft] = createSignal<number>(10_000);

  return (
    <FieldProvider value={field}>
      <svg
        class="CircleBypassGame"
        viewBox={`0 0 ${field.size} ${field.size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="50%" r="50%" class="bg" fill="var(--clr-bg)" />
        <For each={rings.active}>
          {(ring) => (
            <RingElement ring={ring}></RingElement>
          )}
        </For>
        <RingElement ring={rings.pitRing} inActive />
        <Countdown value={timeLeft()} />
      </svg>
    </FieldProvider>
  );
}
