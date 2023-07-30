"use client";
import { FC } from "react";

interface IKanjiInfoProps {
    kanji: any,
}
const KanjiInfo:FC<IKanjiInfoProps> = ({kanji}) => {
    return(
        <div className="col-span-6 bg-blue-500 h-60">
            <p className="text-3xl"><strong>Meaning: </strong>{kanji?.kanji?.meaning?.english}</p>
            <p className="text-3xl"><strong>Onyomi: </strong>{kanji?.kanji?.onyomi?.katakana}</p>
            <p className="text-3xl"><strong>Kunyomi: </strong>{kanji?.kanji?.kunyomi?.hiragana}</p>
            <p className="text-3xl"><strong>Strokes: </strong>{kanji?.kanji?.strokes?.count}</p>
        </div>
    )
}

export default KanjiInfo;