import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState(null);
    
    const onKanjiSelection = useCallback(async (kanjiChar: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/studyData/kanjiDetails/${kanjiChar}`);
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);
    
    return {kanji, onKanjiSelection};
};

export default useKanji;
