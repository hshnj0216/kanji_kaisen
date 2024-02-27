import {FC} from "react";
import { IMistake } from "@/app/_custom_hooks/useKanjiQuizGame";

interface IMistakePopUpProps{
    mistake: IMistake;
}

const MistakePopUp: FC<IMistakePopUpProps> = ({mistake}) => {
    return (
        <div className="absolute top-full -ml-3 mt-3 bg-slate-50 p-3 z-30 border rounded border-slate-800 w-96">
            <div className="flex">
                <p className="text-9xl text-slate-800 mr-3">
                    {mistake.character}
                </p>
                <div>
                    <div className="mb-2">
                        <p className="font-bold">Your answer: </p>
                        <p className="whitespace-nowrap">{mistake.answer}</p>
                    </div>
                    <div className="mb-2">
                        <p className="font-bold">Correct answer: </p>
                        <p className="whitespace-nowrap">{mistake.correctAnswer}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MistakePopUp;