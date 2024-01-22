"use client";
import { FC } from "react";
import MatchTile from "./MatchTile";
import Timer from "../../Timer";
import Results from "./Results";
import Ready from "../Ready";
import useKanjiMatchGame from "@/app/_custom_hooks/useKanjiMatchGame";

export interface IKanjiObject {
    character: string;
    meaning: string;
    onyomi: string;
    kunyomi: string;
}

export interface IKanjiMatchBoardProps {
    kanjiMeaningPairs: (IKanjiObject | string)[];

}

const KanjiMatchBoard: FC<IKanjiMatchBoardProps> = ({ kanjiMeaningPairs }) => {
    const {
        colSize,
        isReady,
        isGameOver,
        mismatchedKanjis,
        elapsedTime,
        setElapsedTime,
        matchedTiles,
        selectedTiles,
        isMatchChecked,
        isCorrectMatch,
        setSelectedTiles,
        setIsReady
    } = useKanjiMatchGame(kanjiMeaningPairs);

    return (
        <div className="flex items-center justify-center w-full h-full">
            {isReady ?
                (isGameOver ? (
                    <Results mismatchedKanjis={mismatchedKanjis} elapsedTime={elapsedTime} />
                ) : (
                    <div className="w-3/4">
                        <Timer onTimeUpdate={setElapsedTime} />
                        <div className={`border rounded w-full mx-auto my-auto grid grid-cols-${colSize} grid-rows-5 gap-10 p-5`}>
                            {kanjiMeaningPairs.map((item, index) => typeof (item) === "object" ?
                                <MatchTile key={index} title={item.kanji} isMatched={matchedTiles.includes(item)}
                                    setSelectedTiles={() => setSelectedTiles([...selectedTiles, item])}
                                    isSelected={selectedTiles.includes(item)} isMatchChecked={isMatchChecked}
                                    isCorrectMatch={isCorrectMatch}
                                /> :
                                <MatchTile key={index} title={item} isMatched={matchedTiles.includes(item)}
                                    setSelectedTiles={() => setSelectedTiles([...selectedTiles, item])}
                                    isSelected={selectedTiles.includes(item)} isMatchChecked={isMatchChecked}
                                    isCorrectMatch={isCorrectMatch}
                                />)
                            }
                        </div>
                    </div>
                )) : (
                    <Ready setIsReady={setIsReady} isReady={isReady} />
                )

            }
        </div>
    )
}

export default KanjiMatchBoard;