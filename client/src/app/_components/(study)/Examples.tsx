"use client";
import { FC, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa6";
import { IExamples } from "@/app/_custom_hooks/useKanji";

interface IExamplesProps{
    examples: IExamples | undefined;
}




const Examples: FC<IExamplesProps> = ({ examples }) => {
    const limitedExamples = Array.isArray(examples) ? examples.slice(0, 5) : [];
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    const handlePlay = (index: number) => {
        if (audioRefs.current && audioRefs.current[index]) {
            const audioElement = audioRefs.current[index];
            if (audioElement) {
                audioElement.play();
            }
        }
    }
    

    return (
        <div className="col-span-4 bg-slate-300 p-4 h-90 rounded">
            <h6 className="mb-3 font-bold">Examples</h6>
            {limitedExamples.map((example, index) => (
                <div key={index} className="flex flex-col mb-2">
                    <div className="grid grid-cols-12 w-full m-0">
                        <p className="text-lg col-span-11">{example.japanese}</p>
                        <audio key={example.audio.mp3} ref={el => audioRefs.current[index] = el}>
                            <source src={example.audio.opus} />
                            <source src={example.audio.aac} />
                            <source src={example.audio.ogg} />
                            <source src={example.audio.mp3} />
                        </audio>
                        <button className="col-span-1" type="button" title="play audio" onClick={() => handlePlay(index)}><FaPlay /></button>
                    </div>
                    <p className="text-md">{example.meaning.english}</p>
                </div>
            ))}
        </div>
    );
}

export default Examples;
