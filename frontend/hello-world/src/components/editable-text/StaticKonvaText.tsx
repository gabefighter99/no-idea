import Konva from "konva";
import { Text } from "react-konva";
import { TextType } from "../constants";

type StaticKonvaTextProps = {
  text: TextType;
  handleSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

const StaticKonvaText = ({
  text,
  handleSelect,
  setTexts,
}: StaticKonvaTextProps) => {
  return (
    <Text
      id={text.id}
      x={text.x}
      y={text.y}
      text={text.text}
      height={text.height}
      width={text.width}
      fontFamily={"Indie Flower"}
      fontSize={16}
      fontStyle={"bold"}
      onClick={handleSelect}
      draggable
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
