"use client";
import { FC, useEffect, useState } from "react";
import MatchTile from "./MatchTile";
import Timer from "../../Timer";
import Results from "./Results";

interface IKanjiObject {
    kanji: string;
    meaning: string;
}

interface IKanjiMatchBoardProps {
    kanjiMeaningPairs: (IKanjiObject | string)[];
}

const KanjiMatchBoard: FC<IKanjiMatchBoardProps> = ({ kanjiMeaningPairs }) => {
    const [isGameOver, setIsGameOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedTiles, setSelectedTiles] = useState<(IKanjiObject | string)[]>([]);
    const [matchedTiles, setMatchedTiles] = useState<(IKanjiObject | string)[]>([]);
    const [mismatchedKanjis, setMismatchedKanjis] = useState(new Map());
    const [areSelectedTilesCorrectState, setAreSelectedTilesCorrectState] = useState(true);

    useEffect(() => {
        if (matchedTiles.length === 30) {
            setIsGameOver(true);
        } else {
            //Clean up the selectedTiles
            setSelectedTiles([]);
        }
    }, [matchedTiles, mismatchedKanjis]);

    //Checks if the selected tiles are correct
    const areSelectedTilesCorrect = (tile: IKanjiObject | string) => {
        if (typeof (tile) === "object" && typeof (selectedTiles[0]) !== "object") {
            //Compare the elements of the selectedTiles array
            if (tile?.meaning === selectedTiles[0]) {
                return true;
            }
            return false;
        } else if (typeof (tile) === "string" && typeof (selectedTiles[0]) !== "string") {
            //Likewise, but when the tile is a meaning string
            if (tile === selectedTiles[0]?.meaning) {
                return true;
            }
            return false;
        }
    }

    const addMismatchedKanji = (kanji: IKanjiObject) => {
        setMismatchedKanjis((prevCounts) => {
            const newCounts = new Map(prevCounts);
            newCounts.set(kanji?.kanji, (newCounts.get(kanji?.kanji) || 0) + 1);
            return newCounts;
        });
    }

    const onTileSelect = (tile: IKanjiObject | string) => {
        setSelectedTiles(prevSelectedTiles => [...prevSelectedTiles, tile]);
    };

    useEffect(() => {
        if (selectedTiles.length === 2) {
            const [firstTile, secondTile] = selectedTiles;
    
            if (areSelectedTilesCorrect(secondTile)) {
                setAreSelectedTilesCorrectState(true);
                setMatchedTiles(prevMatchedTiles => [...prevMatchedTiles, firstTile, secondTile]);
            } else {
                setAreSelectedTilesCorrectState(false);
                if (typeof(secondTile) === 'object') {
                    addMismatchedKanji(secondTile);
                } else if (typeof(firstTile) === 'object') {
                    addMismatchedKanji(firstTile);
                }
            }
    
            // Clear selected tiles after processing
            setSelectedTiles([]);
        }
    }, [selectedTiles]);    
    
    return (
        <div className="flex items-center justify-center">
            {isGameOver ? (
                <Results mismatchedKanjis={mismatchedKanjis} elapsedTime={elapsedTime} />
            ) : (

                <div>
                    <Timer onTimeUpdate={setElapsedTime} />
                    <div className="border rounded w-3/4 mx-auto my-auto grid grid-cols-6 grid-rows-5 gap-10 p-5">
                        {kanjiMeaningPairs.map((item, index) => typeof (item) === "object" ?
                            <MatchTile key={index} title={item.kanji} isMatched={matchedTiles.includes(item)}
                                onTileSelect={() => onTileSelect(item)} isSelected={selectedTiles.includes(item)} /> :
                            <MatchTile key={index} title={item} isMatched={matchedTiles.includes(item)}
                                onTileSelect={() => onTileSelect(item)} isSelected={selectedTiles.includes(item)}
                            />)
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default KanjiMatchBoard;