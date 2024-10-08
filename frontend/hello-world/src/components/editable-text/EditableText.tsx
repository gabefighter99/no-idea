import { TextType } from "../common/constants";
import TextAreaInput from "./TextAreaInput";
import StaticKonvaText from "./StaticKonvaText";
import Konva from "konva";

type EditableTextProps = {
  text: TextType;
  action: React.MutableRefObject<string>;
  isDraggable: boolean;
  handleSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
};

// Toggle between editable TextAreaInput and Static Konva-displayable,
// resizeable and draggable StaticKonvaText components depending on whether
// we're editing or not.
const EditableText = ({
  text,
  action,
  isDraggable,
  handleSelect,
  setTexts,
  setTool,
}: EditableTextProps) => {
  return text.typing ? (
    <TextAreaInput
      text={text}
      action={action}
      setTexts={setTexts}
      setTool={setTool}
    />
  ) : (
    <StaticKonvaText
      text={text}
      isDraggable={isDraggable}
      handleSelect={handleSelect}
      setTexts={setTexts}
    />
  );
};

export default EditableText;
