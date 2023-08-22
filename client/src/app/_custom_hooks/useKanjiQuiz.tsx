import { useState, useEffect } from "react"
import axios from "axios";

const useKanjiQuiz = () => {
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState(false);

    const onGradeSelection = async (grade: number) => {
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiList/${grade}`);
            setFullQuizItems(response.data);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    };

    return { fullQuizItems, isPlayMode, onGradeSelection, setIsPlayMode };
}

export default useKanjiQuiz;