import { Stage, Layer, Rect, Circle, Transformer, Line } from "react-konva";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import {
  TOOLS,
  RectType,
  CircleType,
  LineType,
  TextType,
  ACTION,
  COLORS,
} from "./constants";
import Toolbar from "./Toolbar";
import EditableText from "./editable-text/EditableText";
import { Html } from "react-konva-utils";
import LineArrow from "./shapes/LineArrow";
import { handleMouseOut, handleMouseOver } from "./eventHandlers";

export default function StageComponent() {
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [tool, setTool] = useState(TOOLS.HAND);
  const [bgCol, setBgCol] = useState("#FFFFFF");
  const [color, setColor] = useState("#000000");
  const [selected, setSelected] = useState<Konva.Node | null>(null);

  useEffect(() => {
    trRef.current?.nodes([]);
    if (!selected) {
      document.body.style.cursor = "default";
    } else if (selected.name() !== "LineArrow") {
      trRef.current?.nodes([selected]);
    }
  }, [selected]);

  const action = useRef(ACTION.NONE);
  const isDraggable = tool === TOOLS.HAND;

  const [rects, setRects] = useState<RectType[]>([]);
  const [circles, setCircles] = useState<CircleType[]>([]);
  const [lines, setLines] = useState<LineType[]>([]);
  const [scribbles, setScribbles] = useState<LineType[]>([]);
  const [texts, setTexts] = useState<TextType[]>([]);

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

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== TOOLS.HAND) return;
    setSelected(e.currentTarget);
  };

  const handleDblTapClick = () => {
    if (!stageRef.current) return;

    setSelected(null);
    action.current = ACTION.TYPING;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    const existing = texts.find(
      (text) =>
        pos.x >= text.x &&
        pos.x <= text.x + text.width &&
        pos.y >= text.y &&
        pos.y <= text.y + text.height,
    );

    // problem here with rotation. If we rotate, we can't find this properly
    // Also when we do find it, the editable div resets to horizontal orientation
    if (existing) {
      setTexts((prevTexts) => {
        let idx = prevTexts.findIndex((cand) => cand.id === existing.id);
        prevTexts.splice(idx, 1, { ...existing, typing: true });
        return [...prevTexts];
      });
    } else {
      const id = Date.now().toString();

      setTexts((prevTexts) => [
        ...prevTexts,
        {
          id,
          x: pos.x,
          y: pos.y,
          text: "Text",
          fontSize: 16,
          typing: true,
          color,
          width: 100,
          height: 100,
        },
      ]);
    }
  };

  const handleSave = () => {
    const uri = stageRef?.current?.toBlob;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && selected) {
        const nodeId = selected.id();

        // The following is inefficient but I don't care
        // There's a simple way to fix it by adding some "type" string field
        // to every Shape Type we have
        // Which I would do
        // But I don't care lol. I don't see anyone adding so many shapes that
        // this actually has some performance effect
        setRects(rects.filter((rect) => rect.id !== nodeId));
        setCircles(circles.filter((circle) => circle.id !== nodeId));
        setLines(lines.filter((line) => line.id !== nodeId));
        setScribbles(scribbles.filter((scribble) => scribble.id !== nodeId));
        setTexts(texts.filter((text) => text.id !== nodeId));
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, rects, circles, lines, texts]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerDown={handlePtrDown}
      onDblClick={handleDblTapClick}
      onDblTap={handleDblTapClick}
      onPointerUp={handlePtrUp}
      onPointerMove={handlePtrMove}
    >
      <Layer>
        <Html
          divProps={{
            style: {
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "15px",
            },
          }}
        >
          <Toolbar
            tool={tool}
            setTool={setTool}
            color={color}
            setColor={setColor}
            setSelected={setSelected}
          />
        </Html>
        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          fill={bgCol}
          onClick={() => {
            setSelected(null);
          }}
        ></Rect>

        <Transformer
          ref={trRef}
          rotateEnabled={selected?.name() === "Text"}
          anchorCornerRadius={2}
          anchorStroke={COLORS.PURPLE}
          padding={8}
          borderStroke={COLORS.PURPLE}
        />

        {rects.map((rect) => (
          <Rect
            id={rect.id}
            key={rect.id}
            name={"Rect"}
            // I know you are wondering what all this maths is about
            // But don't worry about it.
            // Trust.
            // I'm a genius.
            x={Math.min(rect.x, rect.x + rect.width)}
            y={Math.min(rect.y, rect.y + rect.height)}
            height={Math.abs(rect.height)}
            width={Math.abs(rect.width)}
            rotation={rect.rotate}
            cornerRadius={10}
            stroke={rect.color}
            strokeWidth={2}
            strokeScaleEnabled={false}
            hitStrokeWidth={15}
            onClick={handleSelect}
            onMouseOver={() => handleMouseOver("move")}
            onMouseOut={handleMouseOut}
            draggable={isDraggable}
            onDragStart={handleSelect}
          />
        ))}

        {circles.map((circle) => (
          <Circle
            id={circle.id}
            key={circle.id}
            name={"Circle"}
            x={circle.x}
            y={circle.y}
            radius={circle.radius}
            stroke={circle.color}
            strokeWidth={2}
            strokeScaleEnabled={false}
            hitStrokeWidth={15}
            onClick={handleSelect}
            onMouseOver={() => handleMouseOver("move")}
            onMouseOut={handleMouseOut}
            draggable={isDraggable}
            onDragStart={handleSelect}
          />
        ))}

        {lines.map((line) => (
          <LineArrow
            key={line.id}
            line={line}
            isDraggable={isDraggable}
            setLines={setLines}
            selected={selected}
            handleSelect={handleSelect}
          />
        ))}

        {scribbles.map((scribble) => (
          <Line
            id={scribble.id}
            key={scribble.id}
            name={"Scribble"}
            points={scribble.points}
            stroke={scribble.color}
            strokeWidth={2}
            strokeScaleEnabled={false}
            hitStrokeWidth={15}
            lineCap={"round"}
            draggable={isDraggable}
            onDragStart={handleSelect}
            onClick={handleSelect}
            onMouseOver={() => handleMouseOver("move")}
            onMouseOut={handleMouseOut}
          />
        ))}

        {texts.map((text) => (
          <EditableText
            key={text.id}
            text={text}
            action={action}
            isDraggable={isDraggable}
            handleSelect={handleSelect}
            setTexts={setTexts}
            setTool={setTool}
          />
        ))}
      </Layer>
    </Stage>
  );
}
