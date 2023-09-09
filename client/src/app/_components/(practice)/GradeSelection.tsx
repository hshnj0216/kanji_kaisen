"use client";
import ModeCard from "./ModeCard";
import {FC} from "react";

interface IGradeSelectionProps{
    onGradeSelection: (grade: number) => void;
}

const GradeSelection: FC<IGradeSelectionProps> = ({onGradeSelection}) => {
    return (
        <div className="flex flex-col w-full h-full justify-center ">
            <h3 className="text-slate-50 text-4xl text-center my-3">Select a grade level</h3>
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