import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState();

    //Functionalities for the KanjiMedia component
    //State that determines if a video or image in rendered
    const [isImage, setIsImage] = useState(true);
    //State that determines if a play or pause button is rendered
    const [isPlay, setIsPlay] = useState(true);
    const [timingIndex, setTimingIndex] = useState<number>();
    const [videoTiming, setVideoTiming] = useState(0);
    const [displayDecomposition, setDisplayDecomposition] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const calculatedTimingIndex = kanji?.kanji.strokes.count - 1;
        setTimingIndex(calculatedTimingIndex);
    }, [kanji]);

    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const endpoint = `http://localhost:5000/studyData/kanjiDetails/${kanjiId}`;
            const response = await axios.get(endpoint);
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const updateTime = () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
            videoRef.current.currentTime = kanji?.kanji.strokes.timings[timingIndex];
        }
    }


    const onPrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (timingIndex > 0) {
            setTimingIndex(prevTimingIndex => prevTimingIndex - 1);
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
        if (timingIndex < kanji.kanji.strokes.count - 1) {
            setTimingIndex(prevTimingIndex => prevTimingIndex + 1);
        }
    }

    useEffect(() => {
        if (!isImage) {

            videoRef.current.currentTime = kanji?.kanji?.strokes?.timings[timingIndex];
        }
    }, [isImage]);

    useEffect(() => {
        console.log(`videoTiming: ${videoTiming}`);
    }, [videoTiming]);

    const onTimeUpdate = () => {
        let currentTime = videoRef.current.currentTime;
        let timings = kanji?.kanji?.strokes?.timings;
        let closestTime = timings[0];
        let closestTimeIndex = 0;

        timings.forEach((time, index) => {
            if (Math.abs(currentTime - time) < Math.abs(currentTime - closestTime)) {
                closestTime = time;
                closestTimeIndex = index;
            }
        });

        setVideoTiming(closestTime);
        setTimingIndex(closestTimeIndex);
    }

    const onStrokeImageClick = (index: number) => {
        setTimingIndex(index);
        setIsImage(true);
    }


    return {
        kanji,
        onKanjiSelection,
        displayDecomposition,
        setDisplayDecomposition,
        kanjiDecompositionProps: {
            kanjiTree: kanji?.component_decomposition,
        },
        kanjiMediaProps: {
            kanjiImageSrcs: kanji?.kanji?.strokes?.images,
            kanjiVideoSrcs: kanji?.kanji?.video,
            timings: kanji?.strokes?.timings,
            isImage,
            isPlay,
            timingIndex,
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
        kanjiStrokeImagesProps: {
            images: kanji?.kanji?.strokes.images,
            onStrokeImageClick,
            timingIndex,
        },
    };
};

export default useKanji;
