"use client";
import { FC, useEffect, useState } from "react";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import axios from "axios";
import GradeSelection from "@/app/_components/(practice)/(kanji_recognition)/GradeSelection";

const KanjiRecognition: FC = () => {
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState(false);  

    const onGradeSelection = async (level) => {
        // Make a request to the getKanji endpoint with the selected grade
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiList/${level}`);
            setFullQuizItems(response.data);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {!isPlayMode ? (
                <GradeSelection onGradeSelection={onGradeSelection}></GradeSelection>
            ) : (
               <KanjiRecognitionQuiz
                    fullQuizItems={fullQuizItems}  
                    onTakeAnotherTestClick={setIsPlayMode}
               >
               </KanjiRecognitionQuiz>
            )}
        </div>
    )
}

export default KanjiRecognition;