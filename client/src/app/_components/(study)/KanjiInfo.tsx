"use client";
import { FC } from "react";
import Image from "next/image";
import sanitizeHtml from 'sanitize-html';

interface IKanjiInfoProps {
    meaning: string;
    onyomiKatakana: string;
    kunyomiHiragana: string;
    strokeCount: number;
    grade: number;
    radicalImageSrc: string;
    radicalNameHiragana: string;
    radicalMeaningEnglish: string;
    meaningHint: string;
}
const KanjiInfo:FC<IKanjiInfoProps> = ({
    meaning, 
    onyomiKatakana, 
    kunyomiHiragana, 
    strokeCount, 
    grade,
    radicalImageSrc,
    radicalNameHiragana,
    radicalMeaningEnglish,
    meaningHint,
}) => {

    const sanitizedMeaningHint = sanitizeHtml(meaningHint, {
        allowedTags: [],
        allowedAttributes: {}
      });
      
    return(
        <div className="col-span-5 grid grid-cols-12 grid-row-12 bg-slate-300 p-3 h-90">
            <div className="col-span-6 row-span-8">
                <div className="mb-2">
                    <p className="text-lg font-bold">Meaning</p>
                    <p className="ms-2">{meaning}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Onyomi</p>
                    <p className="ms-2">{onyomiKatakana}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Kunyomi</p>
                    <p className="ms-2">{kunyomiHiragana}</p>
                </div>
            </div>
            <div className="col-span-6 row-span-8">
                <div className="mb-2">
                    <p className="text-lg font-bold">Strokes</p>
                    <p>{strokeCount}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Grade</p>
                    <p>{grade ? grade : "n/a"}</p>
                </div>
                <div className="mb-2">
                    <p className="text-lg font-bold">Radical</p>
                    <div className="grid grid-cols-12">
                        <Image className="col-span-3 max-h-12" src={radicalImageSrc} width={100} height={50} objectFit="contain" alt="radical_img"></Image>
                        <div className="col-span-9">
                            <p>{radicalNameHiragana}</p>
                            <p>{radicalMeaningEnglish}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 row-span-4">
                <p className="text-lg font-bold">Meaning Hint</p>
                <p className="ms-2">{sanitizedMeaningHint}</p>
            </div>
        </div>
    )
}

export default KanjiInfo;