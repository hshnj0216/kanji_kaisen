//This hook houses the functionalities for the Canvas component
import { useEffect, useState, useRef, MouseEvent, RefObject, useCallback } from "react";

interface IPosition{
	x: number;
	y: number;
}
const useDrawing = () => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let lastPos: IPosition | null = null;

    const getMousePos = useCallback((e: globalThis.MouseEvent): IPosition => {
        const rect = canvasRef.current!.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }, [canvasRef]);
    
    const isInsideCanvas = useCallback((e: globalThis.MouseEvent): boolean => {
        const pos = getMousePos(e);
        return (
            pos.x >= 0 &&
            pos.x <= canvasRef.current!.width &&
            pos.y >= 0 &&
            pos.y <= canvasRef.current!.height
        );
    }, [getMousePos, canvasRef]);
    
    const drawLine = useCallback((pos: IPosition): void => {
        const ctx = canvasRef.current!.getContext('2d')!;
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
    }, [canvasRef]);
    
    

	const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
        if (isDrawing && isInsideCanvas(e)) {
            const pos = getMousePos(e);
            drawLine(pos);
        }
    }, [isDrawing, isInsideCanvas, getMousePos, drawLine]);
    
    const handleMouseDown = (e: globalThis.MouseEvent) => {
        if (isInsideCanvas(e)) {
            setIsDrawing(true);
            const pos = getMousePos(e);
            drawLine(pos);
        }
    }
    
    const handleMouseUp = useCallback(() => {
        setIsDrawing(false);
        lastPos = null;
    }, [setIsDrawing]);
    
    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [canvasRef]);
    
	

   
	useEffect(() => {
        const canvas = canvasRef.current;
    
        if (canvas) {
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('mouseleave', handleMouseUp);
        }
    
        return () => {
            if (canvas) {
                canvas.removeEventListener('mousedown', handleMouseDown);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseup', handleMouseUp);
                canvas.removeEventListener('mouseleave', handleMouseUp);
            }
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, canvasRef]);
    

    return {
        canvasRef,
        clearCanvas,
    };
};

export default useDrawing;