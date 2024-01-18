"use client";
import styles from '@/app/styles/loading_indicator.module.scss';
import {FC} from "react";


const LoadingIndicator: FC = () => {
    console.log('loading indicator rendered');
    return (
        <div className=''>
            <div className='loading-container'>
                <div className='loading-droplet'>

                </div>
            </div>
        </div>
    )
}

export default LoadingIndicator;