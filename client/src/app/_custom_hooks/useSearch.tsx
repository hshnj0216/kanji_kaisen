import { useEffect, useState } from 'react';
import axios from 'axios';

const useSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);


    //Handle suggestive search
    useEffect(() => {
        async function getMatchingSuggestions() {
            try {
                const serverUrl = `http://127.0.0.1:5000/studyData/kanjis/search/${inputValue}`;
                const response = await axios.get(serverUrl);
                setSearchSuggestions(response.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setSearchSuggestions([]);
                }
            }
        }

        getMatchingSuggestions();
    }, [inputValue]);

    const handleSuggestionClick = (selectedValue: string) => {
        console.log(selectedValue);
        setInputValue(selectedValue);
    };

    return {
        inputValue,
        setInputValue,
        searchSuggestions,
        handleSuggestionClick,
        isInputFocused,
        setIsInputFocused,
    };
}

export default useSearch;