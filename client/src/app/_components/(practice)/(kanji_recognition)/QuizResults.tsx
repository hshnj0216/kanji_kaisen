import Link from "next/link";
import Carousel from "./Carousel";
import { FC } from "react";
import { IQuizItem } from "./KanjiRecognitionQuiz";
import { IMistake } from "@/app/_custom_hooks/useKanjiQuizGame";

interface IQuizResultsProps {
    score: number;
    fullQuizItems: IQuizItem[];
    mistakes: IMistake[];
}

const QuizResults: FC<IQuizResultsProps> = ({ score, fullQuizItems, mistakes }) => {
    return (
        <div className="w-1/2 border rounded p-3 border-slate-50 flex-col justify-center items-center">
            <div className="mb-5">
                <p className="text-5xl text-slate-50 text-center">You scored:</p>
                <p className="text-7xl text-slate-50 text-center">{score}/{fullQuizItems.length}</p>
            </div>
            {mistakes.length > 0 ? (
                <div className="">
                    <p className="text-3xl text-slate-50 text-center mb-3">Your mistakes:</p>
                    <Carousel mistakes={mistakes} />
                </div>
            ) :
                (<p className="text-2xl text-slate-50 text-center my-3">You got a perfect score!</p>)}
            <div className="flex justify-center">
                <Link href="/practice">
                    <button className="border rounded bg-slate-50 p-3 m-3" type="button">Return to practice menu</button>
                </Link>
                <button
                    className="border rounded bg-slate-50 p-3 m-3"
                    type="button"
                    onClick={() => window.location.reload()}
                >
                    Take Another Test
                </button>
            </div>
        </div>
    )
}

export default QuizResults;