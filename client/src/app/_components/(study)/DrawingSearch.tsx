import { useEffect, useState, FC } from "react";
import Canvas from "../Canvas";
import axios from "axios";
import useLoading from "@/app/_custom_hooks/useLoading";
import SpinnerLoadingIndicator from "../SpinnerLoadingIndicator";

interface IDrawingSearchProps {
    onKanjiSelection: (id: string) => void;
}

const DrawingSearch: FC<IDrawingSearchProps> = ({onKanjiSelection}) => {
    const [inferredKanjis, setInferredKanjis] = useState([]);
    const {isLoading, setIsLoading} = useLoading();

    const onMouseUp = async (dataURL: string) => {
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");
        const endpointURL = "http://127.0.0.1:5000/studyData/kanjis/search/infer";
        setIsLoading(true);
        const response = await axios.post(endpointURL, {image: base64Image});
        setInferredKanjis(response.data);
        setIsLoading(false);
    }

    const clearInferredKanjis = () => {
        setInferredKanjis([]);
    }

     
    return (
        <div className="bg-slate-300 p-2 border-b rounded-b absolute top-full z-10 w-full 
            grid grid-cols-12 grid-rows-6 max-h-80 overflow-scroll overflow-x-hidden">
                <div className="col-start-1 col-span-8 row-span-6 flex items-center">
                    <Canvas onMouseUp={onMouseUp} clearInferredKanjis={clearInferredKanjis}/>
                </div>
                <div className="col-span-4 row-span-6 grid grid-cols-4 gap-2 cursor-pointer p-2">
                    {isLoading ? (
                        <div className="col-span-4 flex items-center justify-center">
                            <SpinnerLoadingIndicator />
                        </div>
                    ) : (
                    
                        
                        inferredKanjis.map(kanji => 
                            <div key={kanji?.character} 
                                className="border border-slate-50 bg-slate-400 rounded col-span-2 flex items-center justify-center"
                                onClick={() => onKanjiSelection(kanji?.id)}
                            >
                                <p className="">{kanji?.character}</p>
                            </div>)  
                    )}
                 </div>
        </div>
    )
}

export default DrawingSearch;