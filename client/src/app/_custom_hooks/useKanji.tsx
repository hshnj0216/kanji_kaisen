import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';


const useKanji = () => {
    const [kanji, setKanji] = useState<any | null | never>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const videoRef = useRef(null);


    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const endpointURL = `http://localhost:5000/studyData/kanjis/${kanjiId}`;
            const response = await axios.get(endpointURL );
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if(kanji) {
            console.log(kanji.stroketimes.length);
            let maxIndex = kanji.stroketimes.length - 1;
            setCurrentIndex(maxIndex);
        }
    }, [kanji])

    const onPlayPauseButtonClick = () => {
        setIsPlaying(!isPlaying);
        if(kanji && videoRef.current) {
            let maxIndex = kanji.stroketimes.length - 1;
            if(currentIndex == maxIndex) {
                setCurrentIndex(0);
            }
            if(isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            } 
            
        }
    }

    const onNextButtonClick = () => {
        setCurrentIndex((prevValue) => {
            let maxIndex = kanji.stroketimes.length - 1;
            if (prevValue < maxIndex) {
                return prevValue + 1;
            }
            return prevValue;
        });
    }
    
    const onPrevButtonClick = () => {
        setCurrentIndex((prevValue) => {
            if (prevValue > 0) {
                return prevValue - 1;
            }
            return prevValue;
        });
    }
    
    const onStrokeImageClick = (index: number) => {
        setCurrentIndex(index);
        setIsPlaying(false);
    }

    useEffect(() => {
        if(kanji) {
            videoRef.current.currentTime = kanji.stroketimes[currentIndex];
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [currentIndex])

    return {
        kanji,
        onKanjiSelection,
        kanjiDecompositionProps: {
            kanjiTree: kanji?.component_decomposition,
        },
        kanjiMediaProps: {
            kanjiImageSrcs: kanji?.kanji?.strokes?.images,
            kanjiVideoSrcs: kanji?.kanji?.video,
            timings: kanji?.strokes?.timings,
            isPlaying,
            currentIndex,
            videoRef,
            onPlayPauseButtonClick,
            onPrevButtonClick,
            onNextButtonClick,
        },
        kanjiInfoProps: {
            meaning: kanji?.meaning,
            onyomiKatakana: kanji?.kanji?.onyomi.katakana,
            kunyomiHiragana: kanji?.kanji?.kunyomi.hiragana,
            strokeCount: kanji?.kstroke,
            grade: kanji?.grade,
            radicalImageSrc: kanji?.radical?.image,
            radicalNameHiragana: kanji?.radical?.name.hiragana,
            radicalMeaningEnglish: kanji?.radical?.meaning?.english,
            meaningHint: kanji?.mn_hint,
        },
        kanjiStrokeImagesProps: {
            images: kanji?.kanji?.strokes.images,
            onStrokeImageClick,
            currentIndex,
        },
    };
};

export default useKanji;
