"use client";
import { FC } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import Link from "next/link";

const Practice:FC = () => {
    return(
        <div className="w-screen h-full flex items-center justify-center border">
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