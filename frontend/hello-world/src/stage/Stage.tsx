import { Stage, Layer, Rect, Line } from "react-konva";
import { useRef, useState } from "react";
import {
  PiPaintBrush,
  PiRectangle,
  PiCircle,
  PiDiamond,
  PiHandLight,
  PiCylinder,
  PiTextAa,
  PiArrowRight,
  PiDownload,
} from "react-icons/pi";
import Konva from "konva";
import { Button } from "./styled";
import { Rectangle, Scribble, TOOLS } from "./constants";

export default function StageComponent() {
  const stageRef = useRef<Konva.Stage>(null);
  const [tool, setTool] = useState(TOOLS.HAND);
  const [bgCol, setBgCol] = useState("#FFFFFF");
  const isDrawing = useRef(false);

  const [rects, setRects] = useState<Rectangle[]>([]);
  const [scribbles, setScribbles] = useState<Scribble[]>([]);

  function handlePtrDown() {
    if (tool === TOOLS.HAND) return;
    if (!stageRef.current) return;

    isDrawing.current = true;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    switch (tool) {
      case TOOLS.RECT:
        setRects([...rects, { x: pos.x, y: pos.y, height: 20, width: 20 }]);
        break;
      case TOOLS.SCRIBBLE:
        setScribbles([...scribbles, { points: [pos.x, pos.y] }]);
        break;
      default:
        break;
    }
  }

  function handlePtrUp() {
    isDrawing.current = false;
  }

  function handlePtrMove() {
    if (!isDrawing.current) return;

    if (tool === TOOLS.HAND) return;
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    switch (tool) {
      case TOOLS.RECT:
        let lastRect = rects[rects.length - 1];
        lastRect.height = pos.y - lastRect.y;
        lastRect.width = pos.x - lastRect.x;

        rects.splice(rects.length - 1, 1, lastRect);
        setRects(rects.concat());
        break;
      case TOOLS.SCRIBBLE:
        let lastScribble = scribbles[scribbles.length - 1];
        lastScribble.points = lastScribble.points.concat([pos.x, pos.y]);

        scribbles.splice(scribbles.length - 1, 1, lastScribble);
        setScribbles(scribbles.concat());
        break;
      default:
        break;
    }
  }

  function handleSave() {
    const uri = stageRef?.current?.toBlob;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button onClick={() => setTool(TOOLS.HAND)}>
          <PiHandLight size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.SCRIBBLE)}>
          <PiPaintBrush size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.RECT)}>
          <PiRectangle size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.CIRCLE)}>
          <PiCircle size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.DIAMOND)}>
          <PiDiamond size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.CYLINDER)}>
          <PiCylinder size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.ARROW)}>
          <PiArrowRight size="2em" />
        </Button>
        <Button onClick={() => setTool(TOOLS.TEXT)}>
          <PiTextAa size="2em" />
        </Button>
        <Button onClick={() => {}}>
          <PiDownload size="2em" />
        </Button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={handlePtrDown}
        onPointerUp={handlePtrUp}
        onPointerMove={handlePtrMove}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill={bgCol}
          ></Rect>

          {rects.map((rect) => (
            <Rect
              x={rect.x}
              y={rect.y}
              height={rect.height}
              width={rect.width}
              stroke="#df4b26"
              strokeWidth={2}
            />
          ))}

          {scribbles.map((scribble) => (
            <Line points={scribble.points} stroke="#df4b26" strokeWidth={2} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
