import { useFieldStore } from "~/apps/CircleBypass/contexts/FieldStore";
import { CursorModel } from "~/apps/CircleBypass/models/CursorModel";
import "./Cursor.scss";

interface CursorProps {
  data: CursorModel;
}
export function Cursor(props: CursorProps) {
  const { field, getRingByIndex } = useFieldStore();
  const ring = getRingByIndex(props.data.ringIndex);

  const d = () => {
    if (!ring) {
      return "";
    }
    const [topX, topY] = field.polarToSvg(props.data.angle, ring.radiusInner);
    const [leftX, leftY] = field.polarToSvg(props.data.angle + CursorModel.width, ring.radiusOutter);
    const [rightX, rightY] = field.polarToSvg(props.data.angle - CursorModel.width, ring.radiusOutter);
    return (
      `M ${topX} ${topY}` +
      `L ${leftX} ${leftY} ` +
      `L ${rightX} ${rightY} ` +
      `L ${topX} ${topY}z`
    );
  }

  if (!ring) {
    return null;
  }

  return (
    <path
      data-angle={props.data.angle}
      data-ring-index={props.data.ringIndex}
      class="cursor"
      d={d()}
    />
  );
}
