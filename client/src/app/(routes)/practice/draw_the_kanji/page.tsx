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
        onGradeSelection,
        onDrawingSubmission,
        onTestSizeSelection,
        hasSelectedGrade,
        hasSelectedTestSize,
        currentKanji,
        hasSubmittedDrawing,
        onNextButtonClick,
        isSubmitButtonHidden,
        setIsSubmitButtonHidden,
        isCorrect,
        isGameOver,
        score,
        testSize,
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

                                ( /* If the app is not loading, display the DrawTheKanjiBoard component */
                                    <DrawTheKanjiBoard currentKanji={currentKanji} onDrawingSubmission={onDrawingSubmission} 
                                        hasSubmittedDrawing={hasSubmittedDrawing} onNextButtonClick={onNextButtonClick}
                                        isCorrect={isCorrect} isGameOver={isGameOver} score={score} testSize={testSize}
                                        isSubmitButtonHidden={isSubmitButtonHidden} setIsSubmitButtonHidden={setIsSubmitButtonHidden}
                                    />
                                )
                        ) :
                        ( /* If a test size has been selected, display the TestSizeSetter component */
                            <TestSizeSetter onTestSizeSelection={onTestSizeSelection} sizes={[10, 20, 30]}/>
                        ) 
                ) :

                ( /* If a grade has not been selected, display the GradeSelection component */
                    <GradeSelection onGradeSelection={onGradeSelection} pageName="Draw the Kanji" />
                )
            }
       </>
    )
} 

export default DrawTheKanji;