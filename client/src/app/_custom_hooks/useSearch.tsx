import { useEffect, useState } from 'react';
import axios from 'axios';

const useSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);


    //Handles suggestive search
    //Makes request to the server for every input change
    useEffect(() => {
        async function getMatchingSuggestions() {
            try {
                const serverUrl = `http://127.0.0.1:5000/studyData/kanjis/search/field_search/${inputValue}`;
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

    //Handles the selection from list of suggested results
    const handleSuggestionClick = (selectedValue: string) => {
        setInputValue(selectedValue);
    }; 

    //Handle the mouse up event on the canvas
    //Makes request to the .NET web API for inferrence
    const inferOnMouseUp = () => {

    }

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