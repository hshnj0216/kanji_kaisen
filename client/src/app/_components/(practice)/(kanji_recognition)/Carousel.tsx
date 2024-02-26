import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { GrPrevious, GrNext } from "react-icons/gr";


const Carousel = () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [window, setWindow] = useState(items.slice(0, 5));

    const onNextButtonClick = () => {
        if (window[window.length - 1] < items[items.length - 1]) {
            setWindow(prevWindow => {
                const newStartIndex = items.indexOf(prevWindow[0]) + 1;
                return items.slice(newStartIndex, newStartIndex + 5);
            });
        }
    }

    const onPrevButtonClick = () => {
        if (window[0] > items[0]) {
            setWindow(prevWindow => {
                const newStartIndex = items.indexOf(prevWindow[0]) - 1;
                return items.slice(newStartIndex, newStartIndex + 5);
            });
        }
    }
    
    return (
        <div className="grid grid-cols-12">
            <motion.button 
                type="button" 
                className="bg-gray-200 p-2 m-2 col-span-1"
                onClick={onPrevButtonClick}
            >
                <GrPrevious />
            </motion.button>
            <div className="flex gap-3 mx-3 overflow-x-hidden col-span-10 justify-center">
                {window.map((item, key) => (
                    <div key={key} className="bg-gray-300 h-32 w-32 flex items-center justify-center">
                        {item}
                    </div>
                ))}
            </div>
            <motion.button 
                type="button" 
                className="bg-gray-200 p-2 m-2 col-span-1"
                onClick={onNextButtonClick}
            >
                <GrNext />
            </motion.button>
        </div>
    );
};
export default Carousel;
