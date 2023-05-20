import { useField } from "../../contexts/Field";
import type { ObstacleModel } from "../../models/ObstacleModel";
import type { RingModel } from "../../models/RingModel";
import "./Obstacle.scss";

interface ObstacleProps extends ObstacleModel {
  ring: RingModel;
  coord: number;
  size: number;
  dynamic?: boolean;
}
export function Obstacle(props: ObstacleProps) {
  const field = useField();

  if (props.ring === undefined) {
    return null;
  }

  const d = () => {
    const innerRadius = props.ring.radiusInner + 10;
    const outterRadius = props.ring.radiusOutter - 10;
    const [startInnerX, startInnerY] = field.polarToSvg(props.coord, innerRadius);
    const [endInnerX, endInnerY] = field.polarToSvg(props.coord + props.size, innerRadius);
    const [startOutterX, startOutterY] = field.polarToSvg(props.coord + props.size, outterRadius);
    const [endOutterX, endOutterY] = field.polarToSvg(props.coord, outterRadius);
    return (
      `M ${startInnerX} ${startInnerY}` +
      // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      `A ${innerRadius} ${innerRadius} 0 0 1 ${endInnerX} ${endInnerY}` +
      `L ${startOutterX} ${startOutterY}` +
      `A ${outterRadius} ${outterRadius} 0 0 0 ${endOutterX} ${endOutterY}` +
      `L ${startInnerX} ${startInnerY}z`
    );
  };

  return (
    <path
      data-size={props.size}
      data-coord={props.coord}
      d={d()}
      class="obstacle"
      classList={{ "obstacle_dynamic": props.dynamic }}
    />
  );
}