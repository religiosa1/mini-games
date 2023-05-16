import type { JSX } from "solid-js/jsx-runtime";
import { useField } from "../contexts/Field";
import { useRing } from "../contexts/Ring";




interface RingProps {
  index: number;
  inActive?: boolean;
  children?: JSX.Element;
}
export function RingElement(props: RingProps) {
  const field = useField();
  const ring = useRing(props.index);

  if (ring === undefined) {
    return null;
  }

  const ringPath = () => {
    const radiusOutter = ring.radiusOutter;
    const radiusInner = ring.radiusInner;

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
      class={`ring ${props.index % 2 ? "ring_even" : "ring_odd"}`}
      classList={{ "ring_inactive": props.inActive }}
    >
      <path
        class="ring-path"
        fill-rule="evenodd"
        d={ringPath()}
      >
      </path>
      {props.children}
    </g>
  )
}