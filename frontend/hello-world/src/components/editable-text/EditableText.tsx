import { ACTION, TextType } from "../constants";
import TextAreaInput from "./TextAreaInput";
import StaticKonvaText from "./StaticKonvaText";
import Konva from "konva";

type EditableTextProps = {
  text: TextType;
  action: React.MutableRefObject<string>;
  handleClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;

  // My Plan is to have this component jump between TextAreaInput and the
  // StaticKonvaText components.
  // I'll toggle between them depending on whether we're editing on not.
  // During that toggle I can update the value of texts.

  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

// A couple problems left:

// 1) I can't re-edit the same textbox. Double clicking just creates a new
// Text Element
// 2) I probably need an onDragStart/onDragEnd event handler
// 3) width and height aren't being passed from TextAreaInput to Static
// 4) I can drag elements even if I'm not using "HAND" tool. This is
// probably fine, but could cause problems

const EditableText = ({
  text,
  action,
  handleClick,
  setTexts,
}: EditableTextProps) => {
  return text.typing ? (
    <TextAreaInput text={text} action={action} setTexts={setTexts} />
  ) : (
    <StaticKonvaText text={text} handleClick={handleClick} />
  );
};

export default EditableText;
