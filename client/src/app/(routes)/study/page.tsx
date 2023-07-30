"use client";
import { FC, use, useCallback, useEffect, useState } from "react";
import axios from "axios";
import KanjiInfo from "@/app/_components/(study)/KanjiInfo";
import SearchBar from "@/app/_components/(study)/SearchBar";
import KanjiMedia from "@/app/_components/(study)/KanjiMedia";
import RadicalInfo from "@/app/_components/(study)/RadicalInfo";
import Image from "next/image";
import Examples from "@/app/_components/(study)/Examples";

const Study: FC = (props) => {
	const [kanji, setKanji] = useState(null);

	const handleSetKanji = useCallback((data: any) => {
		setKanji(data);
	}, []);

	return (
		<div className="w-4/5 mx-auto">
			<div className="flex justify-between items-center">
				<SearchBar setKanji={handleSetKanji}></SearchBar>
				{kanji && (<button className="bg-slate-300 text-slate-700 rounded h-10 px-4" type="button">Add to deck</button>)}
			</div>
			{kanji && (
				<div className="grid lg:grid-cols-12 lg:gap-4">
					<KanjiMedia kanji={kanji}></KanjiMedia>
					<KanjiInfo kanji={kanji}></KanjiInfo>
					<div className="grid grid-cols-12 col-span-12 bg-green-500 h-60 gap-3 p-3">
						<RadicalInfo radical={kanji?.radical}></RadicalInfo>
						<Examples examples={kanji?.examples}></Examples>
					</div>
				</div>
			)}
		</div>
	);
};

export default Study;
