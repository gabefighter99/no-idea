import { Stage, Layer } from "react-konva";
import { useRef, useState } from "react";
import { PiRectangle, PiCircle, PiDiamond, PiHandLight } from "react-icons/pi";
import Konva from "konva";
import { Button } from "./styled";

export default function StageComponent() {
  const stageRef = useRef<Konva.Stage>(null);
  const [action, setAction] = useState("");

  function onPtrDown() {}

  function onPtrUp() {}

  function onPtrMove() {}

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button onClick={() => setAction("rect")}>
          <PiHandLight size="2em" />
        </Button>
        <Button onClick={() => setAction("rect")}>
          <PiRectangle size="2em" />
        </Button>
        <Button onClick={() => setAction("rect")}>
          <PiCircle size="2em" />
        </Button>
        <Button onClick={() => setAction("rect")}>
          <PiDiamond size="2em" />
        </Button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onPointerDown={onPtrDown}
        onPointerUp={onPtrUp}
        onPointerMove={onPtrMove}
      >
        <Layer></Layer>
      </Stage>
    </div>
  );
}
