"use client";
import Image from "next/image";
import { FC } from "react";

interface IKanjiMedia {
    kanji: any,
}

const KanjiMedia: FC<IKanjiMedia> = ({kanji}) => {
    return (
        <>
            <div className="col-span-3 bg-red-500 h-60 flex items-center justify-center relative">
                {kanji && (
                    <Image
                        src={kanji?.kanji?.video?.poster}
                        layout="fill"
                        objectFit="contain"
                        alt="kanji_img"
                    />
                )}
            </div>
            <div className="col-span-3 bg-white h-60 flex items-center justify-center relative">
                {kanji && (
                    <video
                        className="w-full h-full object-contain"
                        autoPlay
                        loop
                        key={kanji?.kanji?.character}
                    >
                        {kanji.kanji.video.mp4 && (
                            <source src={kanji?.kanji?.video?.mp4} type="video/mp4" />
                        )}
                        {kanji.kanji.video.webm && (
                            <source src={kanji?.kanji?.video?.webm} type="video/webm" />
                        )}
                    </video>
                )}
            </div>
        </>
    )
}

export default KanjiMedia;