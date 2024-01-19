"use client";
import styles from '@/app/styles/loading_indicator.module.scss';
import {FC} from "react";


const SpinnerLoadingIndicator: FC = () => {
    console.log('loading indicator rendered');
    return (
        <div className='border border-t-slate-300 border-8 border-t-8 rounded-full border-slate-50 animate-spin w-20 h-20'>

        </div>
    )
}

export default SpinnerLoadingIndicator;