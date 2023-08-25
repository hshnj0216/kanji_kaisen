import { useRef, useState, useEffect } from "react";
import Canvas from "./Canvas";
import * as iink from 'iink-js';

const DrawBoard = () => {
    const canvasRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        // initialize iink with your application key and HMAC key
        const editor = iink.register({
            applicationKey: 'YOUR_APPLICATION_KEY',
            hmacKey: 'YOUR_HMAC_KEY'
        });
        setEditor(editor);
    }, []);

    useEffect(() => {
        if (editor && canvasRef.current) {
            // get the canvas element and its context
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // get the image data from the canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // recognize handwritten text in the canvas image
            editor
                .addImage(imageData)
                .then(() => editor.waitForIdle())
                .then(() => editor.export_(iink.ExportFormat.TEXT))
                .then(result => {
                    setText(result);
                });
        }
    }, [editor, canvasRef]);

    const handleClearClick = () => {
        canvasRef.current.clear();
    };

    return (
        <div className="p-3 border-slate-50">
            <Canvas ref={canvasRef} />
            <div>
                <ul>
                    <li>{text}</li>
                </ul>
            </div>
            <div className="flex justify-center">
                <button type="button" title="clear" onClick={handleClearClick} className="border rounded bg-slate-300 m-3">Clear</button>
            </div>
        </div>
    );
};

export default DrawBoard;
