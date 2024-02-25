"use client";
import { FC } from "react";
import MatchTile from "./MatchTile";
import Timer from "../../Timer";
import Results from "./Results";
import Ready from "../Ready";
import useKanjiMatchGame from "@/app/_custom_hooks/useKanjiMatchGame";

export interface IKanjiMatchBoardKanjiObject {
    character: string;
    meaning: string;
    onyomi: string;
    kunyomi: string;
}
export interface IKanjiMatchBoardProps {
    kanjiMeaningPairs: (IKanjiMatchBoardKanjiObject | string)[];
}

const KanjiMatchBoard: FC<IKanjiMatchBoardProps> = ({ kanjiMeaningPairs }) => {
    const {
        rowSize,
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
                    <div className="w-3/4 flex flex-col items-center justify-center">
                        <Timer onTimeUpdate={setElapsedTime} />
                        <div className={`border b-box rounded grid grid-cols-6 grid-rows-${rowSize} w-5/6 h-full gap-5 p-4   
                        `}
                        >
                            {kanjiMeaningPairs.map((item, index) => typeof (item) === "object" ?
                                <MatchTile key={index} title={item.character} isMatched={matchedTiles.includes(item)}
                                    setSelectedTiles={() => setSelectedTiles([...selectedTiles, item])}
                                    isSelected={selectedTiles.includes(item)} isMatchChecked={isMatchChecked}
                                    isCorrectMatch={isCorrectMatch} isKanjiCharacter={true}
                                /> :
                                <MatchTile key={index} title={item} isMatched={matchedTiles.includes(item)}
                                    setSelectedTiles={() => setSelectedTiles([...selectedTiles, item])}
                                    isSelected={selectedTiles.includes(item)} isMatchChecked={isMatchChecked}
                                    isCorrectMatch={isCorrectMatch} isKanjiCharacter={false}
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