import {useState} from 'react';
import axios from 'axios';
import useLoading from './useLoading';

const useKanjiMatch = () => {
    const [isPlayMode, setIsPlayMode] = useState(false);
    const [kanjiMeaningPairs, setKanjiMeaningPairs] = useState([]);
    const {isLoading, setIsLoading} = useLoading();

    const onGradeSelection = async (grade: number) => {
        try{
            const response = await axios.get(`http://localhost:5000/practiceData/kanjiMatchData/${grade}`);
            setKanjiMeaningPairs(response.data);
            setIsLoading(false);
            setIsPlayMode(true);
        } catch(error) {
            console.log(error);
        }
    }

    return {
        kanjiMeaningPairs, 
        isPlayMode, 
        onGradeSelection, 
        setIsPlayMode, 
        isLoading
    };
}

export default useKanjiMatch;