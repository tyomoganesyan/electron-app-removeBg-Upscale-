import { useState } from 'react';
import { Box, Select, StepLabel, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { Transparent } from '@renderer/components/ImageHandling/Transparent';
import { Colored } from '@renderer/components/ImageHandling/Colored';
import { SelectorProps } from './types';

export const Selector = ({ selectedOptions, setSelectedOptions, outputType, setOutputType, setFormat, format, color, setColor }: SelectorProps) => {

    const [selectedOption, setSelectedOption] = useState<'transparent' | 'colored' | null>('transparent');

    const handleClick = (option: 'transparent' | 'colored') => {
        setSelectedOption(option);
    };

    const handleOutputChange = (event: SelectChangeEvent<string>) => {
        setOutputType(event.target.value as string);
    };

    return (
        <>
            <Box sx={{ display: "flex", gap: 2, marginLeft: 5, width: 'auto', height: 45, marginBottom: 2 }}>
                <Box
                    sx={{
                        backgroundColor: selectedOption === 'transparent' ? '#858585' : '#dddada',
                        padding: 1,
                        border: '1px solid black',
                        borderRadius: 1,
                        display: "flex",
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleClick('transparent')}
                >
                    Transparent background
                </Box>
                {
                    outputType === 'cutout' &&
                    <Box
                        sx={{
                            backgroundColor: selectedOption === 'colored' ? '#858585' : '#dddada',
                            padding: 1,
                            border: '1px solid black',
                            borderRadius: 1,
                            display: "flex",
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleClick('colored')}
                    >
                        Colored background
                    </Box>
                }


                {
                    selectedOption === 'transparent' ? (
                        <Box sx={{ display: "flex", alignItems: 'center' }}>
                            <StepLabel sx={{ marginRight: 1 }}>Output type</StepLabel>
                            <FormControl>
                                <Select
                                    value={outputType}
                                    sx={{ width: 100, height: 30 }}
                                    onChange={handleOutputChange}
                                >
                                    <MenuItem value='mask'>mask</MenuItem>
                                    <MenuItem value='cutout'>cutout</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", alignItems: 'center', opacity: 0.5 }}>
                            <StepLabel sx={{ marginRight: 1 }}>Output type</StepLabel>
                            <FormControl disabled>
                                <Select
                                    value={outputType}
                                    sx={{ width: 100, height: 30 }}
                                >
                                    <MenuItem value='mask'>mask</MenuItem>
                                    <MenuItem value='cutout'>cutout</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    )
                }


                <Box sx={{ display: "flex", alignItems: 'center' }}>
                    <StepLabel sx={{ marginRight: 1 }}>Format</StepLabel>
                    <FormControl>
                        <Select
                            value={format}
                            sx={{ width: 100, height: 30 }}
                            onChange={(e) => setFormat(e.target.value)}
                        >
                            <MenuItem value='JPG'>JPG</MenuItem>
                            <MenuItem value='PNG'>PNG</MenuItem>
                            <MenuItem value='WEBP'>WEBP</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box >
            {selectedOption === 'transparent' && (
                <Transparent
                    output={outputType}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            )
            }
            {
                selectedOption === 'colored' && (
                    <Colored  
                        color={color}
                        setColor={setColor}
                    />
                )
            }
        </>
    );
};
