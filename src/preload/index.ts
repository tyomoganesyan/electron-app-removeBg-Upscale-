import { BrowserWindow, contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import fs from 'fs';
import path from 'path'
import os from 'os'




const api = {
  saveApiKey: (apiKey: string) => {
    const hiddenFilePath = path.join(os.homedir(), '.picsartAppConfig.txt');
    console.log(hiddenFilePath);
    fs.writeFileSync(hiddenFilePath, apiKey, { flag: 'w' });
    console.log('API key saved to', hiddenFilePath);
  },

  readApiKey: (): string | null => {
    const hiddenFilePath = path.join(os.homedir(), '.picsartAppConfig.txt');
    try {
      const apiKey = fs.readFileSync(hiddenFilePath, 'utf8');
      return apiKey;
    }
    catch (error) {
      console.error('Error reading API key:', error);
      return null;
    }
  },

  handlePreviewApi: (fileData) => {
    const previewWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
      },
    });
    previewWindow.loadURL(fileData.url);
  },

  saveState: (state, upscale) => {
    const filePath = upscale ? path.join(os.homedir(), 'removebg_state.json') : path.join(os.homedir(), 'upscale_state.json');
    try {
      fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf-8');
      console.log('App state saved to', filePath);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  },

  loadState: (upscale) => {
    const filePath = upscale ? path.join(os.homedir(), 'removebg_state.json') : path.join(os.homedir(), 'upscale_state.json');
    try {
      if (fs.existsSync(filePath)) {
        const state = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(state);
      } else {
        console.log('No saved state found');
        return null;
      }
    } catch (error) {
      console.error('Error loading state:', error);
      return null;
    }
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}


