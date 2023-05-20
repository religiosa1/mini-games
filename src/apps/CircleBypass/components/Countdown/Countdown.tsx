import { useField } from "~/apps/CircleBypass/contexts/Field";
import "./Countdown.scss";

interface CountdownProps {
  value: number;
}
export function Countdown(props: CountdownProps) {
  const field = useField();

  const seconds = () => Math.floor(props.value / 1000).toFixed(2);

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