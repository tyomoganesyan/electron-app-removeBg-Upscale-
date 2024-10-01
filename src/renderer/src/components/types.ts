export interface IFile {
    name: string
    type: string
    size: number
    id: number
}

export interface IProps {
    files:IFile[]
    setFiles:React.Dispatch<React.SetStateAction<IFile[]>>;
}