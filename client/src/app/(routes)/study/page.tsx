"use client";
import React, { FC } from "react";
import useKanji from "@/app/_custom_hooks/useKanji";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import Examples from "@/app/_components/(study)/Examples";
import StrokeImages from "@/app/_components/(study)/StrokeImages";
import Introduction from "@/app/_components/(study)/Introduction";
import KanjiDecomposition from "@/app/_components/(study)/KanjiDecomposition";
import Link from "next/link";


const Study: FC = () => {
	const {
		kanji,
		onKanjiSelection,
		displayDecomposition,
		setDisplayDecomposition,
		kanjiDecompositionProps,
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
				{kanji &&
					<button
						type="button"
						onClick={() => setDisplayDecomposition(!displayDecomposition)}
						className="bg-slate-50 border rounded p-2 hover:bg-slate-300 col-start-10 col-end-13 my-3"
					>
						{displayDecomposition ? "Show information" : "Show decomposition"}
					</button>
				}
			</div>
			{kanji ? (
				displayDecomposition ? (
					<KanjiDecomposition kanjiTree={kanjiDecompositionProps.kanjiTree} />
				) : (
					<div className="grid lg:grid-cols-12 lg:gap-4 border-slate-50">
						<KanjiMedia	{...kanjiMediaProps} />
						<KanjiInfo {...kanjiInfoProps} />
						<Examples examples={kanji?.examples}></Examples>
						<StrokeImages {...kanjiStrokeImagesProps}></StrokeImages>
					</div>
				)
			) : (
				<Introduction />
			)}
		</div>
	);
};
export default Study;
