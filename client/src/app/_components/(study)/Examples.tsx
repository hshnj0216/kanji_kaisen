"use client";

import { FC } from "react";
interface IExample{
    japanese: string,
}

interface IExamples {
    examples: [],
}
const Examples: FC<IExamples> = ({ examples }) => {
    const limitedExamples = examples.slice(0, 6);
    return (
        <div className="col-span-6 bg-violet-500 p-4">
            {limitedExamples.map((example, index) => (
                <div key={index} className="flex items-center mb-2">
                    <p className="text-l mr-2">日本語: {example.japanese}</p>
                    <p className="text-md">English: {example.meaning.english}</p>
                </div>
            ))}
        </div>
    );
}

export default Examples;