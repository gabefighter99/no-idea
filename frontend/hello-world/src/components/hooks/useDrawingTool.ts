import { useState } from "react";
import Konva from "konva";
import {
  ACTION,
  CircleType,
  LineType,
  RectType,
  TOOLS,
} from "../common/constants";
import { trueCursorPos } from "../common/utils";

function useDrawingTool(
  stageRef: React.RefObject<Konva.Stage>,
  bgRef: React.RefObject<Konva.Rect>,
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
    if (tool === TOOLS.POINTER || tool === TOOLS.HAND || tool === TOOLS.TEXT)
      return;
    if (!stageRef.current) return;

    action.current = ACTION.DRAWING;

    const cur = trueCursorPos(stageRef.current);
    if (!cur) return;
    const id = Date.now().toString();

    switch (tool) {
      case TOOLS.RECT:
        setRects([
          ...rects,
          { id, x: cur.x, y: cur.y, height: 0, width: 0, rotate: 0, color },
        ]);
        break;
      case TOOLS.DIAMOND:
        setRects([
          ...rects,
          {
            id,
            x: cur.x,
            y: cur.y,
            height: 0,
            width: 0,
            rotate: 45,
            color,
          },
        ]);
        break;
      case TOOLS.CIRCLE:
        setCircles([...circles, { id, x: cur.x, y: cur.y, radius: 0, color }]);
        break;
      case TOOLS.LINE:
      case TOOLS.ARROW:
        setLines([
          ...lines,
          {
            id,
            isArrow: tool === TOOLS.ARROW,
            points: [cur.x, cur.y],
            color,
          },
        ]);
        break;
      case TOOLS.SCRIBBLE:
        setScribbles([
          ...scribbles,
          { id, isArrow: false, points: [cur.x, cur.y], color },
        ]);
        break;
      default:
        break;
    }
  };

  const handlePtrUp = () => {
    if (
      tool === TOOLS.POINTER ||
      tool === TOOLS.HAND ||
      action.current !== ACTION.DRAWING
    )
      return;
    action.current = ACTION.NONE;
    setTool(TOOLS.POINTER);

    // Prevent accidental double click
    setClickCooldown(true);
    setTimeout(() => setClickCooldown(false), 500);
  };

  const handlePtrMove = () => {
    if (
      tool === TOOLS.POINTER ||
      tool === TOOLS.HAND ||
      action.current !== ACTION.DRAWING
    )
      return;
    if (!stageRef.current) return;

    const cur = trueCursorPos(stageRef.current);
    if (!cur) return;

    switch (tool) {
      case TOOLS.RECT:
      case TOOLS.DIAMOND:
        let rect = rects[rects.length - 1];
        rect.height = cur.y - rect.y;
        rect.width = tool === TOOLS.RECT ? cur.x - rect.x : rect.height;

        rects.splice(rects.length - 1, 1, rect);
        setRects(rects.concat());
        break;
      case TOOLS.CIRCLE:
        let circle = circles[circles.length - 1];
        circle.radius = Math.sqrt(
          (cur.x - circle.x) ** 2 + (cur.y - circle.y) ** 2,
        );

        circles.splice(circles.length - 1, 1, circle);
        setCircles(circles.concat());
        break;
      case TOOLS.SCRIBBLE:
        let scribble = scribbles[scribbles.length - 1];
        scribble.points = scribble.points.concat([cur.x, cur.y]);

        scribbles.splice(scribbles.length - 1, 1, scribble);
        setScribbles(scribbles.concat());
        break;
      case TOOLS.LINE:
      case TOOLS.ARROW:
        let line = lines[lines.length - 1];
        line.points = [line.points[0], line.points[1], cur.x, cur.y];

        lines.splice(lines.length - 1, 1, line);
        setLines(lines.concat());
        break;
      default:
        break;
    }
  };

  const handleLayerDrag = () => {
    if (!bgRef.current) return;
    if (!stageRef.current) return;

    const bg = bgRef.current;
    const stage = stageRef.current;
    bg.absolutePosition({ x: 0, y: 0 });
    bg.size({
      width: window.innerWidth / stage.scaleX(),
      height: window.innerHeight / stage.scaleY(),
    });
  };

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    // stop default scrolling
    e.evt.preventDefault();
    if (!stageRef.current) return;

    const scaleBy = 1.01;
    const stage = stageRef.current;

    const oldScale = stage.scaleX();
    const pos = stage.getPointerPosition();
    if (!pos) return;

    // const mousePointTo = {
    //   x: (pos.x - stage.x()) / oldScale,
    //   y: (pos.y - stage.y()) / oldScale,
    // };
    const cur = trueCursorPos(stage);
    if (!cur) return;

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1;

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction;
    }

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });
    stage.absolutePosition({
      x: pos.x - cur.x * newScale,
      y: pos.y - cur.y * newScale,
    });
    handleLayerDrag();
  };

  return {
    rects,
    circles,
    lines,
    scribbles,
    handlePtrDown,
    handlePtrMove,
    handlePtrUp,
    handleWheel,
    handleLayerDrag,
    setRects,
    setCircles,
    setLines,
    setScribbles,
  };
}

export default useDrawingTool;
