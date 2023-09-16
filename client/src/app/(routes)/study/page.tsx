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


const Study: FC = () => {
	const {
		kanji, 
		onKanjiSelection,
		displayDecomposition,
		setDisplayDecomposition,
		kanjiInfoProps,
		kanjiMediaProps,
	} = useKanji();
	return (
		<div className="w-4/5 mx-auto">
			<div className="flex justify-between items-center">
				<SearchBar onKanjiSelection={onKanjiSelection}/>
				(kanji && <button type="button" onClick={() => setDisplayDecomposition(!displayDecomposition)}>Show decomposition</button>)
			</div>
			{kanji ? (
				displayDecomposition ? (
					<KanjiDecomposition kanji={kanji?.utf_8} components={kanji?.component_decomposition}/>
				) : (
					<div className="grid lg:grid-cols-12 lg:gap-4">
					<KanjiMedia	{...kanjiMediaProps}/>
					<KanjiInfo {...kanjiInfoProps} /> 
					<Examples examples={kanji?.examples}></Examples>
					<StrokeImages images={kanji?.kanji?.strokes.images}></StrokeImages>
					</div>
				)				
			) : (
				<Introduction />
			)}
		</div>
	);
};
export default Study;
