import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { GetAllEstateTypes } from '../API/ParameterService'; // Adjust this import based on your actual API function

export default function EstateTypeSelect({ onChange }) {
    const [types, setTypes] = React.useState([]);
    const [selectedType, setSelectedType] = React.useState("All");

    React.useEffect(() => {
        const fetchEstateTypes = async () => {
            try {
                const typesData = await GetAllEstateTypes();
                setTypes(typesData);
            } catch (error) {
                console.error("Error fetching estate types:", error);
            }
        };

        fetchEstateTypes();
    }, []);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedType(selectedValue);
        onChange(selectedValue === "All" ? null : selectedValue); // Notify parent of the change
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
                    Estate Type
                </InputLabel>
                <Select
                    value={selectedType}
                    label="Estate Type"
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
                    {types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
