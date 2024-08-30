import Konva from "konva";
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

// The following function attempts to align along the Y axis
// Virgil font text in a Div to Virgil font in the Konva Text Component
function getOffsetY(fontSize: number, isFirefox: boolean): number {
  if (fontSize < 9 || fontSize > 66) {
    // Font Size should be between 9 and 66
    console.log("Bad Font Size ", fontSize);
  }

  const firefoxThresholds = [21, 26, 39, 43, 56];
  const firefoxOffsets = [-1, -1.5, -2, -2.5, -3, -3.5];

  const otherThresholds = [9, 14, 26, 36, 44, 53, 64];
  const otherOffsets = [-0, -0.5, -1, -1.5, -2, -2.5, -3, -3.5];

  const thresholds = isFirefox ? firefoxThresholds : otherThresholds;
  const offsets = isFirefox ? firefoxOffsets : otherOffsets;

  for (let i = 0; i < thresholds.length; i++) {
    if (fontSize <= thresholds[i]) {
      return offsets[i];
    }
  }

  return offsets[offsets.length - 1];
}

const trueCursorPos = (stage: Konva.Stage) => {
  const pos = stage.getPointerPosition();
  if (!pos) return null;
  return {
    x: (pos.x - stage.x()) / stage.scaleX(),
    y: (pos.y - stage.y()) / stage.scaleY(),
  };
};

export { applyToShapes, getOffsetY, trueCursorPos };
