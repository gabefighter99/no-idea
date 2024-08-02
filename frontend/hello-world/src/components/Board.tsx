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

  const saveImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) console.error("Canvas not found");

    const blob = canvas?.toBlob(async (blob) => {
      console.log("blob:", blob);
      const formData = new FormData();
      formData.append("file", blob as Blob, "blob.png");
      console.log("formData:", formData);

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      try {
        const response = await fetch("http://localhost:8080/saveBoard", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Image saved!");
        } else {
          console.error("Failed to save image");
        }
      } catch (e) {
        console.error(e);
      }
    }, "image/png");
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={2000}
        height={1000}
        style={{ backgroundColor: "lightblue" }}
      />
      <button onClick={saveImage}>Save</button>
    </div>
  );
};

export default Board;
