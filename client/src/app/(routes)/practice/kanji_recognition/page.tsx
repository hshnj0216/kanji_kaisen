"use client";
import { FC } from "react";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiQuiz from "@/app/_custom_hooks/useKanjiQuiz";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";

const KanjiRecognition: FC = () => {
    const { fullQuizItems, isPlayMode, onGradeSelection, setIsPlayMode, isLoading} = useKanjiQuiz();

    return (
        <>
            {isPlayMode ? (
                <KanjiRecognitionQuiz
                    fullQuizItems={fullQuizItems}  
                    onTakeAnotherTestClick={setIsPlayMode}
                />
                
            ) : (
                isLoading ? (<BouncingBallLoadingIndicator />) : 
                (<GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Recognition"></GradeSelection>)
            )}
        </>
    )
}

export default KanjiRecognition;