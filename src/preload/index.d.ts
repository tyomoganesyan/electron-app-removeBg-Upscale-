import { ElectronAPI } from '@electron-toolkit/preload'
import { Api } from '@renderer/utils/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
