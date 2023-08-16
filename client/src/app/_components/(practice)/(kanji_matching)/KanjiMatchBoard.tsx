"use client";
import { FC, useEffect, useState } from "react";
import MatchTile from "./MatchTile";
import Timer from "../../Timer";

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

    useEffect(() => {
        if (matchedTiles.length === 30) {
            console.log(elapsedTime);
            setIsGameOver(true);
        } else {
            setSelectedTiles([]);
        }
    }, [matchedTiles]);

    const addMismatchedKanji = (kanji: IKanjiObject) => {
        setMismatchedKanjis((prevCounts) => {
            const newCounts = new Map(prevCounts);
            newCounts.set(kanji?.kanji, (newCounts.get(kanji?.kanji) || 0) + 1);
            return newCounts;
        });
    }

    const onTileSelect = (tile: IKanjiObject | string) => {
        setSelectedTiles([tile]);
        if (selectedTiles.length > 0) {
            //Check if the argument type is not the same as the existing element in the selectedTiles
            if (typeof (tile) === "object" && typeof (selectedTiles[0]) !== "object") {
                setSelectedTiles([...selectedTiles, tile]);
                //Compare the elements of the selectedTiles array
                //If the meaning and the string match, remove the tiles from the remainingTiles
                if (tile?.meaning === selectedTiles[0]) {
                    setMatchedTiles([...matchedTiles, tile, selectedTiles[0]]);
                    console.log(`Tile is: ${tile.meaning}`);
                } else {
                    //Add the kanji to the mismatched tiles
                    addMismatchedKanji(tile);
                    console.log('misMatchedKanji added');
                }
            } else if (typeof (tile) === "string" && typeof (selectedTiles[0]) !== "string") {
                //Likewise, but when the tile is a meaning string
                setSelectedTiles([...selectedTiles, tile]);
                if (tile === selectedTiles[0]?.meaning) {
                    setMatchedTiles([...matchedTiles, tile, selectedTiles[0]]);
                    console.log(JSON.stringify(selectedTiles, null, 4))
                } else {
                    //Add the kanji to the mismatched tiles
                    addMismatchedKanji(selectedTiles[0]);
                    console.log('misMatchedKanji added');

                }
            } else {
                //Clear the selectedTiles array
                setSelectedTiles([]);
            }
        }
    }

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;

    return (
        <div>
            {isGameOver ? (
                <div className="border rounded border-slate-50 p-4 flex flex-col justify-center items-center h-screen">
                    <div className="">
                        <p className="text-slate-50 text-center text-3xl">Elapsed time:</p>
                        <p className="">
                            <span className="text-slate-50 text-7xl">{minutes < 10 ? `0${minutes}` : minutes}</span>
                            <span className="text-slate-50">mins</span>
                            <span className="text-slate-50 text-7xl">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            <span className="text-slate-50">secs</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-slate-50 text-7xl">Most mismatched kanjis:</p>
                        <div className="flex">
                            {Array.from(mismatchedKanjis.entries()).map(([kanji, count]) => (
                                <div key={kanji} className="border rounded p-3 bg-slate-50">
                                    <span className="text-3xl">{kanji}</span>: <span>{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button type="button" title="play another match"
                            className="bg-slate-300 p-3 border rounded text-slate-800 m-3"
                        >
                            Play another match
                        </button>
                        <button type="button" title="return to practice menu"
                            className="bg-slate-300 p-3 border rounded text-slate-800 m-3"
                        >
                            Return to practice menu
                        </button>
                    </div>
                </div>
            ) : (

                <div>
                    <Timer onTimeUpdate={setElapsedTime} />
                    <div className="border rounded w-2/3 mx-auto my-auto grid grid-cols-6 grid-rows-5 gap-10 p-5">
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