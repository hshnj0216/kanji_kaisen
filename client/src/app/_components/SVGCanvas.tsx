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

  const clearDrawing = () => {
    setPaths([]);
  }

  const classifyDrawing = () => {

  }


  return (
    <div className="p-3 border-slate-50 border-3 flex flex-col justify-center items-center">
      <svg
        ref={svgRef}
        xmlns="https://www.w3.org/2000/svg"
        stroke="red"
        viewBox="0 0 224 224
        "
        width="224"
        height="224"
        fill="black"
        className="border border-slate-50 bg-black"
        onMouseDown={startDrawing}
        onMouseMove={continueDrawing}
        onMouseUp={endDrawing}
      >
        {paths.map((path, index) => (
          <path
            key={index}
            d={`M ${path.map((point) => `${point.x},${point.y}`).join(' L')}`}
            fill="none"
            stroke="white"
            strokeWidth="12"
          />
        ))}
        {currentPath.length > 1 && (
          <path
            d={`M ${currentPath.map((point) => `${point.x},${point.y}`).join(' L')}`}
            fill="none"
            stroke="white"
            strokeWidth="12"
          />
        )}
      </svg>
      <button className="my-3 mx-auto border rounded bg-slate-300 p-3" onClick={clearDrawing}>
        Clear
      </button>
      <button className="my-3 mx-auto border rounded bg-slate-300 p-3">
        Classify
      </button>
    </div>
  )
}

export default SVGCanvas;