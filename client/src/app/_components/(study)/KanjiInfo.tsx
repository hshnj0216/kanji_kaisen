"use client";
import { FC } from "react";
import Image from "next/image";

interface IKanjiInfoProps {
    kanji: any,
}
const KanjiInfo:FC<IKanjiInfoProps> = ({kanji}) => {
    return(
        <div className="col-span-6 grid grid-cols-12 grid-row-12 bg-slate-300 p-3">
            <div className="col-span-6 row-span-8">
                <div className="mb-2">
                    <p className="text-lg font-bold">Meaning</p>
                    <p className="ms-2">{kanji?.kanji?.meaning?.english}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Onyomi</p>
                    <p className="ms-2">{kanji?.kanji?.onyomi?.katakana}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Kunyomi</p>
                    <p className="ms-2">{kanji?.kanji?.kunyomi?.hiragana}</p>
                </div>
            </div>
            <div className="col-span-6 row-span-8">
                <div className="mb-2">
                    <p className="text-lg font-bold">Strokes</p>
                    <p>{kanji?.kstroke}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Grade</p>
                    <p>{kanji?.grade}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Radical</p>
                    <div className="grid grid-cols-12">
                        <Image className="col-span-3 max-h-12" src={kanji?.radical.image} width={100} height={50} objectFit="contain" alt="radical_img"></Image>
                        <div className="col-span-9">
                            <p>{kanji?.radical?.name?.hiragana}</p>
                            <p>{kanji?.radical?.meaning?.english}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 row-span-4">
                <p className="text-lg font-bold">Meaning Hint</p>
                <p className="ms-2">{kanji?.mn_hint}</p>
            </div>
        </div>
    )
}

export default KanjiInfo;