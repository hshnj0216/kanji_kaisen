import {useState, useEffect, useRef} from "react"
import { IKanjiObject } from "../_components/(practice)/(kanji_matching)/KanjiMatchBoard";


//This custom hook contains all the game logic and implementation for the Kanji Match game or component
//The hook is responsible for managing the game states and logic but not the stages or phases
const useKanjiMatchGame = (kanjiMeaningPairs: (IKanjiObject | string)[]) => {
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
        if (matchedTiles.length === kanjiMeaningPairs.length) {
            setIsGameOver(true);
        } else if (!isMatchChecked) {
            // Only reset selectedTiles if isMatchChecked is false
            setSelectedTiles([]);
        }
    }, [matchedTiles, mismatchedKanjis, isMatchChecked]);

    let rowSize = kanjiMeaningPairs.length / 6;

    return {
        rowSize,
        onTileSelect,
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
        setIsReady,
    }
    
}

export default useKanjiMatchGame;