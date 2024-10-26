import { Box, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, StepLabel, TextField } from "@mui/material";
import { ITProps } from "@renderer/utils/types";
import React, { useState } from "react";

const options = [
    'disabled',
    'custom',
    'bottom-right',
    'bottom',
    'bottom-left',
    'left',
    'right',
    'top-left',
    'top',
    'top-right'
];

const percents = [
    '0%',
    '10%',
    '20%',
    '30%',
    '40%',
    '50%',
    '60%',
    '70%',
    '80%',
    '90%',
    '100%'
];

const validCSSColorNames = [
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'purple', 'gray', 'orange', 'pink', ''
];

const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;

export const Transparent = ({ output, selectedOptions, setSelectedOptions }: ITProps) => {

    const [colorError, setColorError] = useState<string | null>(null);

    const handleShadowChange = (event: SelectChangeEvent<string>) => {
        setSelectedOptions(prev => ({
            ...prev,
            shadow: event.target.value
        }));
    };

    const handleOpacityChange = (event: SelectChangeEvent<string>) => {
        setSelectedOptions(prev => ({
            ...prev,
            shadow_opacity: event.target.value
        }));
    };

    const handleBlurChange = (event: SelectChangeEvent<string>) => {
        setSelectedOptions(prev => ({
            ...prev,
            shadow_blur: event.target.value
        }));
    };

    const handleOffsetChange = (field: 'shadow_offset_x' | 'shadow_offset_y') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedOptions(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStrokeChange = (field: 'stroke_opacity' | 'stroke_size') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedOptions(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleStrokeBlur = (field: 'stroke_opacity' | 'stroke_size') => () => {
        setSelectedOptions(prev => ({
            ...prev,
            [field]: Math.max(0, Math.min(100, Number(prev[field])))
        }));
    };
    const handleStrokeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const colorValue = event.target.value;

        setSelectedOptions(prev => ({
            ...prev,
            stroke_color: colorValue
        }));

        if (hexColorRegex.test(colorValue) || validCSSColorNames.includes(colorValue.toLowerCase())) {
            setColorError(null);
        } else {
            setColorError('Invalid color: Please enter a valid color name or hex code');
        }
    };


    const handleOffsetBlur = (field: 'shadow_offset_x' | 'shadow_offset_y') => () => {
        setSelectedOptions(prev => ({
            ...prev,
            [field]: Math.max(-100, Math.min(100, Number(prev[field])))
        }));
    };

    return (
        <Box sx={{ display: 'flex', marginLeft: 5, gap: 5 }}>
            <Box>
                <FormControl>
                    <StepLabel sx={{ color: 'HighlightText' }}>Shadow</StepLabel>
                    <Select
                        sx={{ width: 140, height: 30 }}
                        value={selectedOptions.shadow ? selectedOptions.shadow : ''}
                        onChange={handleShadowChange}
                    >
                        {options.map(opt => (
                            <MenuItem key={opt} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>

                    <StepLabel sx={{ color: 'HighlightText' }}>Shadow opacity</StepLabel>
                    <Select
                        sx={{ width: 140, height: 30 }}
                        value={selectedOptions.shadow_opacity || '0%'}
                        onChange={handleOpacityChange}
                        disabled={selectedOptions.shadow === 'disabled'}
                    >
                        {percents.map(p => (
                            <MenuItem key={p} value={p}>
                                {p}
                            </MenuItem>
                        ))}
                    </Select>

                    <StepLabel>Shadow blur</StepLabel>
                    <Select
                        sx={{ width: 140, height: 30 }}
                        value={selectedOptions.shadow_blur || '0%'}
                        onChange={handleBlurChange}
                        disabled={selectedOptions.shadow === 'disabled'}
                    >
                        {percents.map(p => (
                            <MenuItem key={p} value={p}>
                                {p}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {selectedOptions.shadow === 'custom' && (
                <Box sx={{ gap: 5 }}>
                    <FormControl>
                        <StepLabel>Offset X</StepLabel>
                        <TextField
                            type="number"
                            sx={{ width: 140, height: 29 }}
                            value={selectedOptions.shadow_offset_x}
                            onChange={handleOffsetChange('shadow_offset_x')}
                            onBlur={handleOffsetBlur('shadow_offset_x')}
                            inputProps={{
                                min: -100,
                                max: 100,
                            }}
                            InputProps={{
                                sx: { height: 29 },
                            }}
                        />

                        <StepLabel>Offset Y</StepLabel>
                        <TextField
                            type="number"
                            sx={{ width: 140, height: 29 }}
                            value={selectedOptions.shadow_offset_y}
                            onChange={handleOffsetChange('shadow_offset_y')}
                            onBlur={handleOffsetBlur('shadow_offset_y')}
                            inputProps={{
                                min: -100,
                                max: 100,
                            }}
                            InputProps={{
                                sx: { height: 29 },
                            }}
                        />
                    </FormControl>
                </Box>
            )}
            {output === 'cutout' && (
                <Box sx={{ gap: 10 }}>
                    <FormControl>
                        <StepLabel>Stroke Size</StepLabel>
                        <TextField
                            type="number"
                            sx={{ width: 140, height: 29 }}
                            value={selectedOptions.stroke_size}
                            onChange={handleStrokeChange('stroke_size')}
                            onBlur={handleStrokeBlur('stroke_size')}
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
                            InputProps={{
                                sx: { height: 29 },
                            }}
                        />
                        <StepLabel>Stroke Color</StepLabel>
                        {colorError && (
                            <FormHelperText error>{colorError}</FormHelperText>
                        )}
                        <TextField
                            type="text"
                            sx={{ width: 140, height: 29 }}
                            value={selectedOptions.stroke_color}
                            onChange={handleStrokeColor}
                            InputProps={{
                                sx: { height: 29 },
                            }}
                        />
                        <StepLabel>Stroke Opacity</StepLabel>
                        <TextField
                            type="number"
                            sx={{ width: 140, height: 29 }}
                            value={selectedOptions.stroke_opacity}
                            onChange={handleStrokeChange('stroke_opacity')}
                            onBlur={handleStrokeBlur('stroke_opacity')}
                            inputProps={{
                                min: 0,
                                max: 100,
                            }}
                            InputProps={{
                                sx: { height: 29 },
                            }}
                        />
                    </FormControl>
                </Box>
            )}
        </Box>
    );
};
