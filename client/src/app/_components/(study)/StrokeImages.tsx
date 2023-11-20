"use client";
import { FC } from "react";
import Image from "next/image";
interface IStrokeImages {
    images: string[],
    onStrokeImageClick: () => void,
    timingIndex: number,
}
const StrokeImages: FC<IStrokeImages> = ({ images, onStrokeImageClick, timingIndex }) => {
    return (
        <div className="grid grid-cols-12 col-span-12 bg-slate-300 h-50 gap-3 p-3">
            {images.map((image, index) =>
                <div
                    key={index}
                    className={`relative w-20 h-20 ${timingIndex === index ? 'border border-blue-500' : ''}`}
                    onClick={() => onStrokeImageClick(index)}
                >
                    <Image
                        src={image}
                        width={80}
                        height={80}
                        className="border"
                        alt={`Image ${index}`}
                    />
                    {timingIndex === index && (
                        <div className="absolute inset-0 bg-blue-200 opacity-50"></div>
                    )}
                </div>
            )}
        </div>
    )
}

export default StrokeImages;