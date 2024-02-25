 
import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';

interface IOnyomi{
    romaji: string;
    katakana: string;
}

interface IKunyomi{
    romaji: string;
    hiragana: string;
}
interface IStroke{
    count: number;
    timings: number[];
    images: string[];
}

interface IVideo{
    poster: string;
    webm: string;
    mp4: string;
}

interface IKanjiDetails{
    character: string;
    video: IVideo
    strokes: IStroke;
    onyomi: IOnyomi;
    kunyomi: IKunyomi;
}

interface IRadicalName{
    hiragana: string;
    romaji: string;
}

interface IRadical{
    character: string;
    strokes: number;
    image: string;
    name: IRadicalName;
    meaning: {english: string};
}

interface IMeaning {
    english: string;
}

interface IAudio {
    ogg: string;
    mp3: string;
    opus: string;
    aac: string;
}
export interface IExample {
    meaning: IMeaning;
    japanese: string;
    english: string;
    audio: IAudio;
}

export interface IExamples {
    examples: IExample[],
}

interface IKanji {
    meaning: string;
    stroketimes: number[];
    kanji: IKanjiDetails;
    strokes: IStroke;
    kstroke: number;
    grade: number;
    radical: IRadical;
    mn_hint: string;
    examples: IExamples;
}

const useKanji = () => {
    const [kanji, setKanji] = useState<IKanji | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [maxIndex, setMaxIndex] = useState<number>(0);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    //Side effects
    //Side effects
    useEffect(() => {
        if (kanji) {
            let newMaxIndex = kanji.stroketimes.length - 1;
            setMaxIndex(newMaxIndex);
            setCurrentIndex(newMaxIndex);
            if (videoRef.current) {
                videoRef.current.currentTime = kanji.stroketimes[newMaxIndex];
            }
        }
    }, [kanji]);

    //Update video time when currentIndex changes
    useEffect(() => {
        if (videoRef.current && kanji) {
            videoRef.current.pause();
            videoRef.current.currentTime = kanji.stroketimes[currentIndex];
        }
    }, [currentIndex, kanji]);

    useEffect(() => {
        if (currentIndex === 0 && videoRef.current) {
            console.log("video played");
            videoRef.current.play();
        }
    }, [currentIndex]);

    useEffect(() => {
        if (videoRef.current && kanji) {
            if (isPlaying) {
                if (currentIndex == kanji.stroketimes.length - 1) {
                    setCurrentIndex(0);
                } else {
                    console.log("video played");
                    videoRef.current.play();
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying, kanji]);


    useEffect(() => {
        if (kanji) {
            let maxIndex = kanji.stroketimes.length - 1;
            setCurrentIndex(maxIndex);
            console.log("currentIndex in kanji", currentIndex);
        }
    }, [kanji])

    useEffect(() => {
        if (videoRef.current) {
            if (kanji && isPlaying) {
                if (currentIndex == kanji.stroketimes.length - 1) {
                    setCurrentIndex(0);
                } else {
                    console.log("video played");
                    videoRef.current.play();
                }
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);



    const onKanjiSelection = useCallback(async (kanjiId: string) => {
        try {
            const endpointURL = `http://localhost:5000/studyData/kanjis/${kanjiId}`;
            const response = await axios.get(endpointURL);
            setKanji(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);



    const onPlayPauseButtonClick = () => {
        setIsPlaying(!isPlaying);
    }


    const onPrevButtonClick = () => {
        setCurrentIndex((prevValue) => {
            let newValue = prevValue > 0 ? prevValue - 1 : prevValue;
            console.log("currentIndex", newValue);
            return newValue;
        });
        setIsPlaying(false);
    }

    const onNextButtonClick = () => {
      if(kanji) {
        setCurrentIndex((prevValue) => {
            let newValue = prevValue < kanji.stroketimes.length - 1 ? prevValue + 1 : prevValue;
            console.log("currentIndex", newValue);
            return newValue;
        });
        setIsPlaying(false);
      }
    }

    useEffect(() => {
        console.log("currentIndex", currentIndex);
    }, [currentIndex]);



    const onStrokeImageClick = (index: number) => {
       if(kanji && videoRef.current) {
            if (index + 1 <= kanji.stroketimes.length - 1) {
                setCurrentIndex(index + 1);
            } else {
                setCurrentIndex(0);
            };
            setIsPlaying(false);
            videoRef.current.currentTime = kanji.stroketimes[currentIndex];
       }
    }

    const onTimeUpdate = () => {
        if (kanji && videoRef.current) {
            let stroketimes = kanji.stroketimes;
            if (videoRef.current.currentTime == stroketimes[stroketimes.length - 1]) {
                setIsPlaying(false);
            } else {
                if (stroketimes) {
                    for (let i = 0; i < stroketimes.length; i++) {
                        if (videoRef.current.currentTime >= stroketimes[i]) {
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
        kanjiMediaProps: {
            kanjiImageSrcs: kanji?.kanji?.strokes?.images,
            kanjiVideoSrcs: kanji?.kanji?.video,
            timings: kanji?.strokes.timings,
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
        kanjiExamplesProps: {
            examples: kanji?.examples,
        }
    };
};

export default useKanji;
