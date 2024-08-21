import { CircleType, LineType, RectType, TextType } from "./constants";

type Shape = RectType | CircleType | LineType | TextType;

const applyToShapes = (
  setRects: (value: React.SetStateAction<RectType[]>) => void,
  setCircles: (value: React.SetStateAction<CircleType[]>) => void,
  setLines: (value: React.SetStateAction<LineType[]>) => void,
  setScribbles: (value: React.SetStateAction<LineType[]>) => void,
  setTexts: (value: React.SetStateAction<TextType[]>) => void,
  fn: (items: Shape[]) => Shape[],
) => {
  setRects((prev) => fn(prev) as RectType[]);
  setCircles((prev) => fn(prev) as CircleType[]);
  setLines((prev) => fn(prev) as LineType[]);
  setScribbles((prev) => fn(prev) as LineType[]);
  setTexts((prev) => fn(prev) as TextType[]);
};

export { applyToShapes };
