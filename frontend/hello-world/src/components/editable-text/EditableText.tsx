import { TextType } from "../constants";
import TextAreaInput from "./TextAreaInput";
import StaticKonvaText from "./StaticKonvaText";
import Konva from "konva";

type EditableTextProps = {
  text: TextType;
  action: React.MutableRefObject<string>;
  handleSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

// Toggle between editable TextAreaInput and Static Konva-displayable,
// resizeable and draggable StaticKonvaText components depending on whether
// we're editing or not.

// Problems left:
// Resizing. When we resize, we need to update height/width and then when
// typing we need to match a new font size

const EditableText = ({
  text,
  action,
  handleSelect,
  setTexts,
}: EditableTextProps) => {
  return text.typing ? (
    <TextAreaInput text={text} action={action} setTexts={setTexts} />
  ) : (
    <StaticKonvaText
      text={text}
      handleSelect={handleSelect}
      setTexts={setTexts}
    />
  );
};

export default EditableText;
