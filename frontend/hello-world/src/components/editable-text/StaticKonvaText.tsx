import Konva from "konva";
import { useRef } from "react";
import { Text } from "react-konva";
import { TextType } from "../constants";
import { handleMouseOut, handleMouseOver } from "../eventHandlers";

type StaticKonvaTextProps = {
  text: TextType;
  isDraggable: boolean;
  handleSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

const StaticKonvaText = ({
  text,
  isDraggable,
  handleSelect,
  setTexts,
}: StaticKonvaTextProps) => {
  const textRef = useRef<Konva.Text>(null);
  return (
    <Text
      id={text.id}
      key={text.id}
      name={"Text"}
      ref={textRef}
      x={text.x}
      y={text.y}
      text={text.text}
      height={text.height}
      width={text.width}
      fill={text.color}
      fontFamily={"Indie Flower"}
      fontSize={text.fontSize}
      fontStyle={"bold"}
      onClick={handleSelect}
      onMouseOver={() => handleMouseOver("move")}
      onMouseOut={handleMouseOut}
      onTransformEnd={() => {
        if (!textRef.current) return;
        const textNode = textRef.current;
        const newX = textNode.x();
        const newY = textNode.y();
        const newWidth = textNode.width() * textNode.scaleX();
        const newHeight = textNode.height() * textNode.scaleY();
        const newFontSize = textNode.fontSize() * textNode.scaleX();
        textNode.setAttrs({
          scaleX: 1,
          scaleY: 1,
        });
        setTexts((prevs) => {
          const idx = prevs.findIndex((cand) => cand.id === text.id);
          prevs.splice(idx, 1, {
            ...text,
            x: newX,
            y: newY,
            fontSize: newFontSize,
            width: newWidth,
            height: newHeight,
          });
          return prevs.concat();
        });
      }}
      draggable={isDraggable}
      onDragStart={handleSelect}
      onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
        const { x, y } = e.target.attrs;
        setTexts((prevs) => {
          const idx = prevs.findIndex((cand) => cand.id === text.id);
          prevs.splice(idx, 1, {
            ...text,
            x,
            y,
          });
          return prevs.concat();
        });
      }}
    />
  );
};

export default StaticKonvaText;
