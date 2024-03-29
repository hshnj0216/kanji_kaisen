"use client";
import { useState, FC, useEffect } from "react";
import styles from '@/app/styles/practice.module.scss';
import Link from "next/link";
import useKanjiQuizGame from "@/app/_custom_hooks/useKanjiQuizGame";
import QuizResults from "./QuizResults";

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
        mistakes,
    } = useKanjiQuizGame(fullQuizItems);


    return (
        <div className="flex justify-center items-center h-full">
            {!isQuizOver ? (
                <div className="w-1/2 border rounded p-3 border-slate-50 flex-col items-center mt-8">
                    <div className="bg-slate-800 border rounded border-slate-50 mb-2 w-2/6 mx-auto">
                        <h2 className="text-slate-50 text-5xl text-center mb-2">Score: {score}</h2>
                    </div>
                    <div className="w-1/2 mx-auto p-3 border rounded border-slate-50 mb-5">
                        <p className="text-slate-50 md:text-9xl lg:text-15xl text-center">{quizItem ? quizItem.character : ""}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        {options.map(option =>
                            <button
                                type="button"
                                className={`p-3 my-3 border rounded w-1/2 text-center cursor-pointer
                            ${selectedOption === option.meaning ? styles['selected-option'] : ""}
                            ${selectedOption === "" ? "bg-slate-50" :
                                        (quizItem && option.meaning === quizItem.meaning) ?
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
                <QuizResults score={score} fullQuizItems={fullQuizItems} mistakes={mistakes}/>
            )}
        </div>

    )
}

export default KanjiRecognitionQuiz;