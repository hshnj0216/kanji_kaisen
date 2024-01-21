"use client";

import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiDrawing from "@/app/_custom_hooks/useKanjiDrawing";
import DrawTheKanjiBoard from "@/app/_components/(practice)/(draw_the_kanji)/DrawTheKanjiBoard";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";
import TestSizeSetter from "@/app/_components/(practice)/TestSizeSetter";

const DrawTheKanji: FC = () => {

    const {
        isLoading, 
        isPlayMode, 
        onGradeSelection,
        onDrawingSubmission,
        onTestSizeSelection,
        hasSelectedGrade,
        hasSelectedTestSize,
        currentKanji,
    } = useKanjiDrawing();

    return(
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
                                    <DrawTheKanjiBoard currentKanji={currentKanji} onDrawingSubmission={onDrawingSubmission} />
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

export default DrawTheKanji;