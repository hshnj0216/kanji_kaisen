"use client";
import React, { FC } from "react";
import useKanji from "@/app/_custom_hooks/useKanji";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import Examples from "@/app/_components/(study)/Examples";
import StrokeImages from "@/app/_components/(study)/StrokeImages";
import Link from "next/link";
import Skeleton from "@/app/_components/(study)/Skeleton";


const Study: FC = () => {
	const {
		kanji,
		onKanjiSelection,
		kanjiStrokeImagesProps,
		kanjiInfoProps,
		kanjiMediaProps,
	} = useKanji(); 
	return (
		<div className="w-4/5 mx-auto h-full">
			<div className="grid grid-cols-12 h-16 items-center">
				<Link href="/" className="bg-slate-50 p-2 border rounded col-start-1 col-end-3 text-center my-3">
					Return to Main Menu
				</Link>
				<SearchBar onKanjiSelection={onKanjiSelection}/>	
			</div>
			{kanji ? (
				<div className="grid lg:grid-cols-12 lg:gap-4 border-slate-50">
					<KanjiMedia	{...kanjiMediaProps} />
					<KanjiInfo {...kanjiInfoProps} />
					<Examples examples={kanji?.examples} />
					<StrokeImages {...kanjiStrokeImagesProps} />
				</div>
			) : (
				<Skeleton />
			)}
		</div>
	);
};
export default Study;
