import axios from "axios";
import { useState, useEffect, useRef } from "react";
import useLoading from "./useLoading";

const useKanjiDrawing = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjis, setKanjis] = useState([]);
    const [currentKanji, setCurrentKanji] = useState();
    const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
    const {isLoading, setIsLoading} = useLoading();
   

    const onGradeSelection = async (grade: number) => {
        console.log("onGradeSelection called");
        const endpointURL = `http://localhost:5000/practiceData/drawTheKanjiData/${grade}`;
        const response = await axios.get(endpointURL);
        setKanjis(response.data);
        setIsPlayMode(true);
        setIsLoading(false);
        console.log(kanjis);
    }

    const onDrawingSubmission = async (dataURL: string) => {

        // Remove the prefix from the dataURL
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");

        try {
            console.log(`currentKanji: ${currentKanji}`);
            const response = await axios.post('http://localhost:5000/practiceData/imageClassification', { image: base64Image, kanji_utf: currentKanji?.ka_utf });
            console.log(response.data);
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