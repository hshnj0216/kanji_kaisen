 "use client";
 import {useState, useEffect, FC} from "react";

 const CountDownTimer: FC = () => {
    const [time, setTime] = useState(3);
    const [isGo, setIsGo] = useState(false);
    useEffect(() => {
        if(time > 0) {
            setTimeout(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else {
            setIsGo(true);
        }
    }, [time]); // Add time as a dependency so that the effect is run every time the time changes
    return (
        <div className="">
            {isGo? <p className="text-15xl text-slate-50">Go!</p> 
                : <p className="text-15xl text-slate-50">{time}</p>
            }
        </div>
    )
 }

 export default CountDownTimer;