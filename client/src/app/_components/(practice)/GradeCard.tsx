import {FC} from "react";
import {motion} from "framer-motion";
import styles from "@/app/styles/practice.module.scss";

interface IAnimationState {
    opacity?: number;
    x?: number;
    scale?: number;
}

interface IGradeCardProps {
    grade: number;
    index: number;
    onGradeSelection: (grade: number) => void;
}


const GradeCard: FC<IGradeCardProps> = ({grade, index, onGradeSelection}) => {
    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };
    return (
        <motion.button
            custom={index}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
            onClick={() => onGradeSelection(grade)}
            whileHover={{ scale: 1.1, transition: {duration: 0.1} }} 
            whileTap={{ scale: 0.9 }}
            className={`${styles.card} border rounded h-80 border-slate-50 p-6`}
        >
            <div>
                <h3 className="text-slate-50 text-2xl mb-3 text-center select-none">Grade {grade}</h3>
            </div>
        </motion.button>
    )
}

export default GradeCard;