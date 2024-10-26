import { Button, Menu, MenuItem, TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { SettingsProps } from "../utils/types";
import { useEffect, useState } from "react";


export const Settings: React.FC<SettingsProps> = ({ open, handleClose }) => {

    const [apiKey, setApiKey] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiKey(event.target.value);
    };

    useEffect(() => {
        let key = window.api.readApiKey();
        if (key) {
            setApiKey(key)
        }
    }, [])

    const handleApiKeySubmit = () => {
        if (apiKey) {
            window.api.saveApiKey(apiKey);
        }
        handleClose();
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
        });
    };

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        setApiKey(text);
        setContextMenu(null);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(apiKey);
        handleCloseContextMenu();
    };

    const handleCut = async () => {
        await navigator.clipboard.writeText(apiKey);
        setApiKey('');
        handleCloseContextMenu();
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    return (
        <Dialog
            onClose={handleClose}
            open={open}
            PaperProps={{
                style: {
                    width: '500px',
                    height: '300px',
                },
            }}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <TextField
                    label="API Key"
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: 3 }}
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    onContextMenu={handleContextMenu}
                />
                <Menu
                    open={contextMenu !== null}
                    onClose={handleCloseContextMenu}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={handleCopy}>Copy</MenuItem>
                    <MenuItem onClick={handlePaste}>Paste</MenuItem>
                    <MenuItem onClick={handleCut}>Cut</MenuItem>
                </Menu>
                <Button style={{ marginTop: 10, width: 110, height: 35, marginLeft: '76%' }} onClick={handleApiKeySubmit}>submit</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

