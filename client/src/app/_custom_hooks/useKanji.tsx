import {useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState();
    
    const onKanjiSelection = useCallback(async (kanjiChar: string) => {
        try {
            const response = await axios.get(`http://localhost:5000/studyData/kanjiDetails/${kanjiChar}`);
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    //Functionalities for the KanjiMedia component
    //State that determines if a video or image in rendered
    const [isImage, setIsImage] = useState(true); 
    //State that determines if a play or pause button is rendered
    const [isPlay, setIsPlay] = useState(true); 
    console.log(`images length: ${JSON.stringify(kanji?.kanji?.strokes?.images?.length, null, 4)}`);
    const [imageIndex, setImageIndex] = useState(kanji?.kanji?.strokes?.images?.length !== undefined ? kanji?.kanji?.strokes?.images?.length - 1 : 0);
    console.log(`imageIndex is: ${imageIndex}`);
    const videoRef = useRef(null);


    const onPrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (videoRef.current && imageIndex > 0 && videoRef.current.currentTime) {
            setImageIndex(imageIndex - 1);
            console.log(`Image index: ${imageIndex}`);
            videoRef.current.currentTime = timings[imageIndex];
        }
    }

    const onPlayBtnClick = () => {
        setIsImage(false);
        setIsPlay(!isPlay);
        console.log(timings.length);
        if (isPlay) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }

    const onNextBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (imageIndex < imageArrayLength - 1) {
            setImageIndex(imageIndex + 1);
            videoRef.current.currentTime = timings[imageIndex];
        }
    }

    const onTimeUpdate = () => {
        const currentTime = videoRef?.current?.currentTime;
        const closestTimeIndex = timings.reduce((prev, curr, index) => Math.abs(curr - currentTime) < Math.abs(timings[prev] - currentTime) ? index : prev, 0);
        //Alternative: search the timings array since the size will always be small
        setImageIndex(closestTimeIndex);
    }

    //Functionalities for the KanjiInfo component

    
    return {
        kanji, 
        onKanjiSelection,
        kanjiMediaProps: {
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
