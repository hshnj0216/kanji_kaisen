"use client";

import { FC } from "react";
import SVGCanvas from "@/app/_components/SVGCanvas";

const DrawTheKanji: FC = () => {
    return(
        <div>
            <h1 className="text-slate-50 text-9xl">Draw the kanji</h1>
            <SVGCanvas></SVGCanvas>
        </div>
    )
}

export default DrawTheKanji;