import { useEffect, useRef } from "react";
import { Html } from "react-konva-utils";
import { ACTION, TextType, TOOLS } from "../common/constants";
import { handleMouseOut, handleMouseOver } from "../common/eventHandlers";
import { EditableDiv } from "../common/styled";

type TextAreaInputProps = {
  text: TextType;
  action: React.MutableRefObject<string>;
  setTexts: React.Dispatch<React.SetStateAction<TextType[]>>;
  setTool: React.Dispatch<React.SetStateAction<string>>;
};

const TextAreaInput = ({
  text,
  action,
  setTexts,
  setTool,
}: TextAreaInputProps) => {
  const textRef = useRef<HTMLInputElement>(null);

  // Autofocuses on current Text element, IF we are typing THIS particular element
  useEffect(() => {
    if (text.typing && textRef.current) textRef.current.focus();
  }, [textRef, text.typing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Emulate Shift-Enter on just Enter. Just Enter does not register as
    // additional height, which causes issues when handling Blur().
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      // The following could all be replaced with literally just
      // document.execCommand("insertLineBreak");
      // Unfortunately execCommand() is deprecated. And of course
      // there is no official replacement for it.

      const selection = document.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();

      const br = document.createElement("br");

      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);

      selection.removeAllRanges();
      selection.addRange(range);
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleBlur();
    }
  };

  // Persists our div's changes to top level and sets typing to false
  // This will trigger a switch from "Editable" TextAreaInput component
  // to "Static" StaticKonvaText component
  const handleBlur = () => {
    if (!textRef.current) return;

    const newText = textRef.current.innerText;

    // textRef.current.offsetWidth is weird. See commit summary for explanation.
    // I'm forced to do the following

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      context.font = `bold ${text.fontSize}px Indie Flower`;

      const lines = textRef.current.innerText.split("\n");
      let maxWidth = 0;

      lines.forEach((line) => {
        const lineWidth = context.measureText(line).width;
        if (lineWidth > maxWidth) {
          maxWidth = lineWidth;
        }
      });

      const newHeight = textRef.current.offsetHeight;
      const newWidth = maxWidth + 1;

      setTexts((prevTexts) => {
        let idx = prevTexts.findIndex((cand) => cand.id === text.id);
        prevTexts.splice(idx, 1, {
          ...text,
          height: newHeight,
          width: newWidth,
          text: newText,
          typing: false,
        });
        return prevTexts.concat();
      });
      action.current = ACTION.NONE;
      setTool(TOOLS.HAND);
    }
  };

  return (
    <Html
      groupProps={{ x: text.x, y: text.y }}
      divProps={{
        style: { color: text.color },
      }}
    >
      <EditableDiv
        $fontSize={text.fontSize}
        contentEditable
        ref={textRef}
        id={text.id}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseOver={() => handleMouseOver("text")}
        onMouseOut={handleMouseOut}
        suppressContentEditableWarning
      >
        {text.text}
      </EditableDiv>
    </Html>
  );
};

export default TextAreaInput;
