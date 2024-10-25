import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Link, Box } from '@mui/material';
import { ErrorPopupProps } from './types';


const ErrorPopup: React.FC<ErrorPopupProps> = ({ open, handleClose, errorMessage }) => {
    return (
        <Dialog
            open={open} onClose={handleClose}
            aria-labelledby="error-dialog-title"
            PaperProps={{
                style: {
                    width: '300px',
                },
            }}
        >
            <Box sx={{ backgroundColor: '#262626' }}>
                <DialogTitle id="error-dialog-title" style={{ textAlign: 'center', color: "white" }}>Error</DialogTitle>
            </Box>
            <DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                >
                    <Typography color="error">{errorMessage}</Typography>
                    <Link
                        href="https://docs.picsart.io/docs/creative-apis-get-api-key"
                        target="_blank"
                        rel="noopener"
                        sx={{ marginTop: 2 }}
                    >
                        Get your API key
                    </Link>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box display="flex" justifyContent="center" width="100%">
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Ok
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorPopup;
