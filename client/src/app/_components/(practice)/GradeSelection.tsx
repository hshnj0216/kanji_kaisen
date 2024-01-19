"use client";
import ModeCard from "./ModeCard";
import {FC} from "react";
import Link from "next/link";

interface IGradeSelectionProps{
    pageName: string;
    onGradeSelection: (grade: number) => void;
}

const GradeSelection: FC<IGradeSelectionProps> = ({onGradeSelection, pageName}) => {
    const grades = [1, 2, 3, 4, 5, 6];
    return (
        <div className="flex flex-col w-full h-full justify-center ">
            <div className="box-border grid grid-cols-12 grid-rows-3 px-5 h-36 justify-items-start">
                <Link href="/practice" 
                      className="bg-slate-50 p-3 border rounded col-start-1 col-end-3 row-start-2 text-center">
                    Return to selection page
                </Link>
                <div className="col-start-5 col-end-10">
                    <h1 className="text-slate-50 text-7xl text-center">{pageName}</h1>
                    <h3 className="text-slate-50 text-4xl text-center my-3">Select a grade level</h3>
                </div>
            </div>
            <div className="flex">
                {grades.map(grade => <ModeCard key={grade} title={`Grade ${grade}`} description="" 
                    onClick={() => onGradeSelection(grade)} isDisabled={false}/>)}
            </div>
        </div>
    )

}

export default GradeSelection;