import styled from "styled-components";
import { COLORS } from "./constants";

export const ToolbarDiv = styled.div<{ $isDark?: boolean }>`
  background-color: ${(props) =>
    props.$isDark ? "rgb(34, 48, 60, 1)" : "rgb(255, 255, 255, 1)"};
  border: ${(props) =>
    props.$isDark ? "1px solid #192229" : "1px solid #e6e6e6"};
  border-radius: 10px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.02),
    0 -1px 2px 0 rgba(0, 0, 0, 0.02);
  width: fit-content;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export const Button = styled.button<{ $set?: boolean; $isDark?: boolean }>`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isDark
      ? props.$set
        ? COLORS.DISCORDBLUE
        : COLORS.DARKBLUE
      : props.$set
        ? COLORS.LIGHTPURPLE
        : COLORS.WHITE};
  border: 0px;
  border-radius: 10px;
  margin: 0 2px;
  padding: 6px 6px 4px;
  &: hover {
    background-color: ${(props) =>
      props.$isDark
        ? props.$set
          ? COLORS.DISCORDBLUE
          : COLORS.LIGHTPURPLE
        : props.$set
          ? COLORS.LIGHTPURPLE
          : COLORS.GREY};
  }
`;

export const ColorButton = styled.button<{
  $set?: boolean;
  $isDark?: boolean;
  $color?: string;
}>`
  cursor: pointer;
  background-color: ${(props) => props.$color || COLORS.BLACK};
  background-clip: content-box, padding-box;
  border-color: ${COLORS.WHITE};
  height: 2em;
  width: 2em;
  border: ${(props) =>
    props.$set
      ? props.$isDark
        ? "1px solid #ffffff"
        : "1px solid #000000"
      : "none"};
  padding: 2px;
  border-radius: 10px;
  margin: 5px 3px 0px;
`;

export const EditableDiv = styled.div<{ $fontSize?: number }>`
  width: fit-content;
  line-height: 1;
  // textAlign: center;
  margin: 0px;
  background: none;
  outline: none;
  resize: none;
  overflow-x: visible;
  font-size: ${(props) => props.$fontSize}px;
  font-family: Indie Flower;
  font-weight: bold;
  white-space: pre-wrap;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 6px 4px;
`;

export const Switch = styled.div`
  position: relative;
  width: 30px;
  height: 16px;
  background: ${COLORS.LIGHTPURPLE};
  border-radius: 32px;
  padding: 2px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 35px;
    top: 50%;
    left: 2px;
    background: ${COLORS.WHITE};
    transform: translate(0, -50%);
  }
`;

export const Input = styled.input`
  display: none;

  &:checked + ${Switch} {
    background: ${COLORS.DISCORDBLUE};
    &:before {
      transform: translate(16px, -50%);
    }
  }
`;
