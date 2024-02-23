import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';


const useKanji = () => {
    const [kanji, setKanji] = useState<any | null | never>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const videoRef = useRef(null);

    //Side effects
    useEffect(() => {
        if(kanji) {
            console.log(kanji.stroketimes.length);
            let maxIndex = kanji.stroketimes.length - 1;
            setCurrentIndex(maxIndex);
            if(videoRef.current) {
                videoRef.current.currentTime = kanji.stroketimes[maxIndex];
            }
        }
    }, [kanji]);

     //Update video time when currentIndex changes
     useEffect(() => {
        if(videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = kanji.stroketimes[currentIndex];
        }
    }, [currentIndex]);


    useEffect(() => {
        if(kanji) {
            let maxIndex = kanji.stroketimes.length - 1;
            setCurrentIndex(maxIndex);
        }
    }, [kanji])

    useEffect(() => {
        if(videoRef.current) {
            if(isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying])



    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const endpointURL = `http://localhost:5000/studyData/kanjis/${kanjiId}`;
            const response = await axios.get(endpointURL );
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    

    const onPlayPauseButtonClick = () => {
        setIsPlaying(!isPlaying);
    }
    

    const onNextButtonClick = () => {
        let maxIndex = kanji.stroketimes.length - 1;
        if(currentIndex < maxIndex) {
            setCurrentIndex(prevValue => prevValue + 1);
        }
        setIsPlaying(false);
    }
    
    const onPrevButtonClick = () => {
        setCurrentIndex((prevValue) => {
            if (prevValue > 0) {
                return prevValue - 1;
            }
            return prevValue;
        });
        setIsPlaying(false);

    }
    
    
    const onStrokeImageClick = (index: number) => {
        if(index + 1 <= kanji.stroketimes.length - 1) {
            setCurrentIndex(index + 1);
        } else {
            setCurrentIndex(0);
        };
        setIsPlaying(false);
        videoRef.current.currentTime = kanji.stroketimes[currentIndex];
    }

    const onTimeUpdate = () => {
        if(videoRef.current) {
            let stroketimes = kanji?.stroketimes;
            if(videoRef.current.currentTime == stroketimes[stroketimes.length - 1]) {
                setIsPlaying(false);
            } else {
                if(stroketimes) {
                    for(let i = 0; i < stroketimes.length; i++) {
                        if(videoRef.current.currentTime >= stroketimes[i]) {
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    }
    
   
    
    

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
            onTimeUpdate,
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
