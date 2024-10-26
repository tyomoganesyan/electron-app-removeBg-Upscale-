
import { useState } from 'react';
import { DragAndDrop } from './DragAndDrop';
import styles from '../assets/index.module.css';
import { IOptions, IResponse } from '../utils/types';
import axios, { AxiosRequestConfig } from 'axios';
import ErrorPopup from '../utils/Error';
import { Selector } from '@renderer/utils/Selector';


export const Removebg = () => {

    const [files, setFiles] = useState<File[]>([]);
    const [handledFiles, setHandledFiles] = useState<IResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [outputType, setOutputType] = useState('cutout');
    const [isApiError, setIsApiError] = useState<boolean>(false);
    const [format, setFormat] = useState('JPG');
    const [color, setColor] = useState('#FFFFFF');
    const [selectedOption, setSelectedOption] = useState<IOptions>({
        shadow: 'disabled',
        shadow_opacity: '0%',
        shadow_blur: '0%',
        shadow_offset_x: '0',
        shadow_offset_y: '0',
        stroke_size: '0',
        stroke_color: '',
        stroke_opacity: '0',
    });

    const apiKey = window.api.readApiKey();

    async function processFiles(): Promise<IResponse[]> {

        if (!navigator.onLine) {
            setIsError(true);
            setLoading(false);
            setErrorMessage("No internet connection. Please check your network and try again.");
            return handledFiles;
        }

        setLoading(true);
        const handledImages: IResponse[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('output_type', outputType)
            formData.append('fomrat', format);
            formData.append('bg_color', color);
            for (let key in selectedOption) {
                if (selectedOption[key]) {
                    if (key === 'shadow_opacity' || key === 'shadow_blur') {
                        selectedOption[key] = selectedOption[key].split('%')[1]
                    }
                    formData.append(key, selectedOption[key]);
                }
            }
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
            }
            catch (err: any) {
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
            isUpscale={false}
            loading={loading}
            handledFiles={handledFiles}
            handleSave={handleSave}
            setHandledFiles={setHandledFiles}
        />
        <div className={styles.container}>
        </div>
        <div className={styles.selector}>
            <Selector
                selectedOptions={selectedOption}
                setSelectedOptions={setSelectedOption}
                outputType={outputType}
                setOutputType={setOutputType}
                format={format}
                setFormat={setFormat}
                color={color}
                setColor={setColor}
            />
        </div>
        <div className={styles.cont}>
            <ErrorPopup
                open={isError}
                handleClose={() => setIsError(false)}
                errorMessage={errorMessage}
                isApiError={isApiError}
            />
        </div >
        <div className={styles.end}>
            <button className={styles.start} onClick={processFiles}>Process</button>
        </div>
    </>

};

