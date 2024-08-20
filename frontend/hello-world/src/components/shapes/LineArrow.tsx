import Konva from "konva";
import { Arrow, Circle, Group, Line } from "react-konva";
import { COLORS, LineType } from "../constants";
import { handleMouseOut, handleMouseOver } from "../eventHandlers";

type LineArrowProps = {
  line: LineType;
  isDraggable: boolean;
  setLines: React.Dispatch<React.SetStateAction<LineType[]>>;
  selected: Konva.Node | null;
  handleSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const LineArrow = ({
  line,
  isDraggable,
  setLines,
  selected,
  handleSelect,
}: LineArrowProps) => {
  return (
    <Group key={line.id} draggable={isDraggable}>
      {line.isArrow ? (
        <Arrow
          id={line.id}
          key={line.id}
          points={line.points}
          stroke={line.color}
          strokeWidth={2}
          strokeScaleEnabled={false}
          hitStrokeWidth={15}
          pointerWidth={5}
          lineCap={"round"}
          onClick={handleSelect}
          onMouseOver={() => handleMouseOver("move")}
          onMouseOut={handleMouseOut}
          draggable={isDraggable}
        />
      ) : (
        <Line
          id={line.id}
          key={line.id}
          points={line.points}
          stroke={line.color}
          strokeWidth={2}
          strokeScaleEnabled={false}
          hitStrokeWidth={15}
          lineCap={"round"}
          onClick={handleSelect}
          onMouseOver={() => handleMouseOver("move")}
          onMouseOut={handleMouseOut}
        />
      )}
      <Circle
        x={line.points[0]}
        y={line.points[1]}
        visible={selected?.id() === line.id}
        radius={5}
        stroke={COLORS.PURPLE}
        strokeWidth={1}
        fill={COLORS.WHITE}
        hitStrokeWidth={15}
        draggable={isDraggable}
        onDragMove={(e: Konva.KonvaEventObject<DragEvent>) => {
          setLines((prevLines) => {
            let idx = prevLines.findIndex((cand) => cand.id === line.id);
            let newPoints = prevLines[idx].points;
            newPoints[0] = e.target.x();
            newPoints[1] = e.target.y();
            prevLines.splice(idx, 1, {
              ...line,
              points: newPoints,
            });
            return prevLines.concat();
          });
        }}
        onMouseOver={() => handleMouseOver("pointer")}
        onMouseOut={handleMouseOut}
      />
      <Circle
        x={line.points[line.points.length - 2]}
        y={line.points[line.points.length - 1]}
        visible={selected?.id() === line.id}
        radius={5}
        stroke={COLORS.PURPLE}
        strokeWidth={1}
        fill={COLORS.WHITE}
        hitStrokeWidth={15}
        draggable={isDraggable}
        onDragMove={(e: Konva.KonvaEventObject<DragEvent>) => {
          setLines((prevLines) => {
            let idx = prevLines.findIndex((cand) => cand.id === line.id);
            let newPoints = prevLines[idx].points;
            newPoints[newPoints.length - 2] = e.target.x();
            newPoints[newPoints.length - 1] = e.target.y();
            prevLines.splice(idx, 1, {
              ...line,
              points: newPoints,
            });
            return prevLines.concat();
          });
        }}
        onMouseOver={() => handleMouseOver("pointer")}
        onMouseOut={handleMouseOut}
      />
    </Group>
  );
};

export default LineArrow;
