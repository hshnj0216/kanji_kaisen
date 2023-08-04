"use client";
import { FC, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import Image from "next/image";
interface IKanjiMedia {
    kanjiVideoSrcs: string[];
    kanjiImageSrcs: string[];
    imageArrayLength: number;
    timings: number[];
    kanji: any,
}

const KanjiMedia: FC<IKanjiMedia> = ({ kanjiImageSrcs, kanjiVideoSrcs, imageArrayLength, timings }) => {
    const [isImage, setIsImage] = useState(true);
    const [isPlay, setIsPlay] = useState(true);
    const [imageIndex, setImageIndex] = useState(imageArrayLength - 1);
    const videoRef = useRef(null);

    const handlePrevBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if(imageIndex > 0) {
            setImageIndex(imageIndex - 1);
            videoRef.current.currentTime = timings[imageIndex];
        }
    }

    const handlePlayBtnClick = () => {
        setIsImage(false);
        setIsPlay(!isPlay);
        if(isPlay) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
        }
    }

    const handleNextBtnClick = () => {
        setIsImage(true);
        setIsPlay(true);
        if(imageIndex < imageArrayLength - 1) {
            setImageIndex(imageIndex + 1);
            videoRef.current.currentTime = timings[imageIndex];
        }
    }

    const handleTimeUpdate = () => {
        console.log(videoRef.current.currentTime);
        const currentTime = videoRef?.current?.currentTime;
        const closestTimeIndex = timings.reduce((prev, curr, index) => Math.abs(curr - currentTime) < Math.abs(timings[prev] - currentTime) ? index : prev, 0);
        //Alternative: search the timings array since the size will always be small
        setImageIndex(closestTimeIndex);
    }

    return ( 
        <div className="col-span-3 bg-slate-50 flex flex-col items-center justify-center relative">
            {isImage && (
                <Image 
                    className="h-5/6"
                    key={kanjiImageSrcs[imageIndex]} 
                    src={kanjiImageSrcs[imageIndex]} 
                    width={300} 
                    height={325}
                    alt="kanji_img"
                >
                </Image>
            )}
            {!isImage && (
                <video
                    key={kanjiVideoSrcs.mp4}
                    className="w-full object-contain h-5/6"
                    autoPlay
                    ref={videoRef}
                    onTimeUpdate={handleTimeUpdate}
                >
                    {kanjiVideoSrcs.mp4 && (
                        <source src={kanjiVideoSrcs.mp4} type="video/mp4" />
                    )}
                    {kanjiVideoSrcs.webm && (
                        <source src={kanjiVideoSrcs.webm} type="video/webm" />
                    )}
                </video>
            )}
            <div className="flex justify-between w-full h-1/6 px-10">
                <button type="button" title="Previous" onClick={handlePrevBtnClick}>
                    <FaBackwardStep className="w-6 h-6" />
                </button>
                <button  type="button" title="Play" onClick={handlePlayBtnClick}>
                    {isPlay ? <FaPlay className="w-6 h-6"/> : <FaPause className="w-6 h-6"/>}
                </button>
                <button type="button" title="Next" onClick={handleNextBtnClick}>
                    <FaForwardStep className="w-6 h-6"/>
                </button>
            </div>
        </div>
    )
}

export default KanjiMedia;
