import { useState, useEffect } from "react"
import axios from "axios";
import useLoading from "./useLoading";

const useKanjiQuiz = () => {
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState(false);
    const {isLoading, setIsLoading} = useLoading();


    const onGradeSelection = async (grade: number) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/practiceData/kanjiRecognitionData/${grade}`);
            setFullQuizItems(response.data);
            setIsLoading(false);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    };

    return { fullQuizItems, isPlayMode, onGradeSelection, setIsPlayMode, isLoading };
}

export default useKanjiQuiz;