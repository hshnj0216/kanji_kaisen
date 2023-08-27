import {useEffect, useState} from 'react';
import axios from 'axios';

const useSearch = () => {
    const [queryString, setQueryString] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchSuggestions, setSearchSuggestions] = useState([]);

  

    useEffect(() => {
        async function getMatchingKanjis() {
            if(queryString) {
                try{
                    const response = await axios.get(`http://localhost:5000/studyData/kanjis/${queryString}`);
                    setSearchSuggestions(response.data);
                } catch(error) {
                    if(error.response && error.response.status === '404') {
                        setSearchSuggestions([]);
                    }
                }
            } else {
                setSearchSuggestions([]);
            }
        }
        getMatchingKanjis();
    }, [queryString]);

    return {
        queryString,
        setQueryString,
        selectedValue,
        setSelectedValue,
        searchSuggestions, 
        isInputFocused, 
        setIsInputFocused, 
    };
}

export default useSearch;