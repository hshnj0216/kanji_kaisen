"use client";
import Image from "next/image";
interface IRadicalInfoProps {
    radical: any,
}
const RadicalInfo: FC<IRadicalInfoProps> = ({ radical }) => {
    return (
        <div className="col-span-6 bg-yellow-500">
            <p className="text-3xl text-slat-50"><strong>Radical</strong> </p>
            <div className="flex">
                <div>
                </div>
                <div>
                    <p className="text-1xl">Character: {radical?.character}</p>
                    <p className="text-1xl">Name: {radical?.name?.hiragana}</p>
                    <p className="text-1xl">Meaning: {radical?.meaning?.english}</p>
                </div>
            </div>
        </div>
    )

}

export default RadicalInfo;