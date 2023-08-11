"use client";
import axios from "axios";
import { FC, useState } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import KanjiMatchBoard from "@/app/_components/(practice)/(kanji_matching)/KanjiMatchBoard";


const KanjiMatching: FC = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjiMeaningPairs, setKanjiMeaningPairs] = useState([]);

    //Makes a request to the server 
    //Fetches the kanji data
    const onGradeSelection = async (grade) => {
        // Make a request to the getKanji endpoint with the selected grade
        try {
            const response = await axios.get(`http://localhost:5000/getKanjiMatchData/${grade}`);
            setKanjiMeaningPairs(response.data);
            setIsPlayMode(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {isPlayMode ? (
                <KanjiMatchBoard kanjiMeaningPairs={kanjiMeaningPairs}></KanjiMatchBoard>
            ) : (
                <GradeSelection onGradeSelection={onGradeSelection}></GradeSelection>
            )}
        </div>
    )

}

export default KanjiMatching;