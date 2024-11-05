import React, { useState } from 'react'
import styles from '../assets/index.module.css'
import { IProps, IResponse } from '../utils/types'
import ErrorPopup from '@renderer/utils/Error'

export const DragAndDrop = ({
  files,
  setFiles,
  isUpscale,
  upscaleFactor,
  setUpscaleFactor,
  loading,
  handledFiles,
  handleSave,
  setHandledFiles
}: IProps) => {
  const allowedFormatsUpscale = ['image/jpeg', 'image/png', 'image/webp']
  const allowedFormatsRegular = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff']

  const [isError, setIsError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const maxFileCount = 5

  const validateFiles = (files: File[], allowedFormats: string[]): boolean => {
    return files.every((file) => allowedFormats.includes(file.type))
  }

  const handleError = (message: string) => {
    setIsError(true)
    setErrorMessage(message)
  }

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const dFiles = Array.from(e.target.files)

      if (files.length + dFiles.length > maxFileCount) {
        handleError(`You can only upload up to ${maxFileCount} files.`)
      } else {
        if (isUpscale) {
          if (validateFiles(dFiles, allowedFormatsUpscale)) {
            setFiles((prevFiles) => prevFiles.concat(dFiles))
            setIsError(false)
            setErrorMessage('')
          } else {
            handleError('Only JPEG, PNG, and WebP images are allowed for upscaling.')
          }
        } else {
          if (validateFiles(dFiles, allowedFormatsRegular)) {
            setFiles((prevFiles) => prevFiles.concat(dFiles))
            setIsError(false)
            setErrorMessage('')
          } else {
            handleError('Only JPEG, PNG, WebP, and TIFF images are allowed.')
          }
        }
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e)

    if (e.dataTransfer.files.length) {
      const dFiles = Array.from(e.dataTransfer.files)

      if (files.length + dFiles.length > maxFileCount) {
        handleError(`You can only upload up to ${maxFileCount} files.`)
      } else {
        if (isUpscale) {
          if (validateFiles(dFiles, allowedFormatsUpscale)) {
            setFiles((prevFiles) => prevFiles.concat(dFiles))
            setIsError(false)
            setErrorMessage('')
          } else {
            handleError('Only JPEG, PNG, and WebP images are allowed for upscaling.')
          }
        } else {
          if (validateFiles(dFiles, allowedFormatsRegular)) {
            setFiles((prevFiles) => prevFiles.concat(dFiles))
            setIsError(false)
            setErrorMessage('')
          } else {
            handleError('Only JPEG, PNG, WebP, and TIFF images are allowed.')
          }
        }
      }
    }
  }

  const handleUpscale = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value
    if (setUpscaleFactor) {
      setUpscaleFactor((prevUpscaleFactor) => {
        const newUpscaleFactor = [...prevUpscaleFactor]
        if (value > 0) {
          newUpscaleFactor[index] = value
        }
        return newUpscaleFactor
      })
    }
  }

  const handleRemove = (id: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== id))
  }

  const handleFilesRemove = (id: string) => {
    const updatedFiles = handledFiles.filter((file) => file.data.id !== id)
    setHandledFiles(updatedFiles)
  }

  const handlePreview = (file: IResponse) => {
    window.electron.ipcRenderer.send('preview-file', file.data)
  }

  return (
    <>
      <div className={styles.item}>
        <label className={styles.btn}>
          <strong className={styles.strong}>+</strong>
          <input
            type="file"
            className={styles.input}
            style={{ display: 'none' }}
            onChange={handleFile}
          />
        </label>
        <p className={styles.p}>Drag images into the area below</p>
      </div>

      <div
        onDragEnter={preventDefaults}
        onDragOver={preventDefaults}
        onDrop={handleDrop}
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3>Pending Files</h3>
          <div
            style={{
              border: '1px solid #ccc',
              position: 'relative',
              height: 230,
              overflowY: 'scroll'
            }}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Remove</th>
                  {isUpscale && <th>Upscale Factor</th>}
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr key={index}>
                    <td>{file.name}</td>
                    <td style={{ position: 'relative' }}>
                      <button className={styles.remove} onClick={() => handleRemove(index)}>
                        X
                      </button>
                      {loading && !isUpscale && <span className={styles.spinner}></span>}
                    </td>
                    {isUpscale && (
                      <td style={{ position: 'relative' }}>
                        <input
                          className={styles.input}
                          placeholder="upscale factor"
                          type="number"
                          step={2}
                          max={8}
                          value={
                            upscaleFactor && upscaleFactor[index] !== undefined
                              ? upscaleFactor[index]
                              : 2
                          }
                          onChange={(e) => handleUpscale(index, e)}
                          onKeyDown={(e) => e.preventDefault()}
                        />
                        {loading && <span className={styles.spinner}></span>}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3>Handled Files</h3>
          <div
            style={{
              border: '1px solid #ccc',
              position: 'relative',
              height: 230,
              overflowY: 'scroll'
            }}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>File</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {handledFiles.map((file) => (
                  <tr key={file.data.id}>
                    <td>{file.fileName}</td>
                    <td>
                      <button onClick={() => handleSave(file.data.url, file.fileName)}>Save</button>
                      <button onClick={() => handlePreview(file)}>Preview</button>
                    </td>
                    <td>
                      <button
                        className={styles.remove}
                        onClick={() => handleFilesRemove(file.data.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isError && (
        <ErrorPopup
          handleClose={() => setIsError(false)}
          open={isError}
          isApiError={false}
          errorMessage={errorMessage}
        />
      )}
    </>
  )
}
