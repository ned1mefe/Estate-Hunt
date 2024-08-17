import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomToolBar from '../CustomComponents/CustomToolBar';
import EstateBlock from '../CustomComponents/EstateBlock';
import FilterBar from '../CustomComponents/FilterBar';
import { useNavigate, useParams } from 'react-router-dom';
import { GetPageEstates } from '../API/EstateService';

const EstatesPage = () => {
    const { page } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(Number(page) || 1);
    const [estates, setEstates] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        estateTypeId: '',
        statusId: '',
        currencyId: '',
        orderBy: ''
    });

    useEffect(() => {
        const fetchEstates = async () => {
            try {
                const response = await GetPageEstates(currentPage, filters);
                setEstates(response["estates"]);
                setTotalPages(response["totalPages"]);
            } catch (error) {
                console.error('Error fetching estates:', error);
            }
        };

        fetchEstates();
    }, [currentPage, filters]);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
        navigate(`/estates/${newPage}`);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
        navigate(`/estates/1`);
    };

    return (
        <Box>
            <CustomToolBar />
            <FilterBar onFilterChange={handleFilterChange} />
            <Stack sx={{ py: 4, px: { xs: 2, sm: 2, md: 4, lg: 16, xl: 24 } }}>
                <Grid container spacing={3} justifyContent="center">
                    {estates.map((estate, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={index}>
                            <EstateBlock estate={estate} />
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Pagination
                    page={currentPage}
                    onChange={handleChangePage}
                    color='secondary'
                    size='large'
                    count={totalPages} />
            </Container>
        </Box>
    )
}

export default EstatesPage;
