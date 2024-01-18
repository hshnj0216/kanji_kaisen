"use client";

import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import useKanjiDrawing from "@/app/_custom_hooks/useKanjiDrawing";
import LoadingIndicator from "@/app/_components/LoadingIndicator";
import DrawTheKanjiBoard from "@/app/_components/(practice)/(draw_the_kanji)/DrawTheKanjiBoard";

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
                isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <DrawTheKanjiBoard 
                        onDrawingSubmission={onDrawingSubmission}
                        currentKanji={currentKanji}
                    />
                )
            ) : (<GradeSelection onGradeSelection={onGradeSelection} pageName="Draw the kanji"/>)}
       </>
    )
} 

export default DrawTheKanji;