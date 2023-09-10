"use client";
import {FC} from "react";

interface IKanjiPopupProps{
    kanji: string;
    meaning: string;
    onyomi: string;
    kunyomi: string;
}

const KanjiPopup: FC<IKanjiPopupProps> = ({kanji, meaning, onyomi, kunyomi}) => {
    return (
        <div className="absolute top-full -ml-3 mt-5 bg-slate-50 p-3 z-10 border rounded border-slate-800">
            <div className="flex">
                <p className="text-9xl text-slate-800 mr-3">
                    {kanji}
                </p>
                <div>
                    <div className="mb-2">
                        <p className="font-bold">Meaning</p>
                        <p className="whitespace-nowrap">{meaning}</p>
                    </div>
                    <div className="mb-2">
                        <p className="font-bold">Onyomi</p>
                        <p className="whitespace-nowrap">{onyomi}</p>
                    </div>
                    <div className="mb-2">
                        <p className="font-bold">Kunyomi</p>
                        <p className="whitespace-nowrap">{kunyomi}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default KanjiPopup;