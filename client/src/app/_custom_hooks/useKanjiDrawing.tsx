import axios from "axios";
import { useState, useEffect, useRef } from "react";
import useLoading from "./useLoading";

const useKanjiDrawing = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjis, setKanjis] = useState([]);
    const [score, setScore] = useState(0);
    const [currentKanji, setCurrentKanji] = useState();
    const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
    const {isLoading, setIsLoading} = useLoading();
    const [grade, setGrade] = useState<number>();
    const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(false);
    const [testSize, setTestSize] = useState<number>();
    const [hasSelectedTestSize, setHasSelectedTestSize] = useState<boolean>(false);
    const [hasSubmittedDrawing, setHasSubmittedDrawing] = useState<boolean>(false);
   

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
        try {
            const response = await axios.post(process.env.IMAGE_CLASSIFICATION_URL, { image: base64Image, kanji_utf: currentKanji?.ka_utf});          
            setHasSubmittedDrawing(true);
            const isCorrect = response.data;
            if(isCorrect) {
                setScore(prevVal => prevVal + 1);
            }
            console.log(score);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onNextButtonClick = () => {
        if(currentKanjiIndex < testSize) {
            setCurrentKanjiIndex(prevVal => prevVal + 1);
        }
        setHasSubmittedDrawing(false);
    }

    useEffect(() => {
        setCurrentKanji(kanjis[currentKanjiIndex]);
    }, [currentKanjiIndex, kanjis]);



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
    }
}

export default useKanjiDrawing;