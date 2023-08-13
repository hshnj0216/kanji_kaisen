"use client";
import {FC, useState} from "react";

interface IMatchTileProps {
    title: string;
    isSelected: boolean;
    isMatched: boolean;
    onTileSelect: () => void;
}

const MatchTile: FC<IMatchTileProps> = ({title, isSelected, onTileSelect, isMatched}) => {
    return (
        <div className={`flex justify-center items-center border rounded p-1 cursor-pointer hover:scale-125 transition-transform  
            ${isSelected? "bg-slate-800 text-slate-50 scale-125" : "bg-slate-50 text-slate-800"}
            ${isMatched ? "pointer-events-none opacity-50" : ""}
            `}
            onClick={onTileSelect}
        >
           <p className="text-center text-lg">{title}</p>
        </div>
    )
}

export default MatchTile;