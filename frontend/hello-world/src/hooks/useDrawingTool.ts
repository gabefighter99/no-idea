import { useState } from "react";
import Konva from "konva";
import {
  ACTION,
  CircleType,
  LineType,
  RectType,
  TOOLS,
} from "../components/constants";

function useDrawingTool(
  stageRef: React.RefObject<Konva.Stage>,
  action: React.MutableRefObject<string>,
  color: string,
  tool: string,
  setTool: (tool: string) => void,
  setClickCooldown: (clickCooldown: boolean) => void,
) {
  const [rects, setRects] = useState<RectType[]>([]);
  const [circles, setCircles] = useState<CircleType[]>([]);
  const [lines, setLines] = useState<LineType[]>([]);
  const [scribbles, setScribbles] = useState<LineType[]>([]);

  const handlePtrDown = () => {
    if (tool === TOOLS.HAND || tool === TOOLS.TEXT) return;
    if (!stageRef.current) return;

    action.current = ACTION.DRAWING;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    const id = Date.now().toString();

    switch (tool) {
      case TOOLS.RECT:
        setRects([
          ...rects,
          { id, x: pos.x, y: pos.y, height: 0, width: 0, rotate: 0, color },
        ]);
        break;
      case TOOLS.DIAMOND:
        setRects([
          ...rects,
          { id, x: pos.x, y: pos.y, height: 0, width: 0, rotate: 45, color },
        ]);
        break;
      case TOOLS.CIRCLE:
        setCircles([...circles, { id, x: pos.x, y: pos.y, radius: 0, color }]);
        break;
      case TOOLS.LINE:
      case TOOLS.ARROW:
        setLines([
          ...lines,
          { id, isArrow: tool === TOOLS.ARROW, points: [pos.x, pos.y], color },
        ]);
        break;
      case TOOLS.SCRIBBLE:
        setScribbles([
          ...scribbles,
          { id, isArrow: false, points: [pos.x, pos.y], color },
        ]);
        break;
      default:
        break;
    }
  };

  const handlePtrUp = () => {
    if (tool === TOOLS.HAND || action.current !== ACTION.DRAWING) return;
    action.current = ACTION.NONE;
    setTool(TOOLS.HAND);

    // Prevent accidental double click
    setClickCooldown(true);
    setTimeout(() => setClickCooldown(false), 500);
  };

  const handlePtrMove = () => {
    if (tool === TOOLS.HAND || action.current !== ACTION.DRAWING) return;
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    switch (tool) {
      case TOOLS.RECT:
      case TOOLS.DIAMOND:
        let rect = rects[rects.length - 1];
        rect.height = pos.y - rect.y;
        rect.width = tool === TOOLS.RECT ? pos.x - rect.x : rect.height;

        rects.splice(rects.length - 1, 1, rect);
        setRects(rects.concat());
        break;
      case TOOLS.CIRCLE:
        let circle = circles[circles.length - 1];
        circle.radius = Math.sqrt(
          (pos.x - circle.x) ** 2 + (pos.y - circle.y) ** 2,
        );

        circles.splice(circles.length - 1, 1, circle);
        setCircles(circles.concat());
        break;
      case TOOLS.SCRIBBLE:
        let scribble = scribbles[scribbles.length - 1];
        scribble.points = scribble.points.concat([pos.x, pos.y]);

        scribbles.splice(scribbles.length - 1, 1, scribble);
        setScribbles(scribbles.concat());
        break;
      case TOOLS.LINE:
      case TOOLS.ARROW:
        let line = lines[lines.length - 1];
        line.points = [line.points[0], line.points[1], pos.x, pos.y];

        lines.splice(lines.length - 1, 1, line);
        setLines(lines.concat());
        break;
      default:
        break;
    }
  };

  return {
    rects,
    circles,
    lines,
    scribbles,
    handlePtrDown,
    handlePtrMove,
    handlePtrUp,
    setRects,
    setCircles,
    setLines,
    setScribbles,
  };
}

export default useDrawingTool;
