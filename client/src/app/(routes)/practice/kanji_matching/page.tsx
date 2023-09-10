"use client";
import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import KanjiMatchBoard from "@/app/_components/(practice)/(kanji_matching)/KanjiMatchBoard";
import useKanjiMatch from "@/app/_custom_hooks/useKanjiMatch";
import LoadingIndicator from "@/app/_components/LoadingIndicator";


const KanjiMatching: FC = () => {
    const {
        kanjiMeaningPairs,
        isPlayMode,
        onGradeSelection,
        setIsPlayMode,
        isLoading,
    } = useKanjiMatch();

    return (
        <>
            {isPlayMode ? (
                isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <KanjiMatchBoard kanjiMeaningPairs={kanjiMeaningPairs} />
                )
            ) : (
                <GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Matching"></GradeSelection>
            )}
        </>
    )

}

export default KanjiMatching;