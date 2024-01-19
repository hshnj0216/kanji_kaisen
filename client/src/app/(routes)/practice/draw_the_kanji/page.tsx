"use client";

import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiDrawing from "@/app/_custom_hooks/useKanjiDrawing";
import DrawTheKanjiBoard from "@/app/_components/(practice)/(draw_the_kanji)/DrawTheKanjiBoard";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";

const DrawTheKanji: FC = () => {

    const {
        isLoading, 
        isPlayMode, 
        onGradeSelection,
        onDrawingSubmission,
        currentKanji,
    } = useKanjiDrawing();

    return(
       <>
            {isPlayMode ? ( 
                    <DrawTheKanjiBoard 
                        onDrawingSubmission={onDrawingSubmission}
                        currentKanji={currentKanji}
                    />
                ) : (
                isLoading ? (<BouncingBallLoadingIndicator />) : 
                (<GradeSelection onGradeSelection={onGradeSelection} pageName="Draw the kanji"/>)
            )}
       </>
    )
} 

export default DrawTheKanji;