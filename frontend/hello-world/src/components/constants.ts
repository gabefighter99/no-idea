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

export const ACTION = {
  NONE: "NONE",
  DRAWING: "DRAWING",
  TYPING: "TYPING",
};

export type Shape = RectType | CircleType | LineType | TextType;

export type RectType = {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};

export type CircleType = {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
};

export type LineType = {
  id: string;
  points: number[];
  color: string;
};

export type TextType = {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  typing: boolean;
  text: string;
  color: string;
};
