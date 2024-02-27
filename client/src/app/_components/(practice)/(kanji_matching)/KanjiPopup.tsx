"use client";
import {FC} from "react";
import { IKanjiMatchBoardKanjiObject } from "./KanjiMatchBoard";

interface IKanjiPopupProps{
    kanji: IKanjiMatchBoardKanjiObject;
}

const KanjiPopup: FC<IKanjiPopupProps> = ({kanji}) => {
    return (
        <div className="absolute top-full -ml-3 mt-5 bg-slate-50 p-3 z-10 border rounded border-slate-800">
            <div className="flex">
                <p className="text-9xl text-slate-800 mr-3">
                    {kanji.kanji}
                </p>
                <div>
                    <div className="mb-2">
                        <p className="font-bold">Meaning</p>
                        <p className="whitespace-nowrap">{kanji.meaning}</p>
                    </div>
                    <div className="mb-2">
                        <p className="font-bold">Onyomi</p>
                        <p className="whitespace-nowrap">{kanji.onyomi}</p>
                    </div>
                    <div className="mb-2">
                        <p className="font-bold">Kunyomi</p>
                        <p className="whitespace-nowrap">{kanji.kunyomi}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default KanjiPopup;