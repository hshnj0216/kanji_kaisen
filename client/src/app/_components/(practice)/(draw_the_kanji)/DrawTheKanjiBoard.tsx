"use client";
import { FC } from "react";
import Canvas from "../../Canvas";
import BouncingBallLoadingIndicator from "../../BouncingBallsLoadingIndicator";

interface IDrawTheKanjiBoardProps{
    currentKanji: any;
    onDrawingSubmission: (dataURL: string) => void;
    onNextButtonClick: () => void;
    hasSubmittedDrawing: boolean;
}
 
const DrawTheKanjiBoard: FC<IDrawTheKanjiBoardProps> = ({onDrawingSubmission, currentKanji, onNextButtonClick, hasSubmittedDrawing}) => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-3 border border-slate-50 rounded">
            {currentKanji ? (
                <div className="flex flex-col items-center p-3 border border-slate-50 rounded h-3/4 w-3/4">
                    <p className="text-slate-50 text-center text-5xl w-full select-none mb-3">{currentKanji?.meaning}</p>
                    <div className="grid grid-cols-12 grid-rows-6 gap-3">
                        <div className="col-start-1 col-end-5 border flex p-3 border-slate-50">
                            {hasSubmittedDrawing ? (
                                <div className="flex flex-col items-center w-full">
                                    <p className="text-slate-50 text-3xl text-center">Correct answer</p>
                                    <video autoPlay loop>
                                        currentKanji.kanji.video.mp4 && (
                                            <source src={currentKanji?.kanji.video.mp4} type="video/mp4"/>
                                        )
                                        currentKanji.kanji.video.webm && (
                                            <source src={currentKanji?.kanji.video.webm} type="video/webm"/>
                                        )
                                 </video>
                                </div>
                            ) : ""}
                        </div>
                        <div className="col-start-5 col-end-9 border border-slate-50 flex items-center">
                            <Canvas onDrawingSubmission={onDrawingSubmission} />
                        </div>
                        <div className="col-start-9 col-end-13 border rounded p-3 flex items-center justify-center">
                            <button type="button" className="p-3 text-slate-800 bg-slate-300 rounded" onClick={onNextButtonClick}>
                                Proceed to next item
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<BouncingBallLoadingIndicator />)}
        </div>
    )
}

export default DrawTheKanjiBoard; 