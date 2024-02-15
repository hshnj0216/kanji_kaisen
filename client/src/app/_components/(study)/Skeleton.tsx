"use client";
import { FC } from "react";
import Image from "next/image";

const Skeleton = () => {
      
    return(
        <div className="grid lg:grid-cols-12 lg:gap-4 border-slate-50">
			<div className="col-span-3 min-h-[370px] bg-slate-300 flex flex-col items-center justify-center relative p-3">

            </div>
            <div className="col-span-5 grid grid-cols-12 grid-row-12 bg-slate-300 p-3 h-90">

            </div>
            <div className="col-span-4 bg-slate-300 p-4 h-90">

            </div>
            <div className="grid grid-cols-12 grid-rows-2 col-span-12 bg-slate-300 h-48 gap-2 p-3">

            </div>
		</div>
    )
}

export default Skeleton;
