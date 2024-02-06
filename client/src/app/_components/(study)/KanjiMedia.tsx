"use client";
import { FC, useEffect, useState } from "react";
import { FaPlay, FaPause, FaForwardStep, FaBackwardStep } from "react-icons/fa6";

interface IKanjiMediaProps {
    kanjiVideoSrcs: string[] | undefined;
    timingIndex: number;
    imageIndex: number;
    videoRef: any,
    isPlaying: boolean;
    onPlayPauseButtonClick: () => void;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
}

const KanjiMedia: FC<IKanjiMediaProps> = ({
    kanjiVideoSrcs,
    videoRef,
    isPlaying,
    onPlayPauseButtonClick,
    onNextButtonClick,
    onPrevButtonClick,
}) => {

    return (
        <div className="col-span-3 min-h-[370px] bg-slate-50 flex flex-col items-center justify-center relative p-3">
            <video
                key={kanjiVideoSrcs?.mp4}
                className="object-contain h-56 w-56"
                autoPlay={false}
                ref={videoRef}
            >
                {kanjiVideoSrcs.mp4 && (
                    <source src={kanjiVideoSrcs.mp4} type="video/mp4" />
                )}
                {kanjiVideoSrcs.webm && (
                    <source src={kanjiVideoSrcs.webm} type="video/webm" />
                )}
            </video>
            <div className="flex justify-evenly w-full border p-2 rounded-full mt-3">
                <button type="button" title="Previous stroke image" onClick={onPrevButtonClick}
                    className="rounded-full bg-slate-200 p-2"
                >
                    <FaBackwardStep className="w-6 h-6" />
                </button>
                <button type="button" onClick={onPlayPauseButtonClick}
                    className="rounded-full bg-slate-200 p-2"
                >
                    {isPlaying ? <FaPause className="w-6 h-6" title="pause video"/> : 
                    <FaPlay className="w-6 h-6" title="play video"/>}
                </button>
                <button type="button" title="Next stroke image" onClick={onNextButtonClick}
                    className="rounded-full bg-slate-200 p-2"
                >
                    <FaForwardStep className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default KanjiMedia;
