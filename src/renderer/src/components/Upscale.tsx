
import { useState } from 'react';
import { DragAndDrop } from './DragAndDrop';
import styles from '../assets/index.module.css';
import { IResponse } from '../utils/types';
import axios, { AxiosRequestConfig } from 'axios';
import ErrorPopup from '../utils/Error';
import { Box, FormControl, MenuItem, Select, StepLabel } from '@mui/material';


export const Upscale = () => {

    const [files, setFiles] = useState<File[]>([]);
    const [handledFiles, setHandledFiles] = useState<IResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [upscaleFactor, setUpscaleFactor] = useState<(number | string)[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isApiError, setIsApiError] = useState<boolean>(false);
    const [format, setFormat] = useState('JPG');
    const [errorMessage, setErrorMessage] = useState('');
    const apiKey = window.api.readApiKey();

    async function processFiles(): Promise<IResponse[]> {

        if (!navigator.onLine) {
            setIsError(true);
            setLoading(false);
            setErrorMessage("No internet connection. Please check your network and try again.");
            return handledFiles;
        };

        setLoading(true)
        const handledImages: IResponse[] = [];
        for (const file of files) {
            let index = 0;
            console.log(file)
            const formData = new FormData();
            formData.append('image', file);
            formData.append('format', format);
            formData.append('upscale_factor', String(upscaleFactor[index]) === 'undefined' ? '2' : String(upscaleFactor[index]));
            index++;
            const options: AxiosRequestConfig = {
                method: 'POST',
                url: 'https://api.picsart.io/tools/1.0/upscale',
                headers: {
                    accept: 'application/json',
                    'X-Picsart-API-Key': apiKey,
                },
                data: formData,
            };

            try {
                const response = await axios(options);
                handledImages.push({ ...response.data, fileName: file.name });

            } catch (err: any) {
                console.error(err);
                if (err.status == 401) {
                    setIsError(true);
                    setLoading(false);
                    setIsApiError(true);
                    setErrorMessage('Authorization failed');
                    return handledFiles;
                }
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
        <DragAndDrop
            files={files}
            setFiles={setFiles}
            isUpscale={true}
            upscaleFactor={upscaleFactor}
            setUpscaleFactor={setUpscaleFactor}
            loading={loading}
            handledFiles={handledFiles}
            handleSave={handleSave}
            setHandledFiles={setHandledFiles}
        />
        <div className={styles.cont}>
            <ErrorPopup
                open={isError}
                handleClose={() => setIsError(false)}
                errorMessage={errorMessage}
                isApiError={isApiError}
            />
        </div >
        <Box sx={{ display: "flex", gap: 2, marginLeft: 5, width: 'auto', height: 45, marginBottom: 2 }}>
            <Box sx={{ display: "flex", alignItems: 'center' }}>
                <StepLabel sx={{ marginRight: 1 }}>Format</StepLabel>
                <FormControl>
                    <Select
                        value={format}
                        sx={{ width: 100, height: 30 }}
                        onChange={(e) => setFormat(e.target.value)}
                    >
                        <MenuItem value='JPG'>JPG</MenuItem>
                        <MenuItem value='PNG'>PNG</MenuItem>
                        <MenuItem value='WEBP'>WEBP</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box >
        <div className={styles.end}>
            <button className={styles.start} onClick={processFiles}>Process</button>
        </div>
    </>

};

