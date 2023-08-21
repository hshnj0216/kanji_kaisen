"use client";
import { FC } from "react";
import ModeCard from "@/app/_components/(practice)/ModeCard";
import Link from "next/link";
import styles from '@/app/practice.module.scss';
import Canvas from "@/app/_components/Canvas";

const Practice:FC = () => {
    return(
        <div className="w-screen border">
            <ul className="flex justify-center items-center mb-10">
                <Link href={"practice/kanji_matching"}>
                    <ModeCard 
                        title={"Kanji matching"} 
                        description={"Match kanjis and their meaning"}
                    >
                    </ModeCard>
                </Link>
                <Link href={"practice/kanji_recognition"}>
                    <ModeCard 
                        title={"Kanji recognition"} 
                        description={"Test yourself by recognizing random kanjis"}
                    >
                    </ModeCard>
                </Link>
                <Link href={"practice/draw_the_kanji"}>
                    <ModeCard 
                        title={"Write the kanji"} 
                        description={"Given the English meaning, write the kanji"}
                    >
                    </ModeCard>      
                </Link>
                <Canvas></Canvas>
            </ul>
        </div>
    )
}
export default Practice;