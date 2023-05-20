import { For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { useField } from "~/apps/CircleBypass/contexts/Field";
import type { RingModel } from "~/apps/CircleBypass/models/RingModel";
import { Obstacle } from "./Obstacle";

interface RingProps {
  ring: RingModel;
  inActive?: boolean;
  children?: JSX.Element;
}
export function Ring(props: RingProps) {
  const field = useField();

  const ringPath = () => {
    const radiusOutter = props.ring.radiusOutter;
    const radiusInner = props.ring.radiusInner;

    return (
      `M ${field.middle} ${field.middle - radiusOutter}` +
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
      // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      `A ${radiusOutter} ${radiusOutter} 0 0 1 ${field.middle} ${field.middle + radiusOutter}` +
      `A ${radiusOutter} ${radiusOutter} 0 0 1 ${field.middle} ${field.middle - radiusOutter}z` +
      `M ${field.middle} ${field.middle - radiusInner}` +
      `A ${radiusInner} ${radiusInner} 0 0 1 ${field.middle} ${field.middle + radiusInner}` +
      `A ${radiusInner} ${radiusInner} 0 0 1 ${field.middle} ${field.middle - radiusInner}z`
    );
  };

  return (
    <g
      class={`ring ${props.ring.index % 2 ? "ring_even" : "ring_odd"}`}
      classList={{ "ring_inactive": props.inActive }}
    >
      <path
        class="ring-path"
        fill-rule="evenodd"
        d={ringPath()}
      >
      </path>
      <For each={props.ring.staticObstacles}>
        {(obstacle) => <Obstacle ring={props.ring} {...obstacle} />}
      </For>
      <For each={props.ring.dynamicObstacles}>
        {(obstacle) => <Obstacle dynamic ring={props.ring} {...obstacle} />}
      </For>
      {props.children}
    </g>
  )
}