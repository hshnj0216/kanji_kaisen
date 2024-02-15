import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '@/app/styles/test.module.scss';

const FrontComponent = () => (
    <div className={styles.front}>
        <p>Front</p>
    </div>
);

const BackComponent = () => (
    <div className={styles.back}>
        <p>Back</p>
    </div>
);

export default function FlipCard() {
    const [isFlipped, setIsFlipped] = useState(false);

    const variants = {
        front: { rotateY: 0 },
        back: { rotateY: 180 },
    };

    return (
        <motion.div
            className={styles.card}
            animate={isFlipped ? 'back' : 'front'}
            variants={variants}
            transition={{ duration: 0.8 }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <FrontComponent />
            <BackComponent />
        </motion.div>
    );
}
