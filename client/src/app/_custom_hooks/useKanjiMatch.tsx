import {useState} from 'react';
import axios from 'axios';
import useLoading from './useLoading';

const useKanjiMatch = () => {
    const [isPlayMode, setIsPlayMode] = useState<boolean>(false);
    const [kanjiMeaningPairs, setKanjiMeaningPairs] = useState([]);
    const [testSize, setTestSize] = useState<number>();
    const [hasSelectedTestSize, setHasSelectedTestSize] = useState<boolean>(false);
    const [grade, setGrade] = useState<number>();
    const [hasSelectedGrade, setHasSelectedGrade] = useState<boolean>(false);
    const {isLoading, setIsLoading} = useLoading();

    const onGradeSelection = (grade: number) => {
        setGrade(grade);
        setHasSelectedGrade(true);
    }

    const onTestSizeSelection = async (testSize: number) => {
        setTestSize(testSize);
        setHasSelectedTestSize(true);
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/practiceData/kanjiMatchData/${grade}/${testSize}`);
        setKanjiMeaningPairs(response.data);
        setIsLoading(false);
    }

    return {
        kanjiMeaningPairs, 
        isPlayMode, 
        onGradeSelection, 
        setIsPlayMode, 
        isLoading,
        onTestSizeSelection,
        hasSelectedGrade,
        hasSelectedTestSize,
    };
}

export default useKanjiMatch;