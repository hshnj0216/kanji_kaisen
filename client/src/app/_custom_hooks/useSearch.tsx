import {useEffect, useState} from 'react';
import axios from 'axios';

const useSearch = () => {
    const [queryString, setQueryString] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function getMatchingKanjis() {
            const response = await axios.get(`http://localhost:5000/studyData/kanjis/${queryString}`);
            setSearchResults(response.data);
        }
    }, [queryString])

    return {queryString, searchResults};
}

export default useSearch;