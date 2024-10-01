
import { useState } from 'react';
import { DragAndDrop } from './DragAndDrop';
import { IFile } from './types';



export const Removebg = () => {

    const [files, setFiles] = useState<IFile[]>([]);

    const handleStart = () => {
        console.log(files);
    }

    return (
        <div>
            <DragAndDrop files={files} setFiles={setFiles} />
            <button onClick={handleStart}>Start</button>
        </div>
    );
};

