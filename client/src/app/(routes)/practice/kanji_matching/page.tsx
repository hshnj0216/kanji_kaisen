"use client";
import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import KanjiMatchBoard from "@/app/_components/(practice)/(kanji_matching)/KanjiMatchBoard";
import useKanjiMatch from "@/app/_custom_hooks/useKanjiMatch";
import BouncingBallLoadingIndicator from "@/app/_components/BouncingBallsLoadingIndicator";

const KanjiMatching: FC = () => {
    const {
        kanjiMeaningPairs,
        isPlayMode,
        onGradeSelection,
        isLoading,
    } = useKanjiMatch();

    return (
        <>
            {isPlayMode ? (   
                <KanjiMatchBoard kanjiMeaningPairs={kanjiMeaningPairs} />
            ) : (
                isLoading ? (<BouncingBallLoadingIndicator />) :
                (<GradeSelection onGradeSelection={onGradeSelection} pageName="Kanji Matching" />)
            )}
        </>
    )

}

export default KanjiMatching;