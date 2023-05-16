import { For } from "solid-js";
import { RingElement } from "./RingElement";
import { ObstacleElement } from "./ObstacleElement";
import { useField } from "../contexts/Field";
import { useRing } from "../contexts/Ring";

import { generateStaticObstacles } from "../models/Obstacle";
import { createStore } from "solid-js/store";


export function FieldElement() {
  const field = useField();
  const rings = useRing();
  const [staticObstacles] = createStore(generateStaticObstacles(rings.length - 1, 3));

  return (
    <svg
      class="CircleBypassGame"
      viewBox={`0 0 ${field.size} ${field.size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50%" cy="50%" r="50%" class="bg" fill="var(--clr-bg)" />
      <For each={rings.slice(0, -1)}>
        {(ring) => (
          <RingElement index={ring.index}>
            <For each={staticObstacles[ring.index]!}>
              {(obstacle) => <ObstacleElement ringIndex={ring.index} {...obstacle} />}
            </For>
          </RingElement>
        )}
      </For>
      <RingElement index={rings.length - 1} inActive />
    </svg>
  );
}