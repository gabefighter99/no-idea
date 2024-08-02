import { Html } from "react-konva-utils";
import { TextType } from "../constants";

type TextAreaInputProps = {
  text: TextType;
};

const TextAreaInput = ({ text }: TextAreaInputProps) => {
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

export default TextAreaInput;
