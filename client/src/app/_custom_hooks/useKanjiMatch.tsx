import {useState} from 'react';
import axios from 'axios';

const useKanjiMatch = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjiMeaningPairs, setKanjiMeaningPairs] = useState([]);

    const onGradeSelection = async (grade: number) => {
        try{
            const response = await axios.get(`http://localhost:5000/practiceData/kanjiMatchData/${grade}`);
            setKanjiMeaningPairs(response.data);
            setIsPlayMode(true);
        } catch(error) {
            console.log(error);
        }
    }

    return {kanjiMeaningPairs, isPlayMode, onGradeSelection, setIsPlayMode};
}

export default useKanjiMatch;