import { useEffect, useRef } from "react";

export const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (startPos: { x: number; y: number }) => {
      drawing = true;
      console.log(`drawing started x=${startPos.x}, y=${startPos.y}`);
      [lastX, lastY] = [startPos.x, startPos.y];
    };
    const draw = (pos: { x: number; y: number }) => {
      if (!drawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }

      [lastX, lastY] = [pos.x, pos.y];
    };

    const endDrawing = () => {
      const canvas = canvasRef.current;
      const dataURL = canvas?.toDataURL();
      drawing = false;
    };

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx) {
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

    canvas?.addEventListener("mousedown", startDrawing);
    canvas?.addEventListener("mousemove", draw);
    canvas?.addEventListener("mouseup", endDrawing);
    canvas?.addEventListener("mouseout", endDrawing);

    return () => {
      canvas?.removeEventListener("mousedown", startDrawing);
      canvas?.removeEventListener("mousemove", draw);
      canvas?.removeEventListener("mouseup", endDrawing);
      canvas?.removeEventListener("mouseout", endDrawing);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={2000}
      height={1000}
      style={{ backgroundColor: "lightblue" }}
    />
  );
};

export default Board;
