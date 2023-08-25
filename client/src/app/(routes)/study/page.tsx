"use client";
import { FC, use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import RadicalInfo from "@/app/_components/(study)/RadicalInfo";
import Image from "next/image";
import Examples from "@/app/_components/(study)/Examples";
import StrokeImages from "@/app/_components/(study)/StrokeImages";
import Introduction from "@/app/_components/(study)/Introduction";

const Study: FC = (props) => {
	const [kanji, setKanji] = useState(null);

	const handleSetKanji = useCallback((data: any) => {
		setKanji(data);
	}, []);

	return (
		<div className="w-4/5 mx-auto">
			<div className="flex justify-between items-center">
				<SearchBar setKanji={handleSetKanji}></SearchBar>
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
				<Introduction></Introduction>
			)}
		</div>
	);
};

export default Study;
