import Konva from "konva";
import { Text } from "react-konva";
import { TextType } from "../constants";

type StaticKonvaTextProps = {
  text: TextType;
  handleClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const StaticKonvaText = ({ text, handleClick }: StaticKonvaTextProps) => {
  return (
    <Text
      x={text.x}
      y={text.y}
      text={text.text}
      height={100}
      width={100}
      fontFamily={"Indie Flower"}
      fontSize={16}
      fontStyle={"bold"}
      onClick={handleClick}
      draggable
    />
  );
};

export default StaticKonvaText;
