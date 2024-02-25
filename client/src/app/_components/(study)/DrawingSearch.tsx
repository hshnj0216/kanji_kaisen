import { useEffect, useState, FC } from "react";
import Canvas from "../Canvas";
import axios from "axios";
import useLoading from "@/app/_custom_hooks/useLoading";
import SpinnerLoadingIndicator from "../SpinnerLoadingIndicator";
import useDrawing from "@/app/_custom_hooks/useDrawing";

interface IDrawingSearchProps {
    onKanjiSelection: (id: string) => void;
}

interface IInferredKanji{
    id: string;
    character: string;
}

const DrawingSearch: FC<IDrawingSearchProps> = ({onKanjiSelection}) => {
    const [inferredKanjis, setInferredKanjis] = useState<IInferredKanji[]>([]);
    const {isLoading, setIsLoading} = useLoading();

    const onDrawingSubmission = async (dataURL: string) => {
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");
        const endpointURL = process.env.INFER_CLASSES_URL;
        if (!endpointURL) {
        throw new Error('INFER_CLASSES_URL is not defined');
        }
        setIsLoading(true);
        const response = await axios.post(endpointURL, {image: base64Image});
        setInferredKanjis(response.data);
        setIsLoading(false);
    }

    const {canvasRef, clearCanvas} = useDrawing();

    const clearInferredKanjis = () => {
        setInferredKanjis([]);
    }

     
    return (
        <div className="bg-slate-300 p-2 border-b rounded-b absolute top-full z-10 w-full 
            grid grid-cols-12 grid-rows-6 max-h-80 overflow-scroll overflow-x-hidden">
                <div className="col-start-1 col-span-8 row-span-6 flex items-center">
                    <Canvas canvasRef={canvasRef} clearCanvas={clearCanvas} onDrawingSubmission={onDrawingSubmission} 
                        clearInferredKanjis={clearInferredKanjis}/>
                </div>
                <div className="col-span-4 row-span-6 grid grid-cols-4 gap-2 cursor-pointer p-2">
                    {isLoading ? (
                        <div className="col-span-4 flex items-center justify-center">
                            <SpinnerLoadingIndicator />
                        </div>
                    ) : (                  
                        inferredKanjis.map(kanji => 
                            <div key={kanji.character} 
                                className="border border-slate-50 bg-slate-400 rounded col-span-2 flex items-center justify-center"
                                onClick={() => onKanjiSelection(kanji?.id)}
                            >
                                <p className="">{kanji.character}</p>
                            </div>)  
                    )}
                 </div>
        </div>
    )
}

export default DrawingSearch;