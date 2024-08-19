import styled from "styled-components";

export const ToolbarDiv = styled.div`
  background-color: rgb(255, 255, 255, 1);
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.02),
    0 -1px 2px 0 rgba(0, 0, 0, 0.02);
  width: fit-content;
  display: flex;
  justify-content: center;
  padding: 5px;
`;

export const Button = styled.button<{ $set?: boolean }>`
  background-color: ${(props) => (props.$set ? "#d5c1dc" : "#ffffff")};
  border-color: #ffffff;
  border: 0px;
  border-radius: 10px;
  margin: 0 2px;
  padding: 6px 6px 4px;
  &: hover {
    background-color: ${(props) => (props.$set ? "#d5c1dc" : "#cdcdcd")};
  }
`;

export const ColorButton = styled.button<{ $set?: boolean; $color?: string }>`
  background-color: ${(props) => props.$color || "#000000"};
  background-clip: content-box, padding-box;
  border-color: #ffffff;
  height: 2em;
  width: 2em;
  border: ${(props) => (props.$set ? "1px solid #000000" : "none")};
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
