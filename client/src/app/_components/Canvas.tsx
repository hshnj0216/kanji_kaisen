import { MutableRefObject, RefObject, FC, useState } from "react";
import useDrawing from "../_custom_hooks/useDrawing";

interface ICanvasProps {
	onDrawingSubmission: (dataURL: string | undefined) => void;
	clearInferredKanjis?: () => void;
	isSubmitButtonHidden?: boolean;
	setIsSubmitButtonHidden?: (state: boolean) => void;
	clearCanvas: () => void;
	canvasRef: RefObject<HTMLCanvasElement>;
}

const Canvas: FC<ICanvasProps> = ({onDrawingSubmission, clearInferredKanjis, setIsSubmitButtonHidden, 
	isSubmitButtonHidden, canvasRef, clearCanvas}) => {
	
	return (
		<div className="flex flex-col items-center justify-center p-5 h-1/2
				 border-slate-50 cursor-crosshair"
		>
			<div className="grid grid-cols-1 grid-rows-1 p-3 m-3 mb-1">
				<canvas
					className="col-start-1 col-end-2 row-start-1 row-end-2 border border-slate-50 bg-black z-0"
					width={224}
					height={224}
					ref={canvasRef}
				/>
				<div className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-2 grid-rows-2 z-20
					 pointer-events-none w-56 h-56">
					<div className="border border-slate-50 border-opacity-70"></div>
					<div className="border border-slate-50 border-opacity-70"></div>
					<div className="border border-slate-50 border-opacity-70"></div>
					<div className="border border-slate-50 border-opacity-70"></div>
				</div>
			</div>

			<div className={`flex justify-evenly w-full mx-5`}>
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
				<button
						type="button"
						title="Submit drawing"
						onClick={() => {
								onDrawingSubmission(canvasRef?.current?.toDataURL('image/png'));
								if(setIsSubmitButtonHidden) {
									setIsSubmitButtonHidden(true);
								}
							}
						}
						className={`border rounded px-3 bg-slate-50 text-black ${isSubmitButtonHidden ? "hidden" : ""}`}
						disabled={isSubmitButtonHidden}
					>
						Submit
				</button>
			</div>
		</div>
	);
};

export default Canvas;
