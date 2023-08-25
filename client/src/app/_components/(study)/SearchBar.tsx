"use client";
import axios from "axios";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface ISearchBarProps {
    setKanji: Dispatch<SetStateAction<any>>,
}

const SearchBar: FC<ISearchBarProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");


    //Search handling code
    async function getKanjiDetails(kanji: string) {
        const response = await axios.get(
            `http://localhost:5000/studyData/kanjiDetails/${kanji}`
        );
        props.setKanji(response.data);
    }

    function onSearch() {
        getKanjiDetails(searchTerm);
    }

    //Suggestive search 
    const [queryResultList, setQueryResultList] = useState<object[]>([]);

    async function performSearch(queryString: string) {
        if (queryString) {
            try {
                const response = await axios.get(
                    `http://localhost:5000/studyData/kanjis/${queryString}`
                );
                setQueryResultList(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // Handle the absence of data here
                    setQueryResultList([]);
                } else {

                }
            }
        } else {
            setQueryResultList([]);
        }
    }

    useEffect(() => {
        performSearch(searchTerm);
    }, [searchTerm]);

    function onSuggestionClick(str: string) {
        setSearchTerm(str);
        setSelectedValue(str);
        getKanjiDetails(str);
    }

    return (
        <div className="my-3 grid grid-cols-12 relative w-3/12">
            <div className="grid grid-cols-12 col-span-12">
                <input
                    className="border border-gray-300 p-2 rounded-l-md col-span-9"
                    type="text"
                    placeholder="Search kanjis using the kanji character or the english word"
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedValue("");
                    }}
                    onBlur={() => {
                        setTimeout(() => setIsInputFocused(false), 100); // Delay to allow the click event to trigger on the ul
                    }}
                    onFocus={() => setIsInputFocused(true)}
                    value={selectedValue !== "" ? selectedValue : searchTerm}
                />
                <button
                    type="button"
                    className="bg-slate-300 text-slate-500 p-2 rounded-r-md col-span-2"
                    onClick={onSearch}
                    title="search"
                >
                    <FaMagnifyingGlass className="mx-auto"></FaMagnifyingGlass>
                </button>
            </div>
            {isInputFocused && queryResultList.length > 0 && (
                <ul
                    className="w-9/12 border rounded absolute z-10 bg-white grid grid-cols-12 top-full"
                    onBlur={() => setIsInputFocused(false)}
                >
                    {queryResultList.map((kanji) => (
                        <li
                            key={kanji.kanji}
                            className="bg-slate-50 hover:bg-slate-300 cursor-pointer p-2 col-span-12"
                            onClick={() => onSuggestionClick(kanji.kanji)}
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