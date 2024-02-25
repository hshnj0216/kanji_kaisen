"use client";
import React, { FC } from "react";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import Examples from "@/app/_components/(study)/Examples";
import StrokeImages from "@/app/_components/(study)/StrokeImages";
import Introduction from "@/app/_components/(study)/Introduction";
import useKanji from "@/app/_custom_hooks/useKanji";
import Link from "next/link";


const StudyDynamic = () => {
    const {
        kanji,
        onKanjiSelection,
        kanjiStrokeImagesProps,
        kanjiInfoProps,
        kanjiMediaProps,
        kanjiExamplesProps,
    } = useKanji();

    return (
        <>  
            <div className="grid grid-cols-12 h-16 items-center">
				<Link href="/" className="bg-slate-50 p-2 border rounded col-start-1 col-end-3 text-center my-3">
					Return to Main Menu
				</Link>
                <SearchBar onKanjiSelection={onKanjiSelection} />
			</div>
            {kanji ? (
                <div className="grid lg:grid-cols-12 lg:gap-4 border-slate-50">
                    <KanjiMedia	{...kanjiMediaProps} />
                    <KanjiInfo {...kanjiInfoProps} />
                    <Examples {...kanjiExamplesProps} />
                    <StrokeImages {...kanjiStrokeImagesProps} />
                </div>
            ) : (
                <Introduction />
            )}
        </>
    )
    
        
}

export default StudyDynamic;