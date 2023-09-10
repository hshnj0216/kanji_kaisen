"use client";
import { FC } from "react";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiQuiz from "@/app/_custom_hooks/useKanjiQuiz";

const KanjiRecognition: FC = () => {
    const { fullQuizItems, isPlayMode, onGradeSelection, setIsPlayMode } = useKanjiQuiz();

    return (
        <>
            {isPlayMode ? (
                <KanjiRecognitionQuiz
                    fullQuizItems={fullQuizItems}  
                    onTakeAnotherTestClick={setIsPlayMode}
                />
                
            ) : (
                <GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Recognition"></GradeSelection>
            )}
        </>
    )
}

export default KanjiRecognition;