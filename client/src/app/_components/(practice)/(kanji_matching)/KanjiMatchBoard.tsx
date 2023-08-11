"use client";
import { FC, useState } from "react";
import MatchTile from "./MatchTile";

interface IKanjiObject {
    kanji: string;
    meaning: string;
}

interface IKanjiMatchBoardProps {
    kanjiMeaningPairs: (IKanjiObject | string)[];
}

const KanjiMatchBoard: FC<IKanjiMatchBoardProps> = ({ kanjiMeaningPairs }) => {
    const [selectedTiles, setSelectedTiles] = useState<(IKanjiObject | string)[]>([]);
    const [remainingTiles, setRemainingTiles] = useState(kanjiMeaningPairs);
    const onTileSelect = (tile: IKanjiObject | string) => {
        //Check if the argument type is not the same as the existing element in the selectedTiles
        if(typeof(tile) === "object" && typeof(selectedTiles[0]) !== "object") {
            setSelectedTiles([...selectedTiles, tile]);
            //Compare the elements of the selectedTiles array
            //If the meaning and the string match, remove the tiles from the remainingTiles
            if(tile.meaning === selectedTiles[0]) {
                setRemainingTiles(remainingTiles.filter(t => t !== tile && t !== selectedTiles[0]));
            }
        }
    }
    return (
        <div className="border rounded w-2/3 mx-auto my-auto grid grid-cols-6 grid-rows-5 gap-10 p-5">
            {kanjiMeaningPairs.map((item, index) => typeof (item) === "object" ? 
                <MatchTile key={index} title={item.kanji} 
                    onTileSelect={() => onTileSelect(item)} isSelected={selectedTiles.includes(item)}/> : 
                <MatchTile key={index} title={item} 
                    onTileSelect={() => onTileSelect(item)} isSelected={selectedTiles.includes(item)}
                />)
            }
        </div>
    )
}

export default KanjiMatchBoard;