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
};

export type CircleType = {
  x: number;
  y: number;
  radius: number;
};

export type LineType = {
  points: number[];
};

export type TextType = {
  x: number;
  y: number;
  text: string;
};
