"use client";
import {FC, useState} from "react";

interface IMatchTileProps {
    title: string;
    isSelected: boolean;
    isMatched: boolean;
    isMatchChecked: boolean;
    isCorrectMatch: boolean;
    setSelectedTiles: () => void;
    isKanjiCharacter: boolean;
}

const MatchTile: FC<IMatchTileProps> = ({
    title, 
    isSelected, 
    setSelectedTiles, 
    isMatched, 
    isMatchChecked,
    isCorrectMatch,
    isKanjiCharacter,
}) => {
    return (
        <div className={`flex justify-center items-center border rounded p-1 cursor-pointer hover:scale-125 transition-transform w-full h-full select-none
            ${isSelected ? (isMatchChecked ? (isCorrectMatch ? "bg-green-500" : "bg-red-500") : "bg-slate-800 text-slate-50 scale-125") : "bg-slate-50 text-slate-800"}
            ${isMatched ? "pointer-events-none opacity-50" : ""}
            `}
            onClick={setSelectedTiles}
        >
           <p className={`text-center line-clamp-2 ${isKanjiCharacter ? "text-3xl" : "text-md "}`}>{title}</p>
        </div>
    )
}

export default MatchTile;