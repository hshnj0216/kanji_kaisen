import useCanvasDrawing
 from "../_custom_hooks/useCanvasDrawing";
const Canvas = () => {
	const { canvasRef, isDrawing, clearCanvas, submitDrawing } = useCanvasDrawing();


	return (
		<div>
			<canvas
				className="border border-red-600 bg-black"
				width={224}
				height={224}
				ref={canvasRef}
			/>
			<div className="d-flex justify-between w-50">
				<button 
					type="button" 
					title="Clear canvas" 
					onClick={clearCanvas}
					className="border rounded p-3 bg-slate-300 text-white me-5"
				
				>
					Clear
				</button>
				<button
					type="button" 
					title="Submit drawing" 
					onClick={submitDrawing}
					className="border rounded p-3 bg-slate-300 text-white"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Canvas;
