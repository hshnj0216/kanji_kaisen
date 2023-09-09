"use client";
import { useState, FC, useEffect } from "react";
import styles from '@/app/practice.module.scss';
import Link from "next/link";

interface IQuizItem {
    character: string;
    meaning: string;
}
interface IKanjiRecognitionQuizProps {
    fullQuizItems: IQuizItem[];
    onTakeAnotherTestClick: (newState: boolean) => void;
}

const KanjiRecognitionQuiz: FC<IKanjiRecognitionQuizProps> = ({ fullQuizItems, onTakeAnotherTestClick }) => {
    const [quizItem, setQuizItem] = useState(null);
    const [quizItems, setQuizItems] = useState([...fullQuizItems]);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [isQuizOver, setIsQuizOver] = useState(false);

    // Shuffle an array using sort() and Math.random()
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    const generateFalseOptions = (correctAnswer) => {
        // Filter out the correct answer from the quizItems array
        const filteredQuizItems = fullQuizItems.filter((item) => item.meaning !== correctAnswer);
        // Randomly select two false options from the filteredQuizItems array
        let falseOption1 = filteredQuizItems[Math.floor(Math.random() * filteredQuizItems.length)];
        let falseOption2 = filteredQuizItems[Math.floor(Math.random() * filteredQuizItems.length)];
        // Keep selecting a new falseOption2 until it is not equal to falseOption1
        while (falseOption2 === falseOption1) {
            falseOption2 = filteredQuizItems[Math.floor(Math.random() * filteredQuizItems.length)];
        }

        return [falseOption1, falseOption2];
    };

    const onQuizItemComplete = () => {
        if (quizItems.length > 0) {
            const nextItem = quizItems.pop();
            // Store nextItem in a local variable
            const updatedQuizItem = nextItem;
            // Use updatedQuizItem when generating options
            const generatedOptions = [...generateFalseOptions(updatedQuizItem.meaning), updatedQuizItem];
            // Shuffle the generatedOptions array using the shuffle function
            const shuffledOptions = shuffle(generatedOptions);
            // Set the shuffledOptions as the options state
            setOptions(shuffledOptions);
            // Update quizItem state
            setQuizItem(updatedQuizItem);
            setSelectedOption("");
        } else {
            setIsQuizOver(true);
        }
    };

    useEffect(() => {
        if (quizItems.length > 0 && !isQuizOver) {
            onQuizItemComplete();
        }
    }, []);



    const onOptionSelect = (meaning) => {
        setSelectedOption(meaning);
        if (meaning === quizItem.meaning) {
            setScore(score + 1);
        }
        setTimeout(() => onQuizItemComplete(), 3000);
    }


    return (
        <div className="flex justify-center items-center h-90">
            {!isQuizOver ? (
                <div className="w-1/2 border rounded p-3 border-slate-50 flex-col items-center mt-8">
                    <h2 className="text-slate-50 text-5xl">Score: {score}</h2>
                    <div className="w-1/2 mx-auto p-3 border rounded border-slate-50 mb-5">
                        <p className="text-slate-50 md:text-9xl lg:text-15xl text-center">{quizItem?.ka_utf}</p>
                    </div>
                    <ul className="flex flex-col items-center">
                        {options.map(option =>
                            <li
                                className={`p-3 my-3 border rounded w-1/2 text-center cursor-pointer
                            ${selectedOption === option.meaning ? styles['selected-option'] : ""}
                            ${selectedOption === "" ? "bg-slate-50" :
                                        (option.meaning === quizItem.meaning) ?
                                            "bg-green-400 text-slate-50" :
                                            "bg-red-400 text-slate-50"}
                            `}
                                key={option._id}
                                onClick={() => onOptionSelect(option.meaning)}
                            >
                                {option.meaning}
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                <div className="w-1/2 border rounded p-3 border-slate-50 flex-col items-center mt-8">
                    <p className="text-9xl text-slate-50 text-center">You scored:</p>
                    <p className="text-15xl text-slate-50 text-center">{score}/5</p>
                    <div className="flex justify-center">
                        <Link href="/">
                            <button className="border rouded bg-slate-300 p-3 m-3" type="button">Return to Main Menu</button>
                        </Link>
                        <button
                            className="border rouded bg-slate-300 p-3 m-3"
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