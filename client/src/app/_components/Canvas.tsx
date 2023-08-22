import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
/* eslint-disable react/display-name */

const Canvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    clear: () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    },
    toDataURL: () => {
      console.log(canvasRef.current);
      return canvasRef.current.toDataURL();
    }
  }));

  const isInsideCanvas = (e) => {
    const pos = getMousePos(e);
    return pos.x >= 0 && pos.x <= canvasRef.current.width &&
      pos.y >= 0 && pos.y <= canvasRef.current.height;
  };

  const handleMouseDown = (e) => {
    if (isInsideCanvas(e)) {
      isDrawingRef.current = true;
      lastPosRef.current = getMousePos(e);
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDrawingRef.current && isInsideCanvas(e)) {
      const pos = getMousePos(e);
      drawLine(lastPosRef.current, pos);
      lastPosRef.current = pos;
    }
  };

  const getMousePos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const drawLine = (start, end) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    //Set stroke color to Tailwind's slate-800
    ctx.strokeStyle = '#0F172A';
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas className="border border-red-600 bg-slate-50" ref={canvasRef} {...props} />;
});

export default Canvas;
