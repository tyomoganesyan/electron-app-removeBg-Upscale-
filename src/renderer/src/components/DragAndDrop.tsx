import React from 'react';
import styles from '../assets/index.module.css';
import { IProps } from './types';



export const DragAndDrop = ({ files, setFiles, isUpscale, upscaleFactor, setUpscaleFactor }: IProps) => {

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const dFiles = Array.from(e.target.files);
            if (dFiles.every(file =>
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/webp' ||
                file.type === 'image/bmp' ||
                file.type === 'image/tiff' ||
                file.type === 'image/svg+xml'
            )) {
                return setFiles((prevFiles) => prevFiles.concat(dFiles));
            }
        }
    }


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files.length) {
            const dFiles = Array.from(e.dataTransfer.files);
            if (dFiles.every(file =>
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/webp' ||
                file.type === 'image/bmp' ||
                file.type === 'image/tiff' ||
                file.type === 'image/svg+xml'
            )) {
                return setFiles((prevFiles) => prevFiles.concat(dFiles));
            }
        }
    }

    const handleUpscale = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = +e.target.value;
        if(setUpscaleFactor) {
            setUpscaleFactor(prevUpscaleFactor => {
                const newUpscaleFactor = [...prevUpscaleFactor];
                if (value > 0) {
                    newUpscaleFactor[index] = value;
                } else {
                    newUpscaleFactor[index] = undefined; 
                }
                return newUpscaleFactor;
            });
        }
    };


    const handleRemove = (id: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== id));
    }


    return <>
        <div className={styles.item}>
            <label className={styles.btn}>
                <strong className={styles.strong}>+</strong>
                <input
                    type='file'
                    className={styles.input}
                    style={{ display: 'none' }}
                    onChange={handleFile}
                />
            </label>
            <p className={styles.p}>drag images into the area below</p>
        </div>

        <div
            onDragEnter={preventDefaults}
            onDragOver={preventDefaults}
            onDrop={handleDrop}
            style={{
                border: '1px solid #ccc',
                textAlign: 'center',
                position: 'relative',
                height: 230
            }}>
            {
                !files.length &&
                <img src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/import-download-save-1024.png" className={styles.drop} alt="alt" />
            }

            {files.length > 0 &&
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>File</th>
                            <th>Output</th>
                            <th></th>
                            {
                                isUpscale && <th></th>
                            }
                        </tr>
                    </thead>
                    <tbody >

                        {files.map((file, index) =>
                            <tr key={index}>
                                <td>{file.name}</td>
                                <td>full path name</td>
                                <td><button className={styles.remove} onClick={() => handleRemove(index)}>X</button></td>
                                {
                                    isUpscale && <td>

                                        <input
                                            className={styles.input}
                                            placeholder="upscale factor"
                                            type='number' step={1}
                                            value={upscaleFactor[index] || ''}
                                            onChange={(e) => handleUpscale(index, e)}
                                        />
                                    </td>
                                }
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            }

        </div>
    </>
}