"use client";
import { FC, useRef, useState } from "react";
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import Image from "next/image";
interface IKanjiMedia {
    kanji: any,
}

const KanjiMedia: FC<IKanjiMedia> = ({ kanji }) => {
    const imageArrayLength = kanji?.kanji?.strokes.count;
    const [isImage, setIsImage] = useState(true);
    const [isPlay, setIsPlay] = useState(true);
    const [imageIndex, setImageIndex] = useState(imageArrayLength - 1);
    const [currentTime, setCurrentTime] = useState()
    const videoRef = useRef(null);

    const handlePrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if(imageIndex > 0) {
            setImageIndex(imageIndex - 1);
            videoRef.current.currentTime = kanji?.kanji?.strokes.timings[imageIndex];
        }
    }

    const handlePlayBtnClick = () => {
        setIsImage(false);
        setIsPlay(!isPlay);
        if(isPlay) {
            videoRef?.current?.play();
        } else {
            videoRef?.current?.pause();
        }
    }

    const handleNextBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if(imageIndex < imageArrayLength - 1) {
            setImageIndex(imageIndex + 1);
            videoRef.current.currentTime = kanji?.kanji?.strokes.timings[imageIndex];
        }
    }

    const handleTimeUpdate = () => {
        const currentTime = videoRef.current.currentTime;
        const closestTimeIndex = kanji.kanji.strokes.timings.reduce((prev, curr, index) => Math.abs(curr - currentTime) < Math.abs(kanji.kanji.strokes.timings[prev] - currentTime) ? index : prev, 0);
        setImageIndex(closestTimeIndex);
    }

    return (
        <div className="col-span-3 bg-white flex flex-col items-center justify-center relative">
            {isImage && (
                <Image src={kanji.kanji.strokes.images[imageIndex]} width={300} height={300}></Image>
            )}
            {!isImage && (
                <video
                    className="w-full object-contain flex-grow"
                    autoPlay
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                >
                    {kanji.kanji.video.mp4 && (
                        <source src={kanji?.kanji?.video?.mp4} type="video/mp4" />
                    )}
                    {kanji.kanji.video.webm && (
                        <source src={kanji?.kanji?.video?.webm} type="video/webm" />
                    )}
                </video>
            )}
            <div className="flex justify-between border border-red-500 w-full">
                <button type="button" title="Previous" onClick={handlePrevBtnClick}><FaBackwardStep/></button>
                <button type="button" title="Play" onClick={handlePlayBtnClick}>{isPlay ? <FaPlay/> : <FaPause/>}</button>
                <button type="button" title="Next" onClick={handleNextBtnClick}><FaForwardStep/></button>
            </div>
        </div>
    )
}

export default KanjiMedia;
