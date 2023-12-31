import { useEffect, useState } from "react";
import SVGCanvas from "../SVGCanvas";

const DrawingSearch = () => {

    return (
        <div className="bg-slate-300 p-3 border-b rounded-b absolute top-full z-10 w-full 
            flex flex-wrap max-h-80 justify-center overflow-scroll overflow-x-hidden">
                <SVGCanvas />
        </div>
    )
}

export default DrawingSearch;