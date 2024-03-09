"use client";
import { FC } from "react";
import Canvas from "../../Canvas";
import BouncingBallLoadingIndicator from "../../BouncingBallsLoadingIndicator";
import Link from "next/link";
import useDrawing from "@/app/_custom_hooks/useDrawing";
import { motion } from "framer-motion";

interface IDrawTheKanjiBoardProps {
    currentKanji: any;
    onDrawingSubmission: (dataURL: string) => void;
    onNextButtonClick: () => void;
    hasSubmittedDrawing: boolean;
    isCorrect: boolean;
    isGameOver: boolean;
    score: number;
    testSize: number | undefined;
    isSubmitButtonHidden: boolean;
    setIsSubmitButtonHidden: (state: boolean) => void;
}

const DrawTheKanjiBoard: FC<IDrawTheKanjiBoardProps> = ({ onDrawingSubmission, currentKanji,
    onNextButtonClick, hasSubmittedDrawing, isCorrect, isGameOver, score, testSize, isSubmitButtonHidden, setIsSubmitButtonHidden }) => {
    const {canvasRef, clearCanvas} = useDrawing();
    return (
        <div className="h-full w-full flex flex-col items-center justify-center border border-slate-50 rounded">
            {currentKanji ? (
                <div className="flex flex-col items-center p-3 border border-slate-50 rounded h-3/4 w-3/4">
                    <motion.p className="text-slate-50 text-center text-5xl w-full select-none py-3 border-b border-slate-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {isGameOver ? "Game Over!" : currentKanji?.meaning}
                    </motion.p>
                    <div className="h-full grid grid-cols-12 gap-3 w-full">
                        <div className="col-start-1 col-end-5 flex flex-col border-r border-slate-50 select-none">
                            {hasSubmittedDrawing ? (
                                 <motion.p
                                 initial={{ opacity: 0 }}
                                 animate={{ opacity: 1 }}
                                 transition={{ duration: 0.5 }}
                                 className="text-slate-50 text-3xl text-center w-full mb-5 mt-3"
                             >
                                 Correct answer
                             </motion.p>
                            ) : ""}
                            {hasSubmittedDrawing ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col justify-center items-center w-full mt-4"
                                >
                                    <video autoPlay loop className="h-56 w-56">
                                        {currentKanji.kanji.video.mp4 && (
                                            <source src={currentKanji?.kanji.video.mp4} type="video/mp4" />
                                        )}
                                        {currentKanji.kanji.video.webm && (
                                            <source src={currentKanji?.kanji.video.webm} type="video/webm" />
                                        )}
                                    </video>
                                </motion.div>
                            ) : ""}
                        </div>
                        <div className="col-start-5 col-end-9 border-r border-slate-50 flex items-center justify-center">
                            <Canvas onDrawingSubmission={onDrawingSubmission} canvasRef={canvasRef} clearCanvas={clearCanvas}
                                isSubmitButtonHidden={isSubmitButtonHidden} setIsSubmitButtonHidden={setIsSubmitButtonHidden}
                            />
                        </div>
                        <div className="col-start-9 col-end-13 p-3 flex flex-col items-center justify-center">
                            {!isGameOver ? (
                                hasSubmittedDrawing ? (
                                    <>
                                        <motion.p className="text-3xl text-center text-slate-50 mb-5 select-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {isCorrect ? "Great job! Your drawing matches the Kanji perfectly. Keep up the good work!" :
                                                "Your drawing doesn't quite match the expected Kanji."
                                            }
                                        </motion.p>
                                            <motion.button type="button" 
                                            className="p-3 text-slate-800 bg-slate-300 rounded" 
                                            onClick={() => {
                                                onNextButtonClick();
                                                clearCanvas();
                                                setIsSubmitButtonHidden(false);
                                                }
                                            }
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            Proceed to next item
                                        </motion.button>
                                    </>
                                ) : ""
                            ) : (
                                <>
                                    <p className="text-3xl text-slate-50 text-center mb-5 select-none">
                                        You scored {score}/{testSize}!
                                    </p>
                                    <Link href="/practice/">
                                        <button type="button" className="bg-slate-300 p-3 border rounded">
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