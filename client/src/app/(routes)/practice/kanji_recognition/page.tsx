"use client";
import { FC, useEffect, useState } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import axios from "axios";
import styles from '@/app/practice.module.scss';

const KanjiRecognition: FC = () => {
    const [level, setLevel] = useState(null);
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [quizItems, setQuizItems] = useState([]);
    const [quizItem, setQuizItem] = useState({});
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState<object[]>([]);
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

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

    const handleQuizItemComplete = () => {
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
            // Handle end of game
        }
    };

    useEffect(() => {
        if (quizItems.length > 0 && isPlayMode == true) {
            handleQuizItemComplete();
        }
    }, [isPlayMode]);

    const handleLevelSelect = async (level) => {
        setLevel(level);
        // Make a request to the getKanji endpoint with the selected level
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiList/${level}`);
            setQuizItems(response.data);
            setFullQuizItems(response.data);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOptionSelect = (meaning) => {
        console.log(styles);
        setSelectedOption(meaning);
        if (meaning === quizItem.meaning.english) {
            setScore(score + 1);
        }
        console.log(`quizItem is: ${quizItem.meaning.english}`);
        setTimeout(() => handleQuizItemComplete(), 3000);
    }

    return (
        <div>
            {!isPlayMode ? (
                <>
                    <h3 className="text-slate-50 text-4xl text-center my-3">Select a JLPT level:</h3>
                    <div className="flex">
                        <ModeCard title="N5" description="Basic" onClick={() => handleLevelSelect(5)}></ModeCard>
                        <ModeCard title="N4" description="Elementary" onClick={() => handleLevelSelect(4)}></ModeCard>
                        <ModeCard title="N3" description="Intermediate" onClick={() => handleLevelSelect(3)}></ModeCard>
                        <ModeCard title="N2" description="Advanced" onClick={() => handleLevelSelect(2)}></ModeCard>
                        <ModeCard title="N1" description="Expert" onClick={() => handleLevelSelect(1)}></ModeCard>
                    </div>

                </>
            ) : (
                // Render board
                <div className="flex justify-center items-center h-90">
                    <div className="w-1/2 border rounded p-3 border-slate-50 flex-col items-center">
                        <h2 className="text-slate-50 text-5xl">Score: {score}</h2>
                        <div className="">
                            <p className="text-slate-50 text-15xl text-center">{quizItem?.character}</p>
                        </div>
                        <ul className="flex flex-col items-center">
                            {options.map(option =>
                                <li
                                    className={`p-3 my-3 border rounded w-1/2 text-center cursor-pointer
                                        ${selectedOption === option.meaning.english ? styles['selected-option'] : ""}
                                        ${selectedOption === "" ? "bg-slate-50" : 
                                            (option.meaning.english === quizItem.meaning.english) ? 
                                                "bg-green-400 text-slate-50" : 
                                                "bg-red-400 text-slate-50"}
                                    `}
                                    key={option.character}
                                    onClick={() => handleOptionSelect(option.meaning.english)}
                                >
                                    {option?.meaning?.english}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default KanjiRecognition;