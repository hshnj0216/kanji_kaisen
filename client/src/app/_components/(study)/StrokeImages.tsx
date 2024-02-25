"use client";
import { FC } from "react";
import Image from "next/image";
interface IStrokeImagesProps {
    images: string[] | undefined,
    onStrokeImageClick: (index: number) => void,
    currentIndex: number,
}
const StrokeImages: FC<IStrokeImagesProps> = ({ images, onStrokeImageClick, currentIndex }) => {
    return (
        <div className="grid grid-cols-12 grid-rows-2 col-span-12 bg-slate-300 h-48 gap-2 p-3 rounded">
            {images && images.map((image, index) =>
                <div
                    key={index}
                    className="relative cursor-pointer col-span-1 row-span-1 grid grid-cols-1 "
                    onClick={() => onStrokeImageClick(index)}
                >
                    <Image
                        src={image}
                        className="border col-span-1"
                        alt={`stroke ${index} image`}
                        layout="fill"
                        objectFit="content"
                    />
                </div>
            )}

        </div>
    )
}

export default StrokeImages;