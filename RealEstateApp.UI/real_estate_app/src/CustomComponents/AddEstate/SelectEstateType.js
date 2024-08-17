import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectEstateType = ({ estateTypes, selectedEstateType, setSelectedEstateType, customsx }) => {
    return (
        <FormControl required sx={{ ...customsx, mt: 3 }}>
            <InputLabel sx={{
                color: 'gray', // Set the label color
                '&.Mui-focused': {
                    color: 'secondary.main', // Label color when focused
                },
            }}>Estate Type</InputLabel>
            <Select
                value={selectedEstateType}
                onChange={(e) => setSelectedEstateType(e.target.value)}
                label="Estate Type"
            >
                {estateTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                        {type.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectEstateType;
