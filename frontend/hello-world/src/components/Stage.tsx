import { Stage, Layer, Rect, Circle, Transformer, Line } from "react-konva";
import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { TextType, ACTION, COLORS, TOOLS } from "./common/constants";
import Toolbar from "./menus/Toolbar";
import EditableText from "./editable-text/EditableText";
import LineArrow from "./shapes/LineArrow";
import { handleMouseOut, handleMouseOver } from "./common/eventHandlers";
import useDrawingTool from "./hooks/useDrawingTool";
import ToggleSwitch from "./menus/ToggleSwitch";
import { applyToShapes, trueCursorPos } from "./common/utils";

export default function StageComponent() {
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const bgRef = useRef<Konva.Rect>(null);

  const [tool, setTool] = useState(TOOLS.POINTER);
  const [isDark, setIsDark] = useState(false);
  const [color, setColor] = useState(COLORS.BLACK);
  const [selected, setSelected] = useState<Konva.Node | null>(null);

  const action = useRef(ACTION.NONE);
  const isDraggable = tool === TOOLS.POINTER;

  const [texts, setTexts] = useState<TextType[]>([]);
  const [clickCooldown, setClickCooldown] = useState(false);
  const {
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
  } = useDrawingTool(
    stageRef,
    bgRef,
    action,
    color,
    tool,
    setTool,
    setClickCooldown,
  );

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (tool !== TOOLS.POINTER) return;
    setSelected(e.currentTarget);
  };

  const handleDblTapClick = () => {
    if (tool === TOOLS.HAND) return;
    if (clickCooldown) return;
    if (!stageRef.current) return;

    setSelected(null);
    action.current = ACTION.TYPING;
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();

    if (!pos) return;

    const existing = stage.getIntersection(pos);

    if (existing && existing.name() === "Text") {
      setTexts((prevTexts) => {
        let idx = prevTexts.findIndex((cand) => cand.id === existing.id());
        const prev = prevTexts[idx];
        prevTexts.splice(idx, 1, { ...prev, typing: true });
        return [...prevTexts];
      });
    } else {
      const id = Date.now().toString();

      const cur = trueCursorPos(stage);
      if (!cur) return;

      setTexts((prevTexts) => [
        ...prevTexts,
        {
          id,
          x: cur.x,
          y: cur.y,
          text: " ",
          fontSize: 14,
          typing: true,
          color,
          width: 100,
          height: 100,
        },
      ]);
    }
  };

  // const handleSave = () => {
  //   const uri = stageRef?.current?.toBlob;
  // };

  useEffect(() => {
    trRef.current?.nodes([]);
    if (!selected) {
      document.body.style.cursor = "default";
    } else if (selected.name() !== "LineArrow") {
      trRef.current?.nodes([selected]);
    }
  }, [selected]);

  useEffect(() => {
    if (isDark) {
      applyToShapes(
        setRects,
        setCircles,
        setLines,
        setScribbles,
        setTexts,
        (shapes) =>
          shapes.map((shape) => {
            if (shape.color === COLORS.BLACK)
              return { ...shape, color: COLORS.WHITE };
            return shape;
          }),
      );
    } else {
      applyToShapes(
        setRects,
        setCircles,
        setLines,
        setScribbles,
        setTexts,
        (shapes) =>
          shapes.map((shape) => {
            if (shape.color === COLORS.WHITE)
              return { ...shape, color: COLORS.BLACK };
            return shape;
          }),
      );
    }
  }, [isDark, setRects, setCircles, setLines, setScribbles, setTexts]);

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
        applyToShapes(
          setRects,
          setCircles,
          setLines,
          setScribbles,
          setTexts,
          (shapes) => shapes.filter((shape) => shape.id !== nodeId),
        );
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected, setRects, setCircles, setLines, setScribbles, setTexts]);

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
      onWheel={handleWheel}
      draggable={tool === TOOLS.HAND}
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragMove={handleLayerDrag}
      onDragEnd={() => {
        document.body.style.cursor = "grab";
      }}
    >
      <Layer>
        <Toolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          isDark={isDark}
          setSelected={setSelected}
        />
        <ToggleSwitch
          color={color}
          setColor={setColor}
          isDark={isDark}
          setIsDark={setIsDark}
        />
        <Rect
          ref={bgRef}
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          fill={isDark ? COLORS.DARKPURPLE : COLORS.WHITE}
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
