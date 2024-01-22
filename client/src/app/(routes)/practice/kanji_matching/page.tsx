"use client";
import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import KanjiMatchBoard from "@/app/_components/(practice)/(kanji_matching)/KanjiMatchBoard";
import useKanjiMatch from "@/app/_custom_hooks/useKanjiMatch";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";
import TestSizeSetter from "@/app/_components/(practice)/TestSizeSetter";

const KanjiMatching: FC = () => {
    const {
        kanjiMeaningPairs,
        onGradeSelection,
        isLoading,
        hasSelectedGrade,
        hasSelectedTestSize,
        onTestSizeSelection,
    } = useKanjiMatch();

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
                                    <KanjiMatchBoard kanjiMeaningPairs={kanjiMeaningPairs} />                                            
                                )
                        ) :
                        ( /* If a test size has been selected, display the TestSizeSetter component */
                            <TestSizeSetter onTestSizeSelection={onTestSizeSelection} />
                        ) 
                ) :

                ( /* If a grade has not been selected, display the GradeSelection component */
                    <GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Recognition" />
                )
            }
        </>
    )

}

export default KanjiMatching;