import {useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState();    
   
    //Functionalities for the KanjiMedia component
    //State that determines if a video or image in rendered
    const [isImage, setIsImage] = useState(true); 
    //State that determines if a play or pause button is rendered
    const [isPlay, setIsPlay] = useState(true); 
    const [imageIndex, setImageIndex] = useState<number>();
    const [displayDecomposition, setDisplayDecomposition] = useState(false);
    const videoRef = useRef(null);

    
    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/studyData/kanjiDetails/${kanjiId}`);
            setKanji(response.data);
            setImageIndex(response.data.kanji.strokes.count - 1);
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(imageIndex); 

    const onPrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (imageIndex > 0) {
            setImageIndex(imageIndex - 1);
        }
    }

    const onPlayBtnClick = () => {
        setIsImage(false);
        setIsPlay(!isPlay);
        if (isPlay) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }

    const onNextBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (imageIndex < kanji.kanji.strokes.count - 1) {
            setImageIndex(imageIndex + 1);
        }
    }

    useEffect(() => {
        if (videoRef && videoRef.current) {
            videoRef.current.currentTime = kanji?.kanji?.strokes?.timings[imageIndex];
        }
    }, [imageIndex])

    const onTimeUpdate = () => {
        const currentTime = videoRef?.current?.currentTime;
        //const closestTimeIndex = timings.reduce((prev, curr, index) => Math.abs(curr - currentTime) < Math.abs(timings[prev] - currentTime) ? index : prev, 0);
        //Alternative: search the timings array since the size will always be small
        for(let [index, timing] of kanji.kanji.strokes.timings.entries()) {
            if(timing > currentTime) {
                setImageIndex(index - 1);
                break;
            }
        }

    }

    return {
        kanji, 
        onKanjiSelection,
        displayDecomposition,
        setDisplayDecomposition,
        kanjiMediaProps: {
            kanjiImageSrcs: kanji?.kanji?.strokes?.images,
            kanjiVideoSrcs: kanji?.kanji?.video,
            timings: kanji?.strokes?.timings,
            isImage,
            isPlay,
            imageIndex,
            videoRef,
            onPrevBtnClick,
            onPlayBtnClick,
            onNextBtnClick,
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
    };
};

export default useKanji;
