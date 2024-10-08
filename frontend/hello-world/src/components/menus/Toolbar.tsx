import {
  PiPaintBrush,
  PiCircle,
  PiHandLight,
  PiTextAa,
  PiDownload,
} from "react-icons/pi";
import { BsDiamond } from "react-icons/bs";
import { IoRemoveOutline, IoSquareOutline } from "react-icons/io5";
import { HiArrowLongRight } from "react-icons/hi2";
import { LiaMousePointerSolid } from "react-icons/lia";
import Konva from "konva";
import { COLORS, TOOLS } from "../common/constants";
import { Button, ColorButton, ToolbarDiv } from "../common/styled";
import { Html } from "react-konva-utils";

type ToolbarProps = {
  tool: string;
  setTool: (value: React.SetStateAction<string>) => void;
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
  isDark: boolean;
  setSelected: (value: React.SetStateAction<Konva.Node | null>) => void;
};

const Toolbar = ({
  tool,
  setTool,
  color,
  setColor,
  isDark,
  setSelected,
}: ToolbarProps) => {
  const iconSize = "1.7em";
  const handleSelectTool = (selectedTool: string) => {
    // Deselect transformer
    setSelected(null);

    if (selectedTool === TOOLS.HAND) document.body.style.cursor = "grab";
    else document.body.style.cursor = "default";

    setTool(selectedTool);
  };

  const handleColorChange = (selectedColor: string) => {
    setSelected(null);
    setColor(selectedColor);
  };

  return (
    <Html
      divProps={{
        style: {
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "15px",
        },
      }}
    >
      <ToolbarDiv $isDark={isDark}>
        <Button $isDark={isDark} onClick={() => {}}>
          <PiDownload
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.HAND}
          onClick={() => handleSelectTool(TOOLS.HAND)}
        >
          <PiHandLight
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.POINTER}
          onClick={() => handleSelectTool(TOOLS.POINTER)}
        >
          <LiaMousePointerSolid
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.RECT}
          onClick={() => handleSelectTool(TOOLS.RECT)}
        >
          <IoSquareOutline
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.CIRCLE}
          onClick={() => handleSelectTool(TOOLS.CIRCLE)}
        >
          <PiCircle
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.DIAMOND}
          onClick={() => handleSelectTool(TOOLS.DIAMOND)}
        >
          <BsDiamond
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.ARROW}
          onClick={() => handleSelectTool(TOOLS.ARROW)}
        >
          <HiArrowLongRight
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.LINE}
          onClick={() => handleSelectTool(TOOLS.LINE)}
        >
          <IoRemoveOutline
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.SCRIBBLE}
          onClick={() => handleSelectTool(TOOLS.SCRIBBLE)}
        >
          <PiPaintBrush
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <Button
          $isDark={isDark}
          $set={tool === TOOLS.TEXT}
          onClick={() => handleSelectTool(TOOLS.TEXT)}
        >
          <PiTextAa
            color={isDark ? COLORS.WHITE : COLORS.BLACK}
            size={iconSize}
          />
        </Button>
        <ColorButton
          $set={color === COLORS.CYAN}
          $isDark={isDark}
          $color={COLORS.CYAN}
          onClick={() => handleColorChange(COLORS.CYAN)}
        />
        <ColorButton
          $set={color === COLORS.RUBY}
          $isDark={isDark}
          $color={COLORS.RUBY}
          onClick={() => handleColorChange(COLORS.RUBY)}
        />
        <ColorButton
          $set={color === COLORS.PURPLE}
          $isDark={isDark}
          $color={COLORS.PURPLE}
          onClick={() => handleColorChange(COLORS.PURPLE)}
        />
        {isDark ? (
          <ColorButton
            $set={color === COLORS.WHITE}
            $isDark={isDark}
            $color={COLORS.WHITE}
            onClick={() => handleColorChange(COLORS.WHITE)}
          />
        ) : (
          <ColorButton
            $set={color === COLORS.BLACK}
            $isDark={isDark}
            onClick={() => handleColorChange(COLORS.BLACK)}
          />
        )}
      </ToolbarDiv>
    </Html>
  );
};

export default Toolbar;
