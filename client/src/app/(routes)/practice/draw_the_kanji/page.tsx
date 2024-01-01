"use client";

import { FC } from "react";
import Canvas from "@/app/_components/Canvas";
const DrawTheKanji: FC = () => {
    return(
        <div>
            <h1 className="text-slate-50 text-9xl">Draw the kanji</h1>
            <Canvas></Canvas>
        </div>
    )
}

export default DrawTheKanji;