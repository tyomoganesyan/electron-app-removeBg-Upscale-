
import { useState } from 'react';
import { DragAndDrop } from './DragAndDrop';
import styles from '../assets/index.module.css';
import { CProps, IResponse } from './types';
import axios, { AxiosRequestConfig } from 'axios';


export const Removebg = ({ apiKey }: CProps) => {

    const [files, setFiles] = useState<File[]>([]);
    const [handledFiles, setHandledFiles] = useState<IResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function processFiles(): Promise<IResponse[]> {
        setLoading(true)
        const handledImages: IResponse[] = [];
        // const apiKey = "eyJraWQiOiI5NzIxYmUzNi1iMjcwLTQ5ZDUtOTc1Ni05ZDU5N2M4NmIwNTEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhdXRoLXNlcnZpY2UtMWE2YWJjN2YtZjcyMS00NGRmLThmYWMtYjZkOGRhMDM5YTQzIiwiYXVkIjoiMjI3ODc3ODkwMDI4MTAyIiwibmJmIjoxNzI0MjMzNjY0LCJzY29wZSI6WyJiMmItYXBpLmdlbl9haSIsImIyYi1hcGkuaW1hZ2VfYXBpIl0sImlzcyI6Imh0dHBzOi8vYXBpLnBpY3NhcnQuY29tL3Rva2VuLXNlcnZpY2UiLCJvd25lcklkIjoiMjI3ODc3ODkwMDI4MTAyIiwiaWF0IjoxNzI0MjMzNjY0LCJqdGkiOiJkNzRjM2FhMS00ZTk3LTQ4MmEtYmIyOS1iMzcxY2Y1ZTFjYTUifQ.IlRiqhz6SEl2wF1pp0JDo7pkpGyht4k-9IV3GwY7B3YRjpfl-PCVwL-uHFGCtaEOJ33YEUGfsYZSIfZpPU01IrW-WQcosPtTSbnEEG_HYXOZZnk6T_o9YlUTOq-y2Y2Ca5o7w64fwMbdfPlZud0YGaxcxwrCI7G0nRlMrUhDDU56T1LA7g4yytFZNhbjT26P2Oe3gp7_ScNaMi0aegP-RUqmLZNPD6IRSmDS_6Xntw2n4riM-fDiJlT-krUdOqI8liUh-cWQvgmxeJz2ZYZfj_zEWKUdR4_yUqiOwGy3ospa27_1bh7MItBUoJ2argm0c1D0acRFbVxzRfQSzOFP6Q";
        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);

            const options: AxiosRequestConfig = {
                method: 'POST',
                url: 'https://api.picsart.io/tools/1.0/removebg',
                headers: {
                    accept: 'application/json',
                    'X-Picsart-API-Key': apiKey,
                },
                data: formData,
            };

            try {
                const response = await axios(options);
                handledImages.push({ ...response.data, fileName: file.name });

            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
        setFiles([]);
        setHandledFiles(handledImages);
        return handledImages;

    }

    const handleSave = (url: string, fileName: string) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);

            })
            .catch(err => {
                console.error('Error downloading the file:', err)
            });
    }



    return <>
        <DragAndDrop files={files} setFiles={setFiles} isUpscale={false} />
        <div className={styles.container}>
            <button className={styles.start} onClick={processFiles}>Process</button>
        </div>
        <div className={styles.cont}>
            {loading ? (
                <img className={styles.loader} src="https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdkf5jym2t51hf098ppgs.gif" alt="Loading..." />
            ) : (
                handledFiles.length ? (
                    <ul>
                        {handledFiles.map((file) => (
                            <li key={file.data.id}>
                                <p>{file.fileName}</p>
                                <div className={styles.btns}>
                                    <button onClick={() => handleSave(file.data.url, file.fileName)}>save</button>
                                    <button>share</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : null
            )}
        </div >
    </>

};

