"use client";
import {  FC } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useSearch from "@/app/_custom_hooks/useSearch";

interface ISearchBarProps{
    onKanjiSelection: (kanji: string) => void;
}

const SearchBar: FC<ISearchBarProps> = ({onKanjiSelection}) => {
    const {
        queryString, 
        setQueryString,
        selectedValue,
        setSelectedValue,
        searchSuggestions, 
        isInputFocused, 
        setIsInputFocused, 
    } = useSearch();

    return (
        <div className="my-3 grid grid-cols-12 relative w-3/12">
            <div className="grid grid-cols-12 col-span-12">
                <input
                    className="border border-gray-300 p-2 rounded-l-md col-span-9"
                    type="text"
                    placeholder="Search kanjis using the kanji character or the english word"
                    onChange={(e) => {
                        setQueryString(e.target.value);
                        setSelectedValue("");
                    }}
                    onBlur={() => {
                        setTimeout(() => setIsInputFocused(false), 100); // Delay to allow the click event to trigger on the ul
                    }}
                    onFocus={() => setIsInputFocused(true)}
                    value={selectedValue !== "" ? selectedValue : queryString}
                />
                <button
                    type="button"
                    className="bg-slate-300 text-slate-500 p-2 rounded-r-md col-span-2"
                    title="search"
                >
                    <FaMagnifyingGlass className="mx-auto"></FaMagnifyingGlass>
                </button>
            </div>
            {isInputFocused && searchSuggestions.length > 0 && (
                <ul
                    className="w-9/12 border rounded absolute z-10 bg-white grid grid-cols-12 top-full"
                    onBlur={() => setIsInputFocused(false)}
                >
                    {searchSuggestions.map((kanji) => (
                        <li
                            key={kanji.kanji}
                            className="bg-slate-50 hover:bg-slate-300 cursor-pointer p-2 col-span-12"
                            onClick={() => onKanjiSelection(kanji.kanji)}
                        >
                           <p className="truncate"> 
                                <span className="me-2">{kanji.kanji}</span>
                                <span className="text-slate-400 ">{kanji.meaning}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;