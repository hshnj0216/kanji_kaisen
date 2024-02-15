"use client";
import ModeCard from "./ModeCard";
import { FC } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GradeCard from "./GradeCard";
import { on } from "stream";

interface IGradeSelectionProps {
    pageName: string;
    onGradeSelection: (grade: number) => void;
}

const GradeSelection: FC<IGradeSelectionProps> = ({ onGradeSelection, pageName }) => {
    const grades = [1, 2, 3, 4, 5, 6];

    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="flex flex-col w-full h-full justify-center ">
            <div className="box-border grid grid-cols-12 grid-rows-3 px-5 h-36 justify-items-start">
                <Link href="/practice"
                    className="bg-slate-50 p-3 border rounded col-start-1 col-end-3 row-start-2 text-center">
                    Return to selection page
                </Link>
                <div className="col-start-5 col-end-10">
                    <h1 className="text-slate-50 text-7xl text-center select-none">{pageName}</h1>
                    <h3 className="text-slate-50 text-4xl text-center my-3 select-none">Select a grade level</h3>
                </div>
            </div>
            <div className="flex justify-center gap-x-11 mt-3">
                {grades.map((grade, index) => (
                   <GradeCard key={grade} grade={grade} index={index} variants={variants} onGradeSelection={onGradeSelection} />
                ))}
            </div>
        </div>
    )
}

export default GradeSelection;