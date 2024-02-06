"use client";
import { FC } from "react";
import Image from "next/image";
interface IStrokeImages {
    images: string[],
    onStrokeImageClick: (index: number) => void,
    currentIndex: number,
}
const StrokeImages: FC<IStrokeImages> = ({ images, onStrokeImageClick, currentIndex }) => {
    return (
        <div className="grid grid-cols-12 grid-rows-2 col-span-12 bg-slate-300 h-48 gap-2 p-3">
            {images.map((image, index) =>
                <div
                    key={index}
                    className={`relative cursor-pointer col-span-1 row-span-1 grid grid-cols-1 
                        ${currentIndex == index ? 'border border-blue-500' : ''}`}
                    onClick={() => onStrokeImageClick(index)}
                >
                    <Image
                        src={image}
                        className="border col-span-1"
                        alt={`Image ${index}`}
                        layout="fill"
                        objectFit="content"
                    />
                    {currentIndex == index && (
                        <div className="absolute z-10 inset-0 bg-blue-200 opacity-50 col-span-1"></div>
                    )}
                </div>
            )}
        </div>
    )
}

export default StrokeImages;