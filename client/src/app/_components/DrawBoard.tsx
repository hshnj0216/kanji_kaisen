import { useRef } from "react";
import axios from "axios";
import Canvas from "./Canvas";

const DrawBoard = () => {
    const canvasRef = useRef(null);
    const handleClearClick = () => {
        canvasRef.current.clear();
    };

    const handleSubmitClick = () => {
        const dataURL = canvasRef.current?.toDataURL();
        console.log(dataURL);
        
        const options = {
            url: 'http://localhost:5000/recognize/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ dataURL })
        }

        axios.request(options)
            .then(response => response.json())
            .then(data => {
                // handle the response data
                console.log(data);
            });
    };

    return (
        <div className="p-3 border-slate-50">
            <Canvas ref={canvasRef} />
            <div>
                <ul>

                </ul>
            </div>
            <div className="flex justify-center">
                <button type="button" title="clear" onClick={handleClearClick} className="border rounded bg-slate-300 m-3">Clear</button>
                <button type="button" title="submit" onClick={handleSubmitClick} className="border rounded bg-slate-300 m-3">Submit</button>
            </div>
        </div>
    );
};

export default DrawBoard;
