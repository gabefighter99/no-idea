export const TOOLS = {
  HAND: "HAND",
  SCRIBBLE: "SCRIBBLE",
  ARROW: "ARROW",
  RECT: "RECT",
  CIRCLE: "CIRCLE",
  DIAMOND: "DIAMOND",
  CYLINDER: "CYLINDER",
  TEXT: "TEXT",
};

export type RectType = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};

export type CircleType = {
  x: number;
  y: number;
  radius: number;
  color: string;
};

export type LineType = {
  points: number[];
  color: string;
};

export type TextType = {
  x: number;
  y: number;
  text: string;
  color: string;
};
