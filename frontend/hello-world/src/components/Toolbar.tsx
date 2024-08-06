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
import { Button, ColorDiv, ColorInput } from "./styled";

type ToolbarProps = {
  trRef: React.RefObject<Konva.Transformer>;
  setTool: (value: React.SetStateAction<string>) => void;
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
};

const Toolbar = ({ trRef, setTool, color, setColor }: ToolbarProps) => {
  function handleSelectTool(tool: string) {
    // Deselect transformer
    trRef.current?.nodes([]);
    setTool(tool);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Button onClick={() => handleSelectTool(TOOLS.HAND)}>
        <PiHandLight size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.SCRIBBLE)}>
        <PiPaintBrush size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.RECT)}>
        <PiRectangle size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.CIRCLE)}>
        <PiCircle size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.DIAMOND)}>
        <PiDiamond size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.ARROW)}>
        <PiArrowRight size="2em" />
      </Button>
      <Button onClick={() => handleSelectTool(TOOLS.TEXT)}>
        <PiTextAa size="2em" />
      </Button>
      <Button onClick={() => {}}>
        <PiDownload size="2em" />
      </Button>
      <ColorDiv>
        <ColorInput
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </ColorDiv>
    </div>
  );
};

export default Toolbar;
