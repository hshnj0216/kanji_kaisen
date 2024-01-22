"use client";
import { useState, FC, useEffect } from "react";
import styles from '@/app/styles/practice.module.scss';
import Link from "next/link";
import useKanjiQuizGame from "@/app/_custom_hooks/useKanjiQuizGame";

export interface IQuizItem {
    character: string;
    meaning: string;
}
interface IKanjiRecognitionQuizProps {
    fullQuizItems: IQuizItem[];
    onTakeAnotherTestClick: (newState: boolean) => void;
}

const KanjiRecognitionQuiz: FC<IKanjiRecognitionQuizProps> = ({ fullQuizItems, onTakeAnotherTestClick }) => {
    const {
        isQuizOver,
        score,
        options,
        quizItem,
        selectedOption,
        onOptionSelect,
        isOptionSelected,
    } = useKanjiQuizGame(fullQuizItems);


    return (
        <div className="flex justify-center items-center h-full">
            {!isQuizOver ? (
                <div className="w-1/2 border rounded p-3 border-slate-50 flex-col items-center mt-8">
                    <div className="bg-slate-800 border rounded border-slate-50 mb-2 w-2/6 mx-auto">
                        <h2 className="text-slate-50 text-5xl text-center mb-2">Score: {score}</h2>
                    </div>
                    <div className="w-1/2 mx-auto p-3 border rounded border-slate-50 mb-5">
                        <p className="text-slate-50 md:text-9xl lg:text-15xl text-center">{quizItem?.ka_utf}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        {options.map(option =>
                            <button
                                type="button"
                                className={`p-3 my-3 border rounded w-1/2 text-center cursor-pointer
                            ${selectedOption === option.meaning ? styles['selected-option'] : ""}
                            ${selectedOption === "" ? "bg-slate-50" :
                                        (option.meaning === quizItem.meaning) ?
                                            "bg-green-400 text-slate-50" :
                                            "bg-red-400 text-slate-50"}
                            `}
                                key={option._id}
                                onClick={() => onOptionSelect(option.meaning)}
                                disabled={isOptionSelected}
                            >
                                {option.meaning}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-1/2 border rounded p-3 border-slate-50 flex-col justify-center items-center mt-8">
                    <div className="mb-5">
                        <p className="text-7xl text-slate-50 text-center">You scored:</p>
                        <p className="text-9xl text-slate-50 text-center">{score}/{fullQuizItems.length}</p>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/">
                            <button className="border rounded bg-slate-50 p-3 m-3" type="button">Return to Main Menu</button>
                        </Link>
                        <button
                            className="border rounded bg-slate-50 p-3 m-3"
                            onClick={() => onTakeAnotherTestClick(false)}
                            type="button"
                        >
                            Take Another Test
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default KanjiRecognitionQuiz;