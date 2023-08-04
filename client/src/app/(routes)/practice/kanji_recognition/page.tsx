"use client";
import { FC, useEffect, useState } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import axios from "axios";
import styles from '@/app/practice.module.scss';
import GradeSelection from "@/app/_components/(practice)/(kanji_recognition)/GradeSelection";

const KanjiRecognition: FC = () => {
    const [level, setLevel] = useState(null);
    const [quizItems, setQuizItems] = useState([]);
    const [quizItem, setQuizItem] = useState({});
    const [fullQuizItems, setFullQuizItems] = useState([]);
    const [isPlayMode, setIsPlayMode] = useState(false);  

    const onGradeSelection = async (level) => {
        setLevel(level);
        // Make a request to the getKanji endpoint with the selected level
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiList/${level}`);
            setQuizItems(response.data);
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
               <KanjiRecognitionQuiz></KanjiRecognitionQuiz>
            )}
        </div>
    )
}

export default KanjiRecognition;