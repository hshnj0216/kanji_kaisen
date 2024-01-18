"use client";
import { FC } from "react";
import Canvas from "../../Canvas";

 
const DrawTheKanjiBoard = ({onDrawingSubmission, currentKanji}) => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-3 border border-slate-50 rounded">
            <div className="text-slate-50 text-center text-5xl m-3">
                <p>Meaning:</p>
                <p>{currentKanji?.meaning}</p>
            </div>
            <Canvas onDrawingSubmission={onDrawingSubmission} />
        </div>
    )
}

export default DrawTheKanjiBoard; 