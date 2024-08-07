import {
  PiPaintBrush,
  PiCircle,
  PiHandLight,
  PiTextAa,
  PiDownload,
} from "react-icons/pi";
import { IoRemoveOutline, IoSquareOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import Konva from "konva";
import { COLORS, TOOLS } from "./constants";
import { Button, ColorButton, ToolbarDiv } from "./styled";

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
    <ToolbarDiv>
      <Button onClick={() => {}}>
        <PiDownload size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.HAND}
        onClick={() => handleSelectTool(TOOLS.HAND)}
      >
        <PiHandLight size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.RECT}
        onClick={() => handleSelectTool(TOOLS.RECT)}
      >
        <IoSquareOutline size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.CIRCLE}
        onClick={() => handleSelectTool(TOOLS.CIRCLE)}
      >
        <PiCircle size={iconSize} />
      </Button>
      {/*
      <Button
        $set={tool === TOOLS.DIAMOND} // this can be just a Rect with 45 degree rotation
        onClick={() => handleSelectTool(TOOLS.DIAMOND)}
      >
        <PiDiamond size={iconSize} />
      </Button>
      */}
      <Button
        $set={tool === TOOLS.ARROW}
        onClick={() => handleSelectTool(TOOLS.ARROW)}
      >
        <HiArrowLongRight size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.LINE}
        onClick={() => handleSelectTool(TOOLS.LINE)}
      >
        <IoRemoveOutline size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.SCRIBBLE}
        onClick={() => handleSelectTool(TOOLS.SCRIBBLE)}
      >
        <PiPaintBrush size={iconSize} />
      </Button>
      <Button
        $set={tool === TOOLS.TEXT}
        onClick={() => handleSelectTool(TOOLS.TEXT)}
      >
        <PiTextAa size={iconSize} />
      </Button>
      <ColorButton
        $set={color === COLORS.CYAN}
        $color={COLORS.CYAN}
        onClick={() => handleColorChange(COLORS.CYAN)}
      />
      <ColorButton
        $set={color === COLORS.RUBY}
        $color={COLORS.RUBY}
        onClick={() => handleColorChange(COLORS.RUBY)}
      />
      <ColorButton
        $set={color === COLORS.PURPLE}
        $color={COLORS.PURPLE}
        onClick={() => handleColorChange(COLORS.PURPLE)}
      />
      <ColorButton
        $set={color === COLORS.BLACK}
        onClick={() => handleColorChange(COLORS.BLACK)}
      />
    </ToolbarDiv>
  );
};

export default Toolbar;
