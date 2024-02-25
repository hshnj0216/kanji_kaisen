"use client";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useRadicalSearch from "@/app/_custom_hooks/useRadicalSearch";
import SpinnerLoadingIndicator from "../SpinnerLoadingIndicator";

interface IRadicalSearchProps{
    onKanjiSelection: (id: string) => void;
}


const RadicalSearch: FC<IRadicalSearchProps> = ({onKanjiSelection}) => {

    const {
        kanjiRadicals,
        matchingKanjis,
        selectedRadicals,
        onResetTileClick,
        onRadicalClick,
        isLoading,
    } = useRadicalSearch();

    return (
        <div className="bg-slate-300 p-3 border-b border-r border-l border-slate-50 rounded-b absolute top-full z-10 w-full
                        flex flex-wrap max-h-80 justify-center overflow-scroll overflow-x-hidden"
        >
            <div className="w-full h-2/6 flex flex-col border-b border-slate-50 flex-wrap">
                {(matchingKanjis && matchingKanjis.length > 0) && (
                    <p className="border-b border-slate-50">Matching kanjis</p>
                )}
               {matchingKanjis && matchingKanjis.length > 0 && !isLoading ? (
                    <div className="flex flex-wrap">
                        {matchingKanjis?.map((kanji) => (
                            <div key={kanji.id}
                                className="border rounded p-2 m-1 cursor-pointer bg-slate-500 text-slate-50"
                                onClick={() => onKanjiSelection(kanji.id)}
                            >
                                {kanji.kanji}
                            </div>
                        ))}
                    </div>
               ) : (
                    isLoading ? (
                        <div className="flex justify-center items-center my-3">
                            <SpinnerLoadingIndicator />
                        </div>
                    ) : ""
               )

               }
            </div>
            <div className="w-full h-4/6 flex flex-col flex-wrap">
                <div className="border p-2 m-1 rounded bg-slate-500 flex items-center text-slate-50 justify-center cursor-pointer"
                    title="Reset selected components"
                    onClick={onResetTileClick}
                >
                    Reset Selected Radicals
                </div>
                {kanjiRadicals.map(([strokeCount, radicals]) => (
                    <div key={strokeCount as string} className="flex flex-col">
                        <p className="bg-slate-800 ms-1 mt-3 ps-1 text-slate-50">{strokeCount}</p>
                        <div className="flex flex-wrap w-full box-border">
                            {radicals.map((radical: string) => (
                                <div key={radical as string}
                                    className={`${selectedRadicals.has(radical) ? 'bg-slate-500' : ''}
                                    py-1 px-2 m-1 bg-slate-50 border rounded box-border cursor-pointer`}
                                    onClick={() => onRadicalClick(radical)}
                                >
                                    {radical}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RadicalSearch;