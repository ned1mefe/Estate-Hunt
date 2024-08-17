import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import CustomToolBar from '../CustomComponents/CustomToolBar'
import WelcomeImage from '../CustomComponents/WelcomeImage';
import EstateBlock from '../CustomComponents/EstateBlock';
import { useNavigate } from 'react-router-dom';
import { GetPageEstates } from '../API/EstateService';
import { useAuth } from '../API/AuthContext';



const HomePage = () => {

    const [estates, setEstates] = useState([]);
    const { fullName } = useAuth();
    const navigate = useNavigate();
    //const { userId, fullName, phoneNumber, eMail, roles } = useAuth() for test purposes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetPageEstates(0);
                setEstates(data["estates"]);
            } catch (error) {
                console.error('Error fetching home estates:', error);
            }
        };

        fetchData();
    }, []);

    const handleEstateClick = () => {
        navigate('/estates');
    };

    return (
        <Box>
            <CustomToolBar />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
                <Typography variant='h1'>
                    Estate Hunt
                </Typography>
                <Typography variant='h3' my={1}>
                    List all the available estates, and hunt for your needs!
                </Typography>
                <WelcomeImage />
                <Button disableRipple onClick={handleEstateClick} variant='outlined' color='secondary' sx={{ textTransform: "none", mt: 2 }}>
                    <Typography variant='h2'>
                        Discover Estates
                    </Typography>
                </Button>
                {fullName ?
                    (
                        <Typography variant='h3' mt={1}>Welcome, {fullName}!</Typography>
                    )
                    : (<Typography variant='h3' mt={1}>
                        Sign in to advertise your estates to thousands of people online.
                    </Typography>)
                }

            </Container>
            <Box sx={{ py: 4, px: { xs: 2, sm: 2, md: 4, lg: 16, xl: 24 } }}>
                <Grid container spacing={3} justifyContent="center">
                    {estates.map((estate, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={index}>
                            <EstateBlock estate={estate} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
};

export default HomePage;