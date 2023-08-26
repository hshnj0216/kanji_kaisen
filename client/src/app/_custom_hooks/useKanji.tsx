import {useState} from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState(null);
    
    const onKanjiSelection = async (kanji: string) => {
        try{
            const response = await axios.get(`http://localhost:5000/studyData/kanjiDetails/${kanji}`);
            setKanji(response.data);
        } catch(error) {
            console.log(error);
        }
    }
    return {kanji, onKanjiSelection};
}

export default useKanji;