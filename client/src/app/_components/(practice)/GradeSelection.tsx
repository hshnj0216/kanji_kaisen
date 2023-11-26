"use client";
import ModeCard from "./ModeCard";
import {FC} from "react";
import Link from "next/link";

interface IGradeSelectionProps{
    pageName: string;
    onGradeSelection: (grade: number) => void;
}

const GradeSelection: FC<IGradeSelectionProps> = ({onGradeSelection, pageName}) => {
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
                <ModeCard title="Grade 1" description="" onClick={() => onGradeSelection(1)}></ModeCard>
                <ModeCard title="Grade 2" description="" onClick={() => onGradeSelection(2)}></ModeCard>
                <ModeCard title="Grade 3" description="" onClick={() => onGradeSelection(3)}></ModeCard>
                <ModeCard title="Grade 4" description="" onClick={() => onGradeSelection(4)}></ModeCard>
                <ModeCard title="Grade 5" description="" onClick={() => onGradeSelection(5)}></ModeCard>
                <ModeCard title="Grade 6" description="" onClick={() => onGradeSelection(6)}></ModeCard>
            </div>
        </div>
    )

}

export default GradeSelection;