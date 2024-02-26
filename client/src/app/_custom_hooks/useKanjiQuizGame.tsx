import {useState, useEffect, useRef} from "react";
import { IQuizItem } from "../_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import incorrectChoice from "../sounds/incorrect_choice.mp3";
import correctChoice from "../sounds/correct_choice.mp3";

interface IOption{
    _id: string;
    meaning: string;
}

const useKanjiQuizGame = (fullQuizItems: IQuizItem[]) => {
    const [quizItem, setQuizItem] = useState<IQuizItem | null>(null);
    const [quizItems, setQuizItems] = useState<IQuizItem[]>([...fullQuizItems]);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState<IOption[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [inco]

    const playCorrectChoiceSound = () => {
        const audio = new Audio(correctChoice);
        audio.play();
    }

    const playIncorrectChoiceSound = () => {
        const audio = new Audio(incorrectChoice);
        audio.play();
    }

    // Shuffle an array using sort() and Math.random()
    function shuffle(array: Array<any>) {
        const shuffledArray = array.slice().sort(() => Math.random() - 0.5);
        return shuffledArray;
    }

    const generateFalseOptions = (correctAnswer: IQuizItem) => {
        // Filter out the correct answer from the quizItems array
        let filteredQuizItems = fullQuizItems.filter(item => item !== correctAnswer);
        // Randomly select two false options from the filteredQuizItems array
        let falseOption1 = filteredQuizItems[Math.floor(Math.random() * filteredQuizItems.length)];
        // Remove falseOption1 from filteredQuizItems
        filteredQuizItems = filteredQuizItems.filter(item => item !== falseOption1);
        // Now select falseOption2
        let falseOption2 = filteredQuizItems[Math.floor(Math.random() * filteredQuizItems.length)];
        return [falseOption1, falseOption2];
    };


    const onQuizItemComplete = () => {
        if (quizItems.length > 0) {
            const nextItem: IQuizItem = quizItems.pop() as IQuizItem;
            // Store nextItem in a local variable
            const updatedQuizItem = nextItem;
            // Use updatedQuizItem when generating options
            const generatedOptions = [...generateFalseOptions(updatedQuizItem), updatedQuizItem];
            // Shuffle the generatedOptions array using the shuffle function
            const shuffledOptions = shuffle(generatedOptions);
            // Set the shuffledOptions as the options state
            setOptions(shuffledOptions);
            // Update quizItem state
            setQuizItem(updatedQuizItem);
            setIsOptionSelected(false);
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



    const onOptionSelect = (meaning: string) => {
        setIsOptionSelected(true);
        setSelectedOption(meaning);
        if (quizItem && meaning === quizItem.meaning) {
            playCorrectChoiceSound();
            setScore(score => score + 1);
        } else {
            playIncorrectChoiceSound();
        }
        setTimeout(() => onQuizItemComplete(), 500);
    }

    return {
        onOptionSelect,
        score,
        options,
        selectedOption,
        isOptionSelected,
        isQuizOver,
        quizItem,
    }
}

export default useKanjiQuizGame;