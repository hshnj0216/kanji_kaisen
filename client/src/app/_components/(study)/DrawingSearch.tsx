import { useEffect, useState } from "react";
import Canvas from "../Canvas";
import axios from "axios";

const DrawingSearch = ({onKanjiSelection}) => {
    const [inferredKanjis, setInferredKanjis] = useState([]);

    const onMouseUp = async (dataURL: string) => {
        const base64Image = dataURL.replace(/^data:image\/png;base64,/, "");
        const endpointURL = "http://127.0.0.1:5000/studyData/kanjis/search/infer";
        const response = await axios.post(endpointURL, {image: base64Image});
        setInferredKanjis(response.data);
    }

    const clearInferredKanjis = () => {
        setInferredKanjis([]);
    }
     
    return (
        <div className="bg-slate-300 p-2 border-b rounded-b absolute top-full z-10 w-full 
            grid grid-cols-12 grid-rows-6 max-h-80 overflow-scroll overflow-x-hidden">
                <div className="col-start-1 col-span-8 row-span-6 bg-green-200 flex items-center">
                    <Canvas onMouseUp={onMouseUp} clearInferredKanjis={clearInferredKanjis}/>
                </div>
                <div className="bg-purple-200 col-span-4 row-span-6 grid grid-cols-4 gap-2 cursor-pointer p-2">
                    {inferredKanjis.map(kanji => 
                        <div key={kanji?.character} 
                            className="border border-slate-50 rounded col-span-2 flex items-center justify-center"
                            onClick={() => onKanjiSelection(kanji?.id)}
                        >
                            <p className="">{kanji?.character}</p>
                        </div>)}
                </div>
        </div>
    )
}

export default DrawingSearch;