"use client";

import { useRef } from "react";
import axios from "axios";
import Canvas from "./Canvas";

const DrawBoard = () => {

    const canvasRef = useRef(null);

    const handleProcessClick = () => {

        const dataURL = canvasRef.current.toDataUrl;

        const options = {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dataURL })
        }

        axios.request(options)
            .then(response => response.json())
            .then(data => {
                // handle the response data
                console.log(data);
            });;

    }
    return (
        <div>
            <Canvas />
            <button type="button" title="process">Process</button>
        </div>
    )
}

export default DrawBoard;