"use client";
import {FC, useState} from "react";

interface IMatchTileProps {
    title: string;
    isSelected: boolean;
    isMatched: boolean;
    isMatchChecked: boolean;
    isCorrectMatch: boolean;
    setSelectedTiles: () => void;
}

const MatchTile: FC<IMatchTileProps> = ({
    title, 
    isSelected, 
    setSelectedTiles, 
    isMatched, 
    isMatchChecked,
    isCorrectMatch,
}) => {
    return (
        <div className={`flex justify-center items-center border rounded p-1 cursor-pointer hover:scale-125 transition-transform  
            ${isSelected ? (isMatchChecked ? (isCorrectMatch ? "bg-green-500" : "bg-red-500") : "bg-slate-800 text-slate-50 scale-125") : "bg-slate-50 text-slate-800"}
            ${isMatched ? "pointer-events-none opacity-50" : ""}
            `}
            onClick={setSelectedTiles}
        >
           <p className="text-center text-lg line-clamp-2">{title}</p>
        </div>
    )
}

export default MatchTile;