import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';

const useCanvasDrawing = () => {
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
		ctx.lineWidth = 10;
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

    const submitDrawing = async () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/png');

        // Remove the prefix from the dataURL
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");

        try {
            const response = await axios.post('http://localhost:5000/practiceData/imageClassification', { image: base64Image });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    }

	useEffect(() => {
		const canvas = canvasRef.current;

		const handleMouseUpOutsideCanvas = () => {
			setIsDrawing(false);
			lastPos = null;
		};

		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUpOutsideCanvas);

		return () => {
			canvas.removeEventListener('mousedown', handleMouseDown);
			canvas.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUpOutsideCanvas);
		};
	}, [handleMouseDown, handleMouseMove]);

    return {
		canvasRef,
		isDrawing,
		clearCanvas,
        submitDrawing,
	};
}

export default useCanvasDrawing;