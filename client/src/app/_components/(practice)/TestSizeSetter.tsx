"use client"

import {FC, useState, useEffect} from "react";
import ModeCard from "./ModeCard";

interface ITestSizeSetter{
    onTestSizeSelection: (grade: number) => void;
}

const TestSizeSetter: FC<ITestSizeSetter> = ({onTestSizeSelection}) => {

    const sizes = [10, 20, 30];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <p className="text-slate-50 text-7xl select-none">Select a test size:</p>
            <div className="flex justify-center">
                {sizes.map(size => <ModeCard key={size} title={size} description="" isDisabled={false} onClick={() => onTestSizeSelection(size)} />)}
            </div>
        </div>
    )

}

export default TestSizeSetter;