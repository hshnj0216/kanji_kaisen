"use client"

import {FC, useState, useEffect} from "react";
import ModeCard from "./ModeCard";

interface ITestSizeSetter{
    onTestSizeSelection: (grade: number) => void;
}

const TestSizeSetter: FC<ITestSizeSetter> = ({onTestSizeSelection}) => {

    const sizes = [10, 15, 20, 25, 30];

    return (
        <div className="flex flex-col">
            <p className="text-slate-50">Select a test size:</p>
            <div className="flex">
                {sizes.map(size => <ModeCard key={size} title={size} description="" isDisabled={false} onClick={() => onTestSizeSelection(size)} />)}
            </div>
        </div>
    )

}

export default TestSizeSetter;