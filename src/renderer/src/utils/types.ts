import { Dispatch, SetStateAction } from "react"

export interface IProps {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    isUpscale: boolean
    upscaleFactor?: (number | string)[]
    setUpscaleFactor?: React.Dispatch<React.SetStateAction<(number | string)[]>>
    loading: boolean,
    handledFiles: IResponse[]
    handleSave: (url: string, fileName: string) => void;
    setHandledFiles: (files: IResponse[]) => void;
}

export interface IResponse {
    status: string
    fileName: string
    data: {
        id: string
        url: string
    }

}

export interface CProps {
    apiKey: string
}


export interface SettingsProps {
    open: boolean;
    handleClose: () => void;
}

export interface BalanceProps {
    open: boolean;
    handleCloseBalance: () => void;
    result: number;
}

export interface NavbarProps {
    apiKey: string;
};

export interface SavedState {
    files: File[];
    handledFiles: IResponse[];
    outputType: string;
    format: string;
    color: string;
    selectedOption: IOptions;
}

export interface Api {
    saveApiKey: (apiKey: string) => void;
    readApiKey: () => string | undefined;
    handlePreviewApi: (file: IResponse) => void;
    loadState: (upscale: boolean) => Promise<SavedState>;
    saveState: (currentState: SavedState | { format: string }, upscale: boolean) => void;
}

export interface ErrorPopupProps {
    open: boolean;
    handleClose: () => void;
    errorMessage: string;
    isApiError: boolean
}

export interface InputValues {
    [key: string]: string;
}

export interface IOptions {
    shadow: string,
    shadow_opacity: string
    shadow_blur: string,
    shadow_offset_x?: string,
    shadow_offset_y?: string,
    stroke_size?: string,
    stroke_opacity?: string
    stroke_color?: string,
}

export interface ITProps {
    output: string,
    selectedOptions: IOptions,
    setSelectedOptions: (options: IOptions | ((prev: IOptions) => IOptions)) => void;
}

export interface SelectorProps {
    selectedOptions: IOptions,
    setSelectedOptions: (options: IOptions | ((prev: IOptions) => IOptions)) => void;
    outputType: string
    setOutputType: (initial: string) => void;
    format: string
    setFormat: (initial: string) => void;
    color: string
    setColor: Dispatch<SetStateAction<string>>
}





