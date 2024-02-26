import { useState, useEffect, useRef } from "react"
import { IKanjiMatchBoardKanjiObject } from "../_components/(practice)/(kanji_matching)/KanjiMatchBoard";
import incorrectChoice from "../sounds/incorrect_choice.mp3";
import correctChoice from "../sounds/correct_choice.mp3";

//This custom hook contains all the game logic and implementation for the Kanji Match game or component
//The hook is responsible for managing the game states and logic but not the stages or phases
const useKanjiMatchGame = (kanjiMeaningPairs: (IKanjiMatchBoardKanjiObject | string)[]) => {
    console.log(kanjiMeaningPairs);
    const [isGameOver, setIsGameOver] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [selectedTiles, setSelectedTiles] = useState<(IKanjiMatchBoardKanjiObject | string)[]>([]);
    const [matchedTiles, setMatchedTiles] = useState<(IKanjiMatchBoardKanjiObject | string)[]>([]);
    const [mismatchedKanjis, setMismatchedKanjis] = useState(new Map());
    const [isMatchChecked, setIsMatchChecked] = useState(false);
    const [isCorrectMatch, setIsCorrectMatch] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const timeoutIdRef = useRef<number | null>(null);

    const playCorrectChoiceSound = () => {
        const audio = new Audio(correctChoice);
        audio.play();
    }

    const playIncorrectChoiceSound = () => {
        const audio = new Audio(incorrectChoice);
        audio.play();
    }

    //Checks if the selected tiles' corresponding values are correct
    const areSelectedTilesCorrect = (tile1: IKanjiMatchBoardKanjiObject | string, tile2: IKanjiMatchBoardKanjiObject | string) => {
        if (typeof (tile1) === "object" && typeof (tile2 !== "object")) {
            //Compare the elements of the selectedTiles array
            if (tile1?.meaning === tile2) {
                playCorrectChoiceSound();
                return true;
            } else {
                playIncorrectChoiceSound();
                return false;
            }
            
        } else if (typeof (tile1) === "string" && typeof (tile2) !== "string") {
            //Likewise, but when the tile is a meaning string
            if (tile1 === tile2?.meaning) {
                playCorrectChoiceSound();
                return true;
            } else {
                playIncorrectChoiceSound();
                return false;
            }
        }
    }

    const addMismatchedKanji = (kanji: IKanjiMatchBoardKanjiObject) => {
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
                timeoutIdRef.current = window.setTimeout(() => {
                    setMatchedTiles([...matchedTiles, ...selectedTiles]);
                }, 300);
                setIsMatchChecked(true);

            } else if (typeof (selectedTiles[0]) == typeof (selectedTiles[1])) {
                setSelectedTiles([]);
                setIsMatchChecked(false);
            } else {
                //If incorrect, add the object tile to the mismatched
                if (typeof (selectedTiles[0]) === "object") {
                    addMismatchedKanji(selectedTiles[0]);
                } else {
                    addMismatchedKanji(selectedTiles[1] as IKanjiMatchBoardKanjiObject);
                }
                setIsCorrectMatch(false);
                setIsMatchChecked(true);
            }
        } else if (selectedTiles.length > 2) {
            setIsMatchChecked(false);
            setSelectedTiles([]);
            if (timeoutIdRef.current !== null) {
                window.clearTimeout(timeoutIdRef.current);
            }
        }
    };


    //Invokes onTileSelect each time the selectedTiles changes
    //Sets the isMatchChecked to false
    useEffect(() => {
        onTileSelect();
        if (selectedTiles.length >= 2) {
            timeoutIdRef.current = window.setTimeout(() => {
                setIsMatchChecked(false);
            }, 300);
    
            return () => {
                if (timeoutIdRef.current !== null) {
                    window.clearTimeout(timeoutIdRef.current);
                }
            };
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