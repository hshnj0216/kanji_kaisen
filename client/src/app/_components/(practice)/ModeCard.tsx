import { FC } from "react";
import styles from '@/app/styles/practice.module.scss';
import { motion } from "framer-motion";

interface IModeCardProp {
    title: string | number;
    description?: string;
    isDisabled: boolean;
    onClick?: () => void;
    shouldAnimate?: boolean;
    titleSizeLg?: boolean;
}
const ModeCard: FC<IModeCardProp> = ({ title, description, isDisabled, onClick, shouldAnimate, titleSizeLg }) => {
    const variants = shouldAnimate ? {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    } : {
        hidden: { opacity: 1, y: 0 }, 
        visible: { opacity: 1, y: 0 }  
    };

    return (
        <motion.button
            type="button"
            className={`border rounded cursor-pointer p-3 w-80 h-80 flex items-center justify-center m-10 
                        transition-transform ${isDisabled ? "opacity-60" : `${styles.card}`}`}

            onClick={onClick}
            disabled={isDisabled}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            variants={variants} 
            initial="hidden"  
            animate="visible"  
        >
            <div>
                <h3 className={`text-slate-50  mb-3 text-center select-none ${titleSizeLg? "text-5xl" : "text-2xl" }`}>
                    {title}
                </h3>
                {description && (<p className="text-slate-50 text-center">{description}</p>)}
            </div>
        </motion.button>
    )

}

export default ModeCard;