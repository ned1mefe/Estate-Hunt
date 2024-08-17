import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';

export default function OrderBySelect() {
    const [order, setOrder] = React.useState("Alphabetical");

    const orderList = ["Alphabetical", "Price Asc.", "Price Desc."];

    const handleChange = (event) => {
        setOrder(event.target.value);
    };

    //should use api to fetch Orders

    return (
        <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: 'primary.dark', // Set the label color
                        '&.Mui-focused': {
                            color: 'primary.dark', // Label color when focused
                        },
                    }}
                >
                    Order by
                </InputLabel>
                <Select
                    value={order}
                    label="Order by"
                    onChange={handleChange}
                    defaultValue="Alphabetical"
                    sx={{
                        bgcolor: "primary.main",
                        color: 'primary.dark',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.dark',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.dark',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.dark',
                        },
                        '& .MuiSelect-icon': {
                            color: 'primary.dark', // Icon color
                        },
                    }}
                >
                    {orderList.map((item) => {
                        return <MenuItem key={item} value={item}>{item}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}