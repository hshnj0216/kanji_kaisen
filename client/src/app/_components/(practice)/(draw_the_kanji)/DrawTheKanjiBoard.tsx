"use client";
import { FC } from "react";
import Canvas from "../../Canvas";
import BouncingBallLoadingIndicator from "../../BouncingBallsLoadingIndicator";
import Link from "next/link";

interface IDrawTheKanjiBoardProps{
    currentKanji: any;
    onDrawingSubmission: (dataURL: string) => void;
    onNextButtonClick: () => void;
    hasSubmittedDrawing: boolean;
    isCorrect: boolean;
    isGameOver: boolean;
    score: number;
    testSize: number | undefined;
}
 
const DrawTheKanjiBoard: FC<IDrawTheKanjiBoardProps> = ({onDrawingSubmission, currentKanji, 
    onNextButtonClick, hasSubmittedDrawing, isCorrect, isGameOver, score, testSize}) => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-3 border border-slate-50 rounded">
            {currentKanji ? (
                <div className="flex flex-col items-center p-3 border border-slate-50 rounded h-3/4 w-3/4">
                    <p className="text-slate-50 text-center text-5xl w-full select-none mb-3">{currentKanji?.meaning}</p>
                    <div className="h-full grid grid-cols-12 gap-3">
                        <div className="col-start-1 col-end-5 border flex border-slate-50 select-none">
                            {hasSubmittedDrawing ? (
                                <div className="flex flex-col justify-center items-center w-full pb-14">
                                    <p className="text-slate-50 text-3xl text-center mb-3">Correct answer</p>
                                    <video autoPlay loop className="h-56 w-56">
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
                        <div className="col-start-5 col-end-9 border border-slate-50 flex items-center justify-center">
                            <Canvas onDrawingSubmission={onDrawingSubmission} />
                        </div>
                        <div className="col-start-9 col-end-13 border rounded p-3 flex flex-col items-center justify-center">
                            {!isGameOver ? (
                                hasSubmittedDrawing ? (
                                    <>
                                        <p className="text-3xl text-center text-slate-50 mb-5 select-none">
                                            {isCorrect ? "Great job! Your drawing matches the Kanji perfectly. Keep up the good work!" :
                                                "Your drawing doesn't quite match the expected Kanji."
                                            }
                                        </p>
                                        <button type="button" className="p-3 text-slate-800 bg-slate-300 rounded" onClick={onNextButtonClick}>
                                            Proceed to next item
                                        </button>
                                    </>
                                ) : ""
                            ) : (
                                <>
                                    <p className="text-3xl text-slate-50 mb-5 select-none">
                                        Game Over! You got {score}/{testSize}!
                                    </p>
                                    <Link href="/practice/">
                                        <button type="button">
                                            Return to game selection
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            ) : (<BouncingBallLoadingIndicator />)}
        </div>
    )
}

export default DrawTheKanjiBoard; 