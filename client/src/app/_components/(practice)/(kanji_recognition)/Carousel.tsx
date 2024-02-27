import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { GrPrevious, GrNext } from "react-icons/gr";
import { IMistake } from '@/app/_custom_hooks/useKanjiQuizGame';
import { FC } from "react";
import MistakePopUp from './MistakePopUp';
interface ICarouselProps {
    mistakes: IMistake[];
}

const Carousel: FC<ICarouselProps> = ({ mistakes }) => {
    const [hoveredMistake, setHoveredMistake] = useState<IMistake | null>(null);
    const [windowStart, setWindowStart] = useState(0);

    const onNextButtonClick = () => {
        if (windowStart < mistakes.length - 5) {
            setWindowStart(windowStart + 1);
        }
    }

    const onPrevButtonClick = () => {
        if (windowStart > 0) {
            setWindowStart(windowStart - 1);
        }
    }

    const window = mistakes.slice(windowStart, windowStart + 5);

    return (
        <div className="grid grid-cols-12 mb-5 w-4/5 mx-auto">
            {mistakes.length > 5 && windowStart != 0 && (
                <motion.button
                    type="button"
                    className="bg-gray-200 p-2 m-2 col-start-1 col-end-2"
                    onClick={onPrevButtonClick}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale:0.9}}
                    transition={{duration: 0.2}}
                >
                    <GrPrevious />
                </motion.button>
            )}
            <div className="flex gap-3 mx-3 col-start-2 col-end-12 justify-center h-20">
                {window.map((mistake, key) => (
                    <div key={key} 
                        className="bg-slate-50 h-20 w-20 flex relative items-center justify-center text-2xl rounded select-none"
                        onMouseEnter={() => setHoveredMistake(mistake)}
                        onMouseLeave={() => setHoveredMistake(null)}
                    >
                        {mistake.character}
                        {hoveredMistake?.character == mistake.character && (
                        <MistakePopUp mistake={mistake} />
                    )}
                    </div>
                   
                ))}
            </div>
            {mistakes.length > 5 && windowStart != mistakes.length - 5 && (
                <motion.button
                    type="button"
                    className="bg-gray-200 p-2 m-2 col-start-12 col-end-13"
                    onClick={onNextButtonClick}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale:0.9}}
                    transition={{duration: 0.2}}
                >
                    <GrNext />
                </motion.button>
            )}
        </div>
    );
};
export default Carousel;
