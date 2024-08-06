import styled from "styled-components";

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

export const ColorDiv = styled.div`
  width: 2em;
  height: 2em;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  margin: 2px 3px 1px;
`;
export const ColorInput = styled.input`
  width: 150%;
  height: 150%;
  border: none;
  outline: none;
  scale: 3;
`;
