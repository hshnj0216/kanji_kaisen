"use client";
import { FC, useState } from "react";
import CountDownTimer from "../CountDownTimer";
import Link from "next/link";

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
                : <div className="bg-slate-800 border rounded border-slate-50 flex flex-col justify-center items-center w-1/2 h-1/2">
                    <p className="mb-5 text-9xl text-slate-50 ">Ready?</p>
                    <div className="w-full flex justify-evenly mt-3">
                            <button type="button" className="py-3 px-5 bg-slate-50 border rounded text-lg"
                                onClick={startCountdown}
                            >
                                Ready
                            </button>
                          
                    </div>
                </div>
            }
        </>
    )
}
export default Ready;