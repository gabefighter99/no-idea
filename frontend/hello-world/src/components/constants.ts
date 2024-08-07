export const TOOLS = {
  HAND: "HAND",
  SCRIBBLE: "SCRIBBLE",
  LINE: "LINE",
  ARROW: "ARROW",
  RECT: "RECT",
  CIRCLE: "CIRCLE",
  DIAMOND: "DIAMOND",
  TEXT: "TEXT",
};

export const ACTION = {
  NONE: "NONE",
  DRAWING: "DRAWING",
  TYPING: "TYPING",
};

export const COLORS = {
  CYAN: "#53d1df",
  RUBY: "#e53f71",
  PURPLE: "#6a5acd",
  BLACK: "#000000",
};

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
  fontSize: number;
  height: number;
  width: number;
  typing: boolean;
  text: string;
  color: string;
};
