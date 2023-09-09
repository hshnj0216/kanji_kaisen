"use client";
import { FC, useState } from "react";
import CountDownTimer from "../CountDownTimer";

interface IReadyProps {
    isReady: boolean;
    setIsReady: (status: boolean) => void;
}

const Ready: FC<IReadyProps> = ({ setIsReady, isReady }) => {
    const [countddownStarted, setCountdownStarted] = useState(false);
    const startCountdown = () => {
        setCountdownStarted(true);
        setTimeout(() => {
            setIsReady(true);
        }, 4000);
    }
    return (
        <>
            {countddownStarted ?
                <CountDownTimer />
                : <div className="bg-slate-800 flex flex-col justify-center items-center w-full h-full">
                    <p className="mb-5 text-9xl text-slate-50 ">Ready?</p>
                    <button type="button" className="p-3 bg-slate-50 border rounded text-lg"
                        onClick={startCountdown}
                    >
                        Ready
                    </button>
                </div>
            }
        </>
    )
}
export default Ready;