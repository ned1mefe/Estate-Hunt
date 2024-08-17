import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { GetAllStatuses } from '../API/ParameterService';

export default function StatusSelect({ onChange }) {
    const [statuses, setStatuses] = React.useState([]);
    const [status, setStatus] = React.useState("All");

    React.useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const statusData = await GetAllStatuses();
                setStatuses(statusData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchStatuses();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value === "All" ? null : event.target.value;
        setStatus(value);
        onChange(value);
    };

    return (
        <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: 'primary.dark',
                        '&.Mui-focused': {
                            color: 'primary.dark',
                        },
                    }}
                >
                    Status
                </InputLabel>
                <Select
                    value={status}
                    label="Status"
                    onChange={handleChange}
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
                            color: 'primary.dark',
                        },
                    }}
                >
                    <MenuItem value="All">All</MenuItem>
                    {statuses.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
