"use client";
import { FC } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import Link from "next/link";

const Practice:FC = () => {
    return(
        <div className="w-full h-full flex flex-col items-center justify-center border">
            <div className="w-full box-border grid grid-cols-12 grid-rows-3 px-5 h-36 items-center">
                <h1 className="text-7xl col-start-5 col-end-10 text-slate-50 row-start-2">Select a Game</h1>
                <Link href="/" className="bg-slate-50 p-3 border rounded col-start-1 col-end-3 row-start-2 text-center">
                    Return to Main Menu
                </Link>
            </div>
            <ul className="flex justify-center items-center mb-10">
                <Link href={"practice/kanji_matching"}>
                    <ModeCard 
                        title={"Kanji matching"} 
                        description={"Match kanjis and their meaning"}
                        isDisabled={false}
                    >
                    </ModeCard>
                </Link>
                <Link href={"practice/kanji_recognition"}>
                    <ModeCard 
                        title={"Kanji recognition"} 
                        description={"Test yourself by recognizing random kanjis"}
                        isDisabled={false}
                    >
                    </ModeCard>
                </Link>
                <Link href={"practice/draw_the_kanji"}>
                    <ModeCard 
                        title={"Write the kanji"} 
                        description={"Given the meaning, write the kanji"}
                        isDisabled={true}
                    >
                    </ModeCard>      
                </Link>
            </ul>
        </div>
    )
}
export default Practice;