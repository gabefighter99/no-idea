import { Html } from "react-konva-utils";
import { TextType } from "../constants";

type EditableTextAreaProps = {
  text: TextType;
  // Initially, I was thinking of updating the value of the text in question
  // every time a a keystroke happens.
  // But now I think this is completely unnecessary.
  // My Plan is to have this EditableTextArea and the StaticKonvaText components
  // be wrapped in one and to toggle between them depending on wheether we're
  // editing on not.
  // During that toggle I can update the value I need to.

  // texts: TextType[];
  // setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

const EditableTextArea = ({ text }: EditableTextAreaProps) => {
  return (
    <Html
      groupProps={{ x: text.x, y: text.y }}
      divProps={{ style: { opacity: 1 } }}
    >
      <div
        contentEditable
        id={text.id}
        onKeyDown={() => {
          // setTexts
        }}
        style={{
          left: text.x,
          top: text.y,
          width: "max-content",
          // textAlign: "center",
          padding: "0px",
          margin: "0px",
          background: "none",
          outline: "none",
          resize: "none",
          overflow: "hidden",
          fontFamily: "Indie Flower",
          fontWeight: "bold",
          whiteSpace: "pre-wrap",
        }}
      >
        {text.text}
      </div>
    </Html>
  );
};

export default EditableTextArea;
