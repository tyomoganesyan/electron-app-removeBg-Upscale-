
export interface IProps {
    files:File[]
    setFiles:React.Dispatch<React.SetStateAction<File[]>>
    isUpscale:boolean
    upscaleFactor?:(number | string)[]
    setUpscaleFactor?:React.Dispatch<React.SetStateAction<(number | string)[]>>

}

export interface IResponse  {
    status:string
    fileName:string
    data:{
        id:string
        url:string
    }
}

export interface CProps {
    apiKey:string
}


export interface SettingsProps {
    open: boolean;
    handleClose: () => void;
    apiKey: string;
    setApiKey: (key: string) => void;
}
export interface NavbarProps {
    apiKey: string;
    setApiKey: (key: string) => void;
}

export interface IError {
    
}
