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

export type Rectangle = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export type Scribble = {
  points: number[];
};
