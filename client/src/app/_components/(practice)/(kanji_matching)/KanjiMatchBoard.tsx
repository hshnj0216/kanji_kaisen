"use client";
import { FC, useEffect, useRef, useState } from "react";
import MatchTile from "./MatchTile";
import Timer from "../../Timer";
import Results from "./Results";
import CountDownTimer from "../../CountDownTimer";
import Ready from "../Ready";
import useLoading from "@/app/_custom_hooks/useLoading";

interface IKanjiObject {
    character: string;
    meaning: string;
    onyomi: string;
    kunyomi: string;
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
    const [isMatchChecked, setIsMatchChecked] = useState(false);
    const [isCorrectMatch, setIsCorrectMatch] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    //Checks if the selected tiles' corresponding values are correct
    const areSelectedTilesCorrect = (tile1: IKanjiObject | string, tile2: IKanjiObject | string) => {
        if (typeof (tile1) === "object" && typeof (tile2 !== "object")) {
            //Compare the elements of the selectedTiles array
            if (tile1?.meaning === tile2) {
                return true;
            }
            return false;
        } else if (typeof (tile1) === "string" && typeof (tile2) !== "string") {
            //Likewise, but when the tile is a meaning string
            if (tile1 === tile2?.meaning) {
                return true;
            }
            return false;
        }
    }

    const addMismatchedKanji = (kanji: IKanjiObject) => {
        setMismatchedKanjis((prevCounts) => {
            const newCounts = new Map(prevCounts);
            const prevValue = newCounts.get(kanji?.kanji) || { kanji: kanji, count: 0 };
            prevValue.count += 1;
            newCounts.set(kanji?.kanji, prevValue);
            return newCounts;
        });
    }

    const onTileSelect = () => {
        if (selectedTiles.length === 2) {
            //If tiles are correctly matched, add to matched tiles
            if (areSelectedTilesCorrect(selectedTiles[0], selectedTiles[1])) {
                setIsCorrectMatch(true);
                setTimeout(() => {
                    setMatchedTiles([...matchedTiles, ...selectedTiles]);
                }, 300);
                setIsMatchChecked(true);
                
            } else if (typeof(selectedTiles[0]) == typeof(selectedTiles[1])) {
                setSelectedTiles([]);
                setIsMatchChecked(false);
            } else {
                //If incorrect, add the object tile to the mismatched
                if (typeof (selectedTiles[0]) === "object") {
                    addMismatchedKanji(selectedTiles[0]);
                } else {
                    addMismatchedKanji(selectedTiles[1] as IKanjiObject);
                }
                setIsCorrectMatch(false);
                setIsMatchChecked(true);
            }
        } else if (selectedTiles.length > 2) {
            setIsMatchChecked(false);
            setSelectedTiles([]);
            clearTimeout(timeoutIdRef.current);
        }
    };

    //Invokes onTileSelect each time the selectedTiles changes
    //Sets the isMatchChecked to false
    useEffect(() => {
        onTileSelect();
        if (selectedTiles.length >= 2) {
            timeoutIdRef.current = setTimeout(() => {
                setIsMatchChecked(false);
            }, 300);

            return () => clearTimeout(timeoutIdRef.current);
        }
    }, [selectedTiles]);

    useEffect(() => {
        if (matchedTiles.length === 30) {
            setIsGameOver(true);
        } else if (!isMatchChecked) {
            // Only reset selectedTiles if isMatchChecked is false
            setSelectedTiles([]);
        }
    }, [matchedTiles, mismatchedKanjis, isMatchChecked]);




    return (
        <div className="flex items-center justify-center w-full h-full">
            {isReady ?
                (isGameOver ? (
                    <Results mismatchedKanjis={mismatchedKanjis} elapsedTime={elapsedTime} />
                ) : (
                    <div className="w-3/4">
                        <Timer onTimeUpdate={setElapsedTime} />
                        <div className="border rounded w-full mx-auto my-auto grid grid-cols-6 grid-rows-5 gap-10 p-5">
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
                    <Ready setIsReady={setIsReady} isReady={isReady}/>
                )

            }
        </div>
    )
}

export default KanjiMatchBoard;