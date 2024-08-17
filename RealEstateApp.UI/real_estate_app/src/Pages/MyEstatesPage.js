import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomToolBar from '../CustomComponents/CustomToolBar';
import EstateBlock from '../CustomComponents/EstateBlock';
import FilterBar from '../CustomComponents/FilterBar';
import { GetUsersEstates } from '../API/EstateService';

const MyEstatesPage = () => {
    const [estates, setEstates] = useState([]);

    useEffect(() => {
        const fetchEstates = async () => {
            try {
                const response = await GetUsersEstates();
                setEstates(response);
            } catch (error) {
                console.error('Error fetching estates:', error);
            }
        };

        fetchEstates();
    }, []);

    return (
        <Box>
            <CustomToolBar />
            <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Paper
                    elevation={8}
                    sx={{
                        height: 40,
                        minWidth: 400,
                        display: 'flex',
                        pt: 2,
                        mt: 3,
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: "primary.main",
                        borderRadius: 7,
                    }}>
                    <Typography >
                        You can edit your properties in their detail page.
                    </Typography>
                </Paper>
            </Box>
            <Stack sx={{ py: 4, px: { xs: 2, sm: 2, md: 4, lg: 16, xl: 24 } }}>
                <Grid container spacing={3} justifyContent="center">
                    {estates.map((estate, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={index}>
                            <EstateBlock estate={estate} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Box>
    )
}

export default MyEstatesPage;