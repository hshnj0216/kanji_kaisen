"use client";
import {FC, useRef} from "react";
import * as d3 from d3;

interface IKanjiDecompositionProps{
    kanji: string;
    components: string[];
}

const KanjiDecomposition: FC<IKanjiDecompositionProps> = ({kanji, components}) => {
    const displayRef = useRef(null);
    return (
        <div className="border border-slate-50 rounded w-full h-full bg-slate-900 p-5" ref={displayRef}>

        </div>
    )
}

export default KanjiDecomposition;