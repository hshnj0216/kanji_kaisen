"use client";

import { FC } from "react";
import Link from "next/link";

interface IResultsProps {
    mismatchedKanjis: Map<string, number>;
    elapsedTime: number;
    
}

const Results: FC<IResultsProps> = ({ mismatchedKanjis, elapsedTime }) => {

    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let top5 = Array.from(mismatchedKanjis.entries()).slice(0, 5);
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
                            {top5.map(([kanji, count]) => (
                                <div key={kanji} className="border rounded p-3 bg-slate-50 m-3">
                                    <span className="text-3xl">{kanji}</span><span className="ms-1">{count}</span>
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