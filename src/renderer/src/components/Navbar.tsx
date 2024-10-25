import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import settings from '../assets/settings.png';
import { Settings } from './Settings';
import { Balance } from './Balance';
import ErrorPopup from '../utils/Error';

const Navbar: React.FC = () => {

    const [open, setOpen] = useState(false);
    const [openBalance, setOpenBalance] = useState(false);
    const [balance, setBalance] = useState<number | undefined>();
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState('');
    const apiKey = window.api.readApiKey();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenBalance = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-Picsart-API-Key': apiKey ?? ''
            }
        }
        try {
            let response = await fetch('https://genai-api.picsart.io/v1/balance', options);
            if (response.status == 401) {
                setIsError(true);
                setErrorMessage('Authorization failed');
            }
            const result = await response.json();
            if (result?.credits) {
                setBalance(result.credits);
                setOpenBalance(true);
            }
        }
        catch (error: unknown) {
            console.log(error, 'stexxx');
            if (error instanceof Error) {
                setIsError(true);
                setErrorMessage('Authorization failed');
                console.error(error.message);
            }
            else {
                console.error("Unknown error", error);
            }
        }
    };

    const handleCloseBalance = () => {
        setOpenBalance(false);
    }
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#262626' }}>
                <Toolbar>
                    <NavLink
                        to="/removebg"
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "#C209C1" : '',
                            textDecoration: 'none',
                            borderRadius: "4px"
                        })}
                    >
                        <Button sx={{ color: '#FFFFFF' }}>RemoveBG</Button>
                    </NavLink>
                    <NavLink
                        to="/upscale"
                        style={({ isActive }) => ({
                            backgroundColor: isActive ? "#C209C1" : '',
                            textDecoration: 'none',
                            borderRadius: "4px"
                        })}
                    >
                        <Button sx={{ color: '#FFFFFF' }}>Upscale</Button>
                    </NavLink>
                    <Button
                        sx={{ color: '#FFFFFF' }}
                        style={{ marginLeft: 500 }}
                        onClick={handleOpenBalance}
                    >
                        get balance
                    </Button>
                    <IconButton
                        onClick={handleClickOpen}
                        style={{ marginLeft: 'auto' }}
                    >
                        <img
                            src={settings}
                            alt="Settings"
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '32px',
                                width: '32px',
                                height: '32px'
                            }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Settings
                open={open}
                handleClose={handleClose}
            />
            <ErrorPopup
                open={isError}
                handleClose={() => setIsError(false)}
                errorMessage={errorMessage}
            />
            {
                balance &&
                <Balance
                    open={openBalance}
                    handleCloseBalance={handleCloseBalance}
                    result={balance}
                />
            }
        </>
    );
};

export default Navbar;
