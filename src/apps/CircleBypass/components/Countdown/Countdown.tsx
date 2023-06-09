import { useFieldStore } from "~/apps/CircleBypass/stores/FieldStore";
import "./Countdown.scss";

interface CountdownProps {
  value: number;
}
export function Countdown(props: CountdownProps) {
  const { field } = useFieldStore();

  const seconds = () => Math.max(props.value / 1000, 0).toFixed(2);

  return (
    <text
      x={field.middle}
      y={field.middle}
      dy="0.08em"
      textLength="15%"
      lengthAdjust="spacingAndGlyphs"
      class="countdown"
    >
      {seconds()}
    </text>
  )
}