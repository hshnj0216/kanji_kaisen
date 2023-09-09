"use client";
import styles from '../loading_indicator.module.scss';
import {FC} from "react";


const LoadingIndicator: FC = () => {
    console.log('loading indicator rendered');
    return (
        <div className={`${styles.skeleton} bg-slate-300 border rounded`}>

        </div>
    )
}

export default LoadingIndicator;