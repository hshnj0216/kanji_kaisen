"use client";
import {FC} from "react";
import Image from "next/image";
interface IStrokeImages{
    images: string[],
}
const StrokeImages: FC<IStrokeImages> = ({images}) => {
    return (
        <div className="grid grid-cols-12 col-span-12 bg-slate-300 h-44 gap-3 p-3">
            {images.map(image => 
                <Image src={image} width={70} height={70} className="border" alt="stroke_img"></Image>
            )}
		</div>
    )
}

export default StrokeImages;