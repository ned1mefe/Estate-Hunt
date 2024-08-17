import React, { useState } from 'react';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import EstateTypeSelect from './EstateTypeSelect';
import StatusSelect from './StatusSelect';
import OrderBySelect from './OrderBySelect';

const FilterBar = ({ onFilterChange }) => {

    const [statusId, setStatusId] = useState(null);
    const [typeId, setTypeId] = useState(null);


    const handleStatusChange = (newStatusId) => {
        setStatusId(newStatusId);
        onFilterChange({ statusId: newStatusId, typeId });
    };

    const handleTypeChange = (newTypeId) => {
        setTypeId(newTypeId);
        onFilterChange({ statusId, typeId: newTypeId });
    };

    return (<Paper
        elevation={2}
        sx={{
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: "#DECEAC",
            borderRadius: 12,
            mt: 3,
            mx: 2
        }}>
        <Stack flexGrow={1}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-evenly">
            <Stack direction="row" spacing={3}
            >
                <EstateTypeSelect onChange={handleTypeChange} />
                <StatusSelect onChange={handleStatusChange} />
            </Stack>
        </Stack>
    </Paper>);
}

export default FilterBar;
