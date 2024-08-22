import { ChangeEvent } from "react";
import { PiSun, PiMoon } from "react-icons/pi";
import { COLORS } from "../common/constants";
import { Input, Label, Switch, ToolbarDiv } from "../common/styled";

type ToggleSwitchProps = {
  color: string;
  setColor: (value: React.SetStateAction<string>) => void;
  isDark: boolean;
  setIsDark: (value: React.SetStateAction<boolean>) => void;
};

const ToggleSwitch = ({
  color,
  setColor,
  isDark,
  setIsDark,
}: ToggleSwitchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && color === COLORS.BLACK) {
      setColor(COLORS.WHITE);
    }
    if (!e.target.checked && color === COLORS.WHITE) {
      setColor(COLORS.BLACK);
    }
    setIsDark(e.target.checked);
  };

  return (
    <ToolbarDiv $isDark={isDark}>
      <Label>
        <PiSun
          color={isDark ? COLORS.WHITE : COLORS.BLACK}
          style={{ margin: "0 2px", padding: "0 6px 0 0" }}
          size={"1.6em"}
        />
        <Input checked={isDark} type="checkbox" onChange={handleChange} />
        <Switch />
        <PiMoon
          color={isDark ? COLORS.WHITE : COLORS.BLACK}
          style={{ margin: "0 2px", padding: "0 0 0 6px" }}
          size={"1.6em"}
        />
      </Label>
    </ToolbarDiv>
  );
};

export default ToggleSwitch;
