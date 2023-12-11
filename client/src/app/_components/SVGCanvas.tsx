"use client";
import { eventNames } from "process";
import { FC, useRef, useState } from "react";

const SVGCanvas = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef(null);

  const startDrawing = (event) => {
    const { clientX, clientY } = event.nativeEvent;
    const svgRect = svgRef.current.getBoundingClientRect();
    setCurrentPath([{ x: clientX - svgRect.left, y: clientY - svgRect.top }]);
    setIsDrawing(true);
  };

  const continueDrawing = (event) => {
    if (isDrawing) {
      const { clientX, clientY } = event.nativeEvent;
      const svgRect = svgRef.current.getBoundingClientRect();
      setCurrentPath((prevPath) => [...prevPath, { x: clientX - svgRect.left, y: clientY - svgRect.top }]);
    }
  };

  const endDrawing = () => {
    if (isDrawing && currentPath.length > 1) {
      setPaths((prevPaths) => [...prevPaths, currentPath]);
    }
    setCurrentPath([]);
    setIsDrawing(false);
  };


  return (
    <div>
      <svg
        ref={svgRef}
        xmlns="https://www.w3.org/2000/svg"
        stroke="red"
        viewBox="0 0 300 300"
        width="300"
        height="300"
        fill="white"
        className="border border-slate-800 bg-slate-50"
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={endDrawing}
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={`M ${path.map((point) => `${point.x},${point.y}`).join(' L')}`}
            fill="none"
            stroke="black"
          />
        ))}
        {currentPath.length > 1 && (
          <path
            d={`M ${currentPath.map((point) => `${point.x},${point.y}`).join(' L')}`}
            fill="none"
            stroke="black"
          />
        )}
      </svg>
    </div>
  )
}

export default SVGCanvas;