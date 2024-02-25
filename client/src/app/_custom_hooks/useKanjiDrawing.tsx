import axios from "axios";
import { useState, useEffect, useRef } from "react";
import useLoading from "./useLoading";

interface IKanji{
    ka_utf: string;
}

const useKanjiDrawing = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjis, setKanjis] = useState([]);
    const [score, setScore] = useState(0);
    const [currentKanji, setCurrentKanji] = useState<IKanji>();
    const {isLoading, setIsLoading} = useLoading();
    const [grade, setGrade] = useState<number>();
    const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(false);
    const [testSize, setTestSize] = useState<number | undefined>();
    const [hasSelectedTestSize, setHasSelectedTestSize] = useState<boolean>(false);
    const [hasSubmittedDrawing, setHasSubmittedDrawing] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isSubmitButtonHidden, setIsSubmitButtonHidden] = useState(false);
   

    const onGradeSelection = (grade: number) => {
       setGrade(grade);
       setHasSelectedGrade(true);
    }

    const onTestSizeSelection = async (testSize: number) => {
        setTestSize(testSize);
        setHasSelectedTestSize(true);
        const endpointURL = `http://localhost:5000/practiceData/drawTheKanjiData/${grade}/${testSize}`;
        const response = await axios.get(endpointURL);
        setKanjis(response.data);
        setIsLoading(false);
    }

    const onDrawingSubmission = async (dataURL: string) => {
        // Remove the prefix from the dataURL
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");
        const url = process.env.IMAGE_CLASSIFICATION_URL;
        if (!url) {
            throw new Error('IMAGE_CLASSIFICATION_URL is not defined');
        }
        try {
            const response = await axios.post(url, { image: base64Image, kanji_utf: currentKanji?.ka_utf});          
            const result = response.data;
            setHasSubmittedDrawing(true);
            setIsCorrect(response.data);
            if(result) {
                setScore(prevVal => prevVal + 1);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    const onNextButtonClick = () => {
        setHasSubmittedDrawing(false);
        setIsCorrect(false);
        if(kanjis.length > 0) {
            setCurrentKanji(kanjis.pop());
        } else {
            setIsGameOver(true);
        }
    }

    useEffect(() => {
        setCurrentKanji(kanjis.pop());
    }, [kanjis]);


    return {
        onGradeSelection,
        onDrawingSubmission,
        currentKanji,
        isLoading,
        setIsLoading,
        isPlayMode,
        onTestSizeSelection,
        hasSelectedGrade,
        hasSelectedTestSize,
        onNextButtonClick,
        hasSubmittedDrawing,
        isSubmitButtonHidden,
        setIsSubmitButtonHidden,
        isCorrect,
        isGameOver,
        score,
        testSize,
    }
}

export default useKanjiDrawing;