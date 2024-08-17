import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectCurrency = ({ currencies, selectedCurrency, setSelectedCurrency, customsx }) => {
    return (
        <FormControl required sx={{ ...customsx, mt: 3 }}>
            <InputLabel sx={{
                color: 'gray', // Set the label color
                '&.Mui-focused': {
                    color: 'secondary.main', // Label color when focused
                },
            }}>Currency</InputLabel>
            <Select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                label="Currency"
            >
                {currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency.id}>
                        {currency.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectCurrency;
