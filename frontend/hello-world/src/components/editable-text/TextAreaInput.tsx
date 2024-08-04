import { useEffect, useRef } from "react";
import { Html } from "react-konva-utils";
import { ACTION, TextType } from "../constants";

type TextAreaInputProps = {
  text: TextType;
  action: React.MutableRefObject<string>;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
};

const TextAreaInput = ({ text, action, setTexts }: TextAreaInputProps) => {
  const textRef = useRef<HTMLInputElement>(null);

  // Autofocuses on current Text element, IF we are typing THIS particular element
  useEffect(() => {
    if (text.typing && textRef.current) textRef.current.focus();
  }, [textRef, text.typing]);

  // Persists our div's changes to top level and sets typing to false
  // This will trigger a switch from "Editable" TextAreaInput component
  // to "Static" StaticKonvaText component
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    setTexts((prevTexts) => {
      let idx = prevTexts.findIndex((cand) => cand.id === text.id);
      prevTexts.splice(idx, 1, {
        id: text.id,
        x: text.x,
        y: text.y,
        text: evt.target.innerText,
        typing: false,
        color: text.color,
      });
      return prevTexts.concat();
    });
    action.current = ACTION.NONE;
  };

  return (
    <Html
      groupProps={{ x: text.x, y: text.y }}
      divProps={{ style: { opacity: 1 } }}
    >
      <div
        contentEditable
        ref={textRef}
        id={text.id}
        onBlur={handleBlur}
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