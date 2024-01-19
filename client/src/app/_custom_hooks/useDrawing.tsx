//This hook houses the functionalities for the Canvas component
import { useEffect, useState, useRef } from "react";

const useDrawing = () => {
    const [isDrawing, setIsDrawing] = useState(false);
	const canvasRef = useRef(null);
	let lastPos = null;

	const getMousePos = (e) => {
		const rect = canvasRef.current.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	};

	const isInsideCanvas = (e) => {
		const pos = getMousePos(e);
		return (
			pos.x >= 0 &&
			pos.x <= canvasRef.current.width &&
			pos.y >= 0 &&
			pos.y <= canvasRef.current.height
		);
	};

	const drawLine = (pos) => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 8;
		ctx.beginPath();
		if (lastPos) {
			ctx.moveTo(lastPos.x, lastPos.y);
			ctx.lineTo(pos.x, pos.y);
			ctx.stroke();

			// Interpolate points
			let x = lastPos.x;
			let y = lastPos.y;
			while (Math.abs(x - pos.x) > 1 || Math.abs(y - pos.y) > 1) {
				x += Math.sign(pos.x - x);
				y += Math.sign(pos.y - y);
				ctx.beginPath();
				ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
				ctx.fill();
			}
		}
		lastPos = pos;
	};

	const handleMouseMove = (e) => {
		if (isDrawing && isInsideCanvas(e)) {
			const pos = getMousePos(e);
			drawLine(pos);
		}
	};

	const handleMouseDown = (e) => {
		if (isInsideCanvas(e)) {
			setIsDrawing(true);
			const pos = getMousePos(e);
			drawLine(pos);
		}
	};

	const handleMouseUp = () => {
		setIsDrawing(false);
		lastPos = null;
	};

	const clearCanvas = () => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
	};

   
	useEffect(() => {
        const canvas = canvasRef.current;

        const handleMouseUpOutsideCanvas = () => {
            setIsDrawing(false);
            lastPos = null;
        };

        const handleMouseDown = (e) => {
            if (isInsideCanvas(e)) {
                setIsDrawing(true);
                const pos = getMousePos(e);
                drawLine(pos);
            }
        };

        const handleMouseMove = (e) => {
            if (isDrawing && isInsideCanvas(e)) {
                const pos = getMousePos(e);
                drawLine(pos);
            }
        };

        canvas?.addEventListener('mousedown', handleMouseDown);
        canvas?.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUpOutsideCanvas);

        // Cleanup function
        return () => {
            canvas?.removeEventListener('mousedown', handleMouseDown);
            canvas?.removeEventListener('mousemove', handleMouseMove);
        };

    }, [isDrawing, handleMouseDown, handleMouseMove]);

    return {
        canvasRef,
        clearCanvas,
    };
};

export default useDrawing;