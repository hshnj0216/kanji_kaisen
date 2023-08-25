"use client";
import { FC } from "react";
import GradeSelection from "@/app/_components/(practice)/GradeSelection";
import KanjiMatchBoard from "@/app/_components/(practice)/(kanji_matching)/KanjiMatchBoard";
import useKanjiMatch from "@/app/_custom_hooks/useKanjiMatch";

const KanjiMatching: FC = () => {
    const {kanjiMeaningPairs, isPlayMode, onGradeSelection, setIsPlayMode} = useKanjiMatch();

    return (
        <div>
            {isPlayMode ? (
                <KanjiMatchBoard kanjiMeaningPairs={kanjiMeaningPairs}></KanjiMatchBoard>
            ) : (
                <GradeSelection onGradeSelection={onGradeSelection}></GradeSelection>
            )}
        </div>
    )

}

export default KanjiMatching;