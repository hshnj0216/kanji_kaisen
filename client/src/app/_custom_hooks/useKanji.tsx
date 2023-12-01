import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

const useKanji = () => {
    const [kanji, setKanji] = useState<any | null | never>();
    const [isImage, setIsImage] = useState<boolean>(true);
    const [isPlay, setIsPlay] = useState<boolean>(true);
    const [timingIndex, setTimingIndex] = useState<number>(0);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [videoTiming, setVideoTiming] = useState<number>(0);
    const [displayDecomposition, setDisplayDecomposition] = useState<boolean>(false);
    const videoRef = useRef(null);

    //Side effects

    //Kanji change effects
    //Resets the imageIndex when the kanji changes
    useEffect(() => {
        const initialImageIndex = kanji?.kanji.strokes.count - 1;
        setIsImage(true);
        setImageIndex(initialImageIndex);
    }, [kanji]);

    // Media switch side effect
    useEffect(() => {
        // Check if transitioning from image to video
        if (!isImage) {
            const timings = kanji?.kanji.strokes.timings;
            if (timings && timings.length > imageIndex && videoRef.current) {
                videoRef.current.currentTime = timings[timingIndex];
            }
        }
    }, [isImage, imageIndex, videoRef.current]);
    //End of side effects

    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const serverUrl = `http://127.0.0.1:5000/studyData/kanjiDetails/${kanjiId}`;
            const response = await axios.get(serverUrl);
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const onPrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if (timingIndex > 0 || imageIndex > 0) {
            setTimingIndex(prevTimingIndex => prevTimingIndex - 1);
            setImageIndex(prevImageIndex => prevImageIndex - 1);
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
        let strokeCount = kanji?.kanji.strokes.count - 1;
        if (imageIndex < strokeCount) {
            setImageIndex(prevImageIndex => prevImageIndex + 1);
            setTimingIndex(prevTimingIndex => prevTimingIndex + 1);
        }
    }

    //Event handler for the video element
    const onTimeUpdate = () => {

        if (videoRef.current) {

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
            setImageIndex(closestTimeIndex);
            setTimingIndex(closestTimeIndex);

            if (videoRef.current.ended) {
                console.log('video ended');
                let images = kanji?.kanji.strokes.images;
                setImageIndex(images.length - 1);
                setTimingIndex(0);
                setIsImage(true);
                setIsPlay(true);
            }
        }


    }

    const onStrokeImageClick = (index: number) => {
        setImageIndex(index);
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
        kanjiStrokeImagesProps: {
            images: kanji?.kanji?.strokes.images,
            onStrokeImageClick,
            timingIndex,
            imageIndex,
        },
    };
};

export default useKanji;
