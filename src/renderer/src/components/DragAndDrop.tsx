import styles from '../assets/index.module.css';
import { IProps } from './types';



export const DragAndDrop = ({ files, setFiles }: IProps) => {

    const preventDefaults = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const dFiles = Array.from(e.target.files);
            const arr = dFiles.map((file) => ({
                name: file.name,
                type: file.type,
                size: file.size,
                id: Date.now() + Math.random()
            }));
            setFiles((prevFiles) => prevFiles.concat(arr));
        }
    }


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files.length) {
            const dFiles = Array.from(e.dataTransfer.files);
            const arr = dFiles.map((file) => ({
                name: file.name,
                type: file.type,
                size: file.size,
                id: Date.now() + Math.random()
            }));
            setFiles((prevFiles) => prevFiles.concat(arr));
        }
    }


    const handleRemove = (id: number) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
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
                        </tr>
                    </thead>
                    <tbody >

                        {files.map(file =>
                            <tr key={file.id}>
                                <td>{file.name}</td>
                                <td>full path name</td>
                                <td><button className={styles.remove} onClick={() => handleRemove(file.id)}>X</button></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            }

        </div>
    </>


}