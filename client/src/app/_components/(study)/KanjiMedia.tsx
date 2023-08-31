"use client";
import { FC, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import Image from "next/image";
interface IKanjiMedia {
    kanjiVideoSrcs: string[];
    kanjiImageSrcs: string[];
    imageIndex: number;
    isImage: boolean;
    isPlay: boolean;
    videoRef: any,
    onPlayBtnClick: () => void;
    onPrevBtnClick: () => void;
    onNextBtnClick: () => void;
    onTimeUpdate: () => void;
    imageArrayLength: number;
    timings: number[];
}

const KanjiMedia: FC<IKanjiMedia> = ({ 
    kanjiImageSrcs, 
    kanjiVideoSrcs, 
    imageIndex,
    isImage,
    isPlay,
    videoRef,
    onPlayBtnClick,
    onPrevBtnClick,
    onNextBtnClick,
    onTimeUpdate,
    imageArrayLength, 
    timings 
}) => {

    return ( 
        <div className="col-span-3 bg-slate-50 flex flex-col items-center justify-center relative">
            {isImage && (
                <Image 
                    className="h-5/6"
                    key={kanjiImageSrcs?.[imageIndex]} 
                    src={kanjiImageSrcs?.[imageIndex]} 
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
                    onTimeUpdate={onTimeUpdate}
                >
                    {kanjiVideoSrcs?.mp4 && (
                        <source src={kanjiVideoSrcs.mp4} type="video/mp4" />
                    )}
                    {kanjiVideoSrcs?.webm && (
                        <source src={kanjiVideoSrcs.webm} type="video/webm" />
                    )}
                </video>
            )}
            <div className="flex justify-between w-full h-1/6 px-10">
                <button type="button" title="Previous" onClick={onPrevBtnClick}>
                    <FaBackwardStep className="w-6 h-6" />
                </button>
                <button  type="button" title="Play" onClick={onPlayBtnClick}>
                    {isPlay ? <FaPlay className="w-6 h-6"/> : <FaPause className="w-6 h-6"/>}
                </button>
                <button type="button" title="Next" onClick={onNextBtnClick}>
                    <FaForwardStep className="w-6 h-6"/>
                </button>
            </div>
        </div>
    )
}

export default KanjiMedia;
