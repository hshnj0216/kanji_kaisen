"use client";

import { FC, useState } from "react";
import Link from "next/link";
import KanjiPopup from "./KanjiPopup";

interface IResultsProps {
    mismatchedKanjis: Map<string, object>;
    elapsedTime: number;

}

const Results: FC<IResultsProps> = ({ mismatchedKanjis, elapsedTime }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [hoveredKanji, setHoveredKanji] = useState(null);
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let top5 = Array.from(mismatchedKanjis.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([kanjiString, kanjiObject]) => kanjiObject);
    return (
        <div className="border rounded border-slate-50 p-4 flex flex-col justify-center items-center w-1/2">
            <div className="">
                <p className="text-slate-50 text-center text-3xl">Elapsed time:</p>
                <p className="">
                    <span className="text-slate-50 text-7xl">{minutes < 10 ? `0${minutes}` : minutes}</span>
                    <span className="text-slate-50">mins</span>
                    <span className="text-slate-50 text-7xl">{seconds < 10 ? `0${seconds}` : seconds}</span>
                    <span className="text-slate-50">secs</span>
                </p>
            </div>
            <div>
                {top5.length > 0 ? (
                    <div>
                        <p className="text-slate-50 text-5xl">Most mismatched kanjis:</p>
                        <div className="flex justify-center">
                            {top5.map((kanji) => (
                                <div
                                    key={kanji.kanji.kanji} 
                                    className="border rounded p-3 bg-slate-50 m-3 relative cursor-pointer flex flex-col justify-center items-center"
                                    onMouseEnter={() => setHoveredKanji(kanji)}
                                    onMouseLeave={() => setHoveredKanji(null)}
                                >
                                    <div>
                                        <span className="text-3xl">{kanji.kanji.kanji}</span><span className="ms-1">{kanji.count}</span>
                                    </div>
                                    {hoveredKanji === kanji && (
                                        <KanjiPopup {...kanji.kanji} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-50 text-5xl text-center my-3">
                        Wow! You have no mismatched kanjis. You are amazing at kanji matching. Well done! 👏
                    </p>
                )}
            </div>
            <div>
                <button type="button" title="play another match"
                    className="bg-slate-300 p-3 border rounded text-slate-800 m-3"
                >
                    Play another match
                </button>
                <Link href="/practice">
                    <button type="button" title="return to practice menu"
                        className="bg-slate-300 p-3 border rounded text-slate-800 m-3"
                    >
                        Return to practice menu
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Results;