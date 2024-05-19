import { useRef } from "react";

export const Board = () => {

	const canvasRef = useRef<HTMLCanvasElement>(null);
	return (
		<canvas
			ref={canvasRef}
			width={1000}
			height={1000}
			style={{ backgroundColor: 'lightblue' }}
		/>
	);
};

export default Board;
