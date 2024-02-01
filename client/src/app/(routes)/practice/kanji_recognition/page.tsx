"use client";
import { FC } from "react";
import KanjiRecognitionQuiz from "@/app/_components/(practice)/(kanji_recognition)/KanjiRecognitionQuiz";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiQuiz from "@/app/_custom_hooks/useKanjiQuiz";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";
import TestSizeSetter from "@/app/_components/(practice)/TestSizeSetter";

const KanjiRecognition: FC = () => {
    const { fullQuizItems,
        isPlayMode,
        onGradeSelection,
        onTestSizeSelection,
        setIsPlayMode,
        isLoading,
        hasSelectedTestSize,
        hasSelectedGrade,
    } = useKanjiQuiz();

    return (
        <>
            { /* Check if a grade has been selected */}
            {hasSelectedGrade ?

                ( /* If a grade has been selected, check if a test size has been selected */
                    hasSelectedTestSize ?
                            ( /* If a test size has not been selected, check if the app is loading */
                            isLoading ?

                                ( /* If the app is loading, display a loading indicator */
                                    <BouncingBallLoadingIndicator />
                                ) :

                                ( /* If the app is not loading, display the KanjiRecognitionQuiz component */
                                    <KanjiRecognitionQuiz fullQuizItems={fullQuizItems} onTakeAnotherTestClick={setIsPlayMode}/>
                                )
                        ) :
                        ( /* If a test size has been selected, display the TestSizeSetter component */
                            <TestSizeSetter onTestSizeSelection={onTestSizeSelection} sizes={[10, 20, 30]}/>
                        ) 
                ) :

                ( /* If a grade has not been selected, display the GradeSelection component */
                    <GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Recognition" />
                )
            }
        </>
    )
}

export default KanjiRecognition;