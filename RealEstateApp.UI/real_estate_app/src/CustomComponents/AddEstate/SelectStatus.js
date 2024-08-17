import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectStatus = ({ statuses, selectedStatus, setSelectedStatus, customsx }) => {
    return (
        <FormControl required sx={{ ...customsx, mt: 3 }}>
            <InputLabel sx={{
                color: 'gray',
                '&.Mui-focused': {
                    color: 'secondary.main',
                },
            }}>Status</InputLabel>
            <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                label="Status"
            >
                {statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                        {status.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectStatus;
