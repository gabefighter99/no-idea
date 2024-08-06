import {
  PiPaintBrush,
  PiRectangle,
  PiCircle,
  PiDiamond,
  PiHandLight,
  PiTextAa,
  PiArrowRight,
  PiDownload,
} from "react-icons/pi";
import Konva from "konva";
import { TOOLS } from "./constants";
import { Button, ColorButton, ColorDiv, ColorInput } from "./styled";

type ToolbarProps = {
  trRef: React.RefObject<Konva.Transformer>;
  tool: string;
  setTool: (value: React.SetStateAction<string>) => void;
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
};

const Toolbar = ({ trRef, tool, setTool, color, setColor }: ToolbarProps) => {
  const iconSize = "1.7em";
  const handleSelectTool = (selectedTool: string) => {
    // Deselect transformer
    trRef.current?.nodes([]);
    setTool(selectedTool);
  };

  const handleColorChange = (selectedColor: string) => {
    trRef.current?.nodes([]);
    setColor(selectedColor);
  };

  return (
    <div
      style={{
        border: "1px solid #e6e6e6",
        borderRadius: "10px",
        boxShadow:
          "0 1px 2px 0 rgba(0, 0, 0, 0.02), 0 -1px 2px 0 rgba(0, 0, 0, 0.02)",
        marginInline: "auto",
        width: "fit-content",
        marginTop: "15px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <Button
        $set={tool === TOOLS.HAND}
        onClick={() => handleSelectTool(TOOLS.HAND)}
      >
        <PiHandLight size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.SCRIBBLE}
        onClick={() => handleSelectTool(TOOLS.SCRIBBLE)}
      >
        <PiPaintBrush size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.RECT}
        onClick={() => handleSelectTool(TOOLS.RECT)}
      >
        <PiRectangle size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.CIRCLE}
        onClick={() => handleSelectTool(TOOLS.CIRCLE)}
      >
        <PiCircle size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.DIAMOND}
        onClick={() => handleSelectTool(TOOLS.DIAMOND)}
      >
        <PiDiamond size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.ARROW}
        onClick={() => handleSelectTool(TOOLS.ARROW)}
      >
        <PiArrowRight size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.TEXT}
        onClick={() => handleSelectTool(TOOLS.TEXT)}
      >
        <PiTextAa size={iconSize} />
      </Button>
      <Button onClick={() => {}}>
        <PiDownload size={iconSize} />
      </Button>
      <ColorButton
        $set={color === "#53d1df"}
        $color={"#53d1df"}
        onClick={() => handleColorChange("#53d1df")}
      />
      <ColorButton
        $set={color === "#e53f71"}
        $color={"#e53f71"}
        onClick={() => handleColorChange("#e53f71")}
      />
      <ColorButton
        $set={color === "#6a5acd"}
        $color={"#6a5acd"}
        onClick={() => handleColorChange("#6a5acd")}
      />
      <ColorButton
        $set={color === "#000000"}
        onClick={() => handleColorChange("#000000")}
      />
    </div>
  );
};

export default Toolbar;
