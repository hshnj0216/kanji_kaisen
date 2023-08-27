"use client";
import React, { FC } from "react";
import useKanji from "@/app/_custom_hooks/useKanji";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import Examples from "@/app/_components/(study)/Examples";
import StrokeImages from "@/app/_components/(study)/StrokeImages";
import Introduction from "@/app/_components/(study)/Introduction";


const Study: FC = () => {
	const {kanji, onKanjiSelection} = useKanji();
	return (
		<div className="w-4/5 mx-auto">
			<div className="flex justify-between items-center">
				<SearchBar onKanjiSelection={onKanjiSelection}/>
			</div>
			{kanji ? (
				<div className="grid lg:grid-cols-12 lg:gap-4">
					<KanjiMedia
						kanjiImageSrcs={kanji.kanji?.strokes.images}
						kanjiVideoSrcs={kanji.kanji?.video}
						imageArrayLength={kanji.kanji?.strokes.count}
						timings={kanji.kanji?.strokes.timings}
					>
					</KanjiMedia>
					<KanjiInfo
						meaning={kanji.meaning}
						onyomiKatakana={kanji.kanji?.onyomi.katakana}
						kunyomiHiragana={kanji.kanji?.kunyomi.hiragana}
						strokeCount={kanji?.kstroke}
						grade={kanji?.grade}
						radicalImageSrc={kanji.radical?.image}
						radicalNameHiragana={kanji.radical?.name.hiragana}
						radicalMeaningEnglish={kanji.radical?.meaning?.english}
						meaningHint={kanji.mn_hint}
					>
					</KanjiInfo>
					<Examples examples={kanji?.examples}></Examples>
					<StrokeImages images={kanji?.kanji?.strokes.images}></StrokeImages>
				</div>
			) : (
				<Introduction />
			)}
		</div>
	);
};
export default Study;
