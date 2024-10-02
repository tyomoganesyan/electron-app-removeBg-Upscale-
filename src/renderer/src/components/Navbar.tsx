import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import settings from '../assets/settings.png';
import { Settings } from './Settings';
import { NavbarProps } from './types';

const Navbar: React.FC<NavbarProps> = ({ apiKey, setApiKey }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                apiKey={apiKey}
                setApiKey={setApiKey}
            />
        </>
    );
};

export default Navbar;
