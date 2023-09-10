"use client";
import { FC, useState, useEffect } from "react";

interface ITimerProps{
    onTimeUpdate: (time: number) => void;
}
const Timer:FC<ITimerProps> = ({onTimeUpdate}) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => {
                const newSeconds = seconds + 1;
                onTimeUpdate(newSeconds);
                return newSeconds;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [onTimeUpdate]);

    const minutes = Math.floor(seconds / 60);
    const displaySeconds = seconds % 60;
    return (
        <div className="border rounded bg-slate-800 w-1/6 p-3 mx-auto my-3 flex items-center justify-center">
            <span className="text-slate-50 text-5xl">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
            </span>
        </div>
    )
}

export default Timer;