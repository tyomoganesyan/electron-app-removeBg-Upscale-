import { Button } from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export const Settings = ({ open, handleClose }) => {
    return <>
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
                <p>Settings content goes here.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>
};