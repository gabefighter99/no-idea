import {
  Stage,
  Layer,
  Rect,
  Line,
  Arrow,
  Circle,
  Transformer,
} from "react-konva";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import {
  TOOLS,
  RectType,
  CircleType,
  LineType,
  TextType,
  ACTION,
} from "./constants";
import TextAreaInput from "./editable-text/TextAreaInput";
import Toolbar from "./Toolbar";
import StaticKonvaText from "./editable-text/StaticKonvaText";

export default function StageComponent() {
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [tool, setTool] = useState(TOOLS.HAND);
  const [bgCol, setBgCol] = useState("#FFFFFF");
  const [color, setColor] = useState("#6A5ACD");
  const [selected, setSelected] = useState<Konva.Node | null>(null);

  const action = useRef(ACTION.NONE);
  const isDraggable = tool === TOOLS.HAND;

  const [rects, setRects] = useState<RectType[]>([]);
  const [circles, setCircles] = useState<CircleType[]>([]);
  const [lines, setLines] = useState<LineType[]>([]);
  const [arrows, setArrows] = useState<LineType[]>([]);
  const [texts, setTexts] = useState<TextType[]>([]);

  function handlePtrDown() {
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
          { id, x: pos.x, y: pos.y, height: 0, width: 0, color },
        ]);
        break;
      case TOOLS.CIRCLE:
        setCircles([...circles, { id, x: pos.x, y: pos.y, radius: 0, color }]);
        break;
      case TOOLS.SCRIBBLE:
        setLines([...lines, { id, points: [pos.x, pos.y], color }]);
        break;
      case TOOLS.ARROW:
        setArrows([...arrows, { id, points: [pos.x, pos.y], color }]);
        break;
      default:
        break;
    }
  }

  function handlePtrUp() {
    action.current = ACTION.NONE;
  }

  function handlePtrMove() {
    if (tool === TOOLS.HAND || action.current !== ACTION.DRAWING) return;
    if (!stageRef.current) return;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    switch (tool) {
      case TOOLS.RECT:
        let rect = rects[rects.length - 1];
        rect.height = pos.y - rect.y;
        rect.width = pos.x - rect.x;

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
        let scribble = lines[lines.length - 1];
        scribble.points = scribble.points.concat([pos.x, pos.y]);

        lines.splice(lines.length - 1, 1, scribble);
        setLines(lines.concat());
        break;
      case TOOLS.ARROW:
        let arrow = arrows[arrows.length - 1];
        arrow.points = [arrow.points[0], arrow.points[1], pos.x, pos.y];

        arrows.splice(arrows.length - 1, 1, arrow);
        setArrows(arrows.concat());
        break;
      default:
        break;
    }
  }

  function handleClick(e: Konva.KonvaEventObject<MouseEvent>) {
    if (tool !== TOOLS.HAND) return;

    const target = e.currentTarget;
    trRef.current?.nodes([target]);
    setSelected(target as Konva.Node);
  }

  function handleDblTapClick() {
    if (tool !== TOOLS.TEXT) return;
    if (!stageRef.current) return;

    action.current = ACTION.TYPING;

    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    const id = Date.now().toString();

    setTexts([...texts, { id, x: pos.x, y: pos.y, text: "Text", color }]);
  }

  function handleSave() {
    const uri = stageRef?.current?.toBlob;
  }

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
        setArrows(arrows.filter((arrow) => arrow.id !== nodeId));
        setTexts(texts.filter((text) => text.id !== nodeId));

        trRef.current?.nodes([]);
        setSelected(null);
      } else if (action.current === ACTION.TYPING) {
        if (e.key === "Escape") return;

        // amend current text
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, rects, circles, lines, arrows, texts]);

  return (
    <div>
      <Toolbar
        trRef={trRef}
        setTool={setTool}
        color={color}
        setColor={setColor}
      />
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
          <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill={bgCol}
            onClick={() => {
              trRef.current?.nodes([]);
            }}
          ></Rect>

          <Transformer ref={trRef} />

          {rects.map((rect) => (
            <Rect
              id={rect.id}
              // I know you are wondering what all this maths is about
              // But don't worry about it.
              // Trust.
              // I'm a genius.
              x={Math.min(rect.x, rect.x + rect.width)}
              y={Math.min(rect.y, rect.y + rect.height)}
              height={Math.abs(rect.height)}
              width={Math.abs(rect.width)}
              cornerRadius={10}
              stroke={rect.color}
              strokeWidth={3}
              strokeScaleEnabled={false}
              onClick={handleClick}
              draggable={isDraggable}
            />
          ))}

          {circles.map((circle) => (
            <Circle
              id={circle.id}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke={circle.color}
              strokeWidth={3}
              strokeScaleEnabled={false}
              onClick={handleClick}
              draggable={isDraggable}
            />
          ))}

          {lines.map((line) => (
            <Line
              id={line.id}
              points={line.points}
              stroke={line.color}
              strokeWidth={3}
              strokeScaleEnabled={false}
              lineCap={"round"}
              onClick={handleClick}
              draggable={isDraggable}
            />
          ))}

          {arrows.map((arrow) => (
            <Arrow
              id={arrow.id}
              points={arrow.points}
              stroke={arrow.color}
              strokeWidth={3}
              strokeScaleEnabled={false}
              pointerWidth={5}
              lineCap={"round"}
              onClick={handleClick}
              draggable={isDraggable}
            />
          ))}

          {texts.map((text) => (
            <StaticKonvaText text={text} handleClick={handleClick} />
            // <TextAreaInput text={text} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
