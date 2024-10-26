import React, { useState } from 'react';
import { Box, Input, IconButton, Button } from '@mui/material';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@mui/icons-material/ColorLens';

export const Colored = ({color, setColor}) => {

    const [tempColor, setTempColor] = useState(color);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);


    const toggleColorPicker = () => {
        setTempColor(color);
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleColorChange = (newColor: any) => {
        setTempColor(newColor.hex);
    };

    const handleConfirm = () => {
        setColor(tempColor);
        setDisplayColorPicker(false);
    };

    const handleCancel = () => {
        setDisplayColorPicker(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={toggleColorPicker}>
                    <ColorLensIcon sx={{ color: color, fontSize: 40 }} />
                </IconButton>
            </Box>

            <Input
                value={color}
                onChange={handleInputChange}
                sx={{
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    padding: '4px',
                    width: '100px',
                }}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {['#FFFFFF', '#000000', '#FFEB3B', '#607D8B', '#8BC34A', '#03A9F4', '#673AB7', '#F44336'].map((presetColor) => (
                    <Box
                        key={presetColor}
                        onClick={() => setColor(presetColor)}
                        sx={{
                            backgroundColor: presetColor,
                            width: '30px',
                            height: '30px',
                            border: '2px solid #ddd',
                            cursor: 'pointer',
                            borderRadius: '4px',
                        }}
                    />
                ))}
            </Box>

            {displayColorPicker && (
                <Box sx={{ position: 'absolute', zIndex: 2, padding: 2, backgroundColor: 'white', boxShadow: 2 }}>
                    <SketchPicker color={tempColor} onChange={handleColorChange} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleConfirm}>
                            OK
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

