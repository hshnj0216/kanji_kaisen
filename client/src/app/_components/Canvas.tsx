import { MutableRefObject, RefObject, FC } from "react";
import useDrawing from "../_custom_hooks/useDrawing";

interface ICanvasProps {
	onMouseUp?: (dataURL: string) => void;
	onDrawingSubmission?: (dataURL: string) => void;
	clearInferredKanjis?: () => void;
}

const Canvas: FC<ICanvasProps> = ({onMouseUp, onDrawingSubmission, clearInferredKanjis }) => {
	const {canvasRef, clearCanvas} = useDrawing();

	return (
		<div className="flex items-center flex-col items-center justify-center p-5 h-1/2
				 border-slate-50 cursor-crosshair"
		>
			<div className="grid grid-cols-1 grid-rows-1 bg-red-500 p-3 m-3">
				<canvas
					className="col-start-1 col-end-2 row-start-1 row-end-2 border border-slate-50 bg-black z-0"
					width={224}
					height={224}
					ref={canvasRef}
					onMouseUp={onMouseUp ? ()=>onMouseUp(canvasRef?.current?.toDataURL('image/png')) : undefined}

				/>
				<div className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-2 grid-rows-2 z-20 h-56 pointer-events-none">
					<div className="border border-slate-50 border-opacity-80"></div>
					<div className="border border-slate-50 border-opacity-80"></div>
					<div className="border border-slate-50 border-opacity-80"></div>
					<div className="border border-slate-50 border-opacity-80"></div>

				</div>
			</div>

			<div className="flex justify-between">
				<button
					type="button"
					title="Clear canvas"
					onClick={() => { 
						clearCanvas();
						if (typeof clearInferredKanjis === 'function') {
							clearInferredKanjis();
						}
					}}
					className="border rounded px-3 bg-slate-50 text-black"

				>
					Clear
				</button>
				{onDrawingSubmission && (
					<button
						type="button"
						title="Submit drawing"
						onClick={() => onDrawingSubmission(canvasRef?.current?.toDataURL('image/png'))}
						className="border rounded px-3 bg-slate-300 text-white"
					>
						Submit
					</button>
				)}

			</div>
		</div>
	);
};

export default Canvas;
