import { useState, useEffect } from "react"
import axios from "axios";
import useLoading from "./useLoading";

const useKanjiQuiz = () => {
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState<boolean>(false);
    const {isLoading, setIsLoading} = useLoading();
    const [grade, setGrade] = useState<number>();
    const [testSize, setTestSize] = useState<number>();
    const [hasSelectedTestSize, setHasSelectedTestSize] = useState<boolean>(false);
    const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(false);


    const onGradeSelection = (grade: number) => {
        setGrade(grade);
        setHasSelectedGrade(true);
    };

    const onTestSizeSelection = async (testSize: number) => {
        setTestSize(testSize);
        setHasSelectedTestSize(true);
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/practiceData/kanjiRecognitionData/${grade}/${testSize}`);
        setFullQuizItems(response.data);
        setIsLoading(false);
        setIsPlayMode(true);
    }

    return { fullQuizItems, 
        isPlayMode, 
        onGradeSelection, 
        setIsPlayMode, 
        isLoading, 
        onTestSizeSelection, 
        hasSelectedTestSize,
        hasSelectedGrade,
    };
}

export default useKanjiQuiz;