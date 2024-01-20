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
   

    const onGradeSelection = async (grade: number) => {
        const endpointURL = `http://localhost:5000/practiceData/drawTheKanjiData/${grade}`;
        const response = await axios.get(endpointURL);
        setKanjis(response.data);
        setIsPlayMode(true);
        setIsLoading(false);
    }

    const onDrawingSubmission = async (dataURL: string) => {

        // Remove the prefix from the dataURL
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");
        try {
            const response = await axios.post(process.env.IMAGE_CLASSIFICATION_URL, { image: base64Image, kanji_utf: currentKanji?.ka_utf });
            let isCorrect = response.data;
            setCurrentKanjiIndex(prevVal => prevVal + 1);
            if(isCorrect) {
                setScore(prevVal => prevVal + 1);
            }
            console.log(score);
        } catch (error) {
            console.error('Error:', error);
        }
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
        setIsPlayMode,
    }
}

export default useKanjiDrawing;