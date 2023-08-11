"use client";
import { FC, useEffect, useState } from "react";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import axios from "axios";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";

const KanjiRecognition: FC = () => {
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState(false);  

    const onGradeSelection = async (grade) => {
        // Make a request to the getKanji endpoint with the selected grade
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiList/${grade}`);
            setFullQuizItems(response.data);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isPlayMode ? (
                <KanjiRecognitionQuiz
                    fullQuizItems={fullQuizItems}  
                    onTakeAnotherTestClick={setIsPlayMode}
                />
                
            ) : (
                <GradeSelection onGradeSelection={onGradeSelection}></GradeSelection>
            )}
        </div>
    )
}

export default KanjiRecognition;