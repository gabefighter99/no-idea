import { Text } from "react-konva";
import { TextType } from "../constants";

export default function StaticKonvaText(text: TextType) {
  return <Text x={text.x} y={text.y} text={text.text} />;
}
