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

  texts: TextType[];
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

const EditableText = ({ text, action, handleClick }: EditableTextProps) => {
  return action.current === ACTION.TYPING ? (
    <TextAreaInput text={text} />
  ) : (
    <StaticKonvaText text={text} handleClick={handleClick} />
  );
};

export default EditableText;
