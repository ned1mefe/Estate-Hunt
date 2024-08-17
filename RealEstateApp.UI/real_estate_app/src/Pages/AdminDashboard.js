import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, TextField } from '@mui/material';
import CustomToolBar from '../CustomComponents/CustomToolBar';
import CurrencyController from '../CustomComponents/Controllers/CurrencyController';
import StatusController from '../CustomComponents/Controllers/StatusController';
import EstateTypeController from '../CustomComponents/Controllers/EstateTypeController';
import { useAuth } from '../API/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AddCurrency, AddEstateType, AddStatus } from '../API/ParameterService';

const stylePaper = {
    minHeight: 80,
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    bgcolor: "primary.main",
    borderRadius: 7,
    mb: 2,
};

const styleInputField = {
    bgcolor: "#FFF",
    color: 'primary.dark',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'primary.dark',
        },
        '&:hover fieldset': {
            borderColor: 'primary.dark',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'primary.dark',
            borderWidth: '1px',
        },
    },
    '& .MuiSelect-icon': {
        color: 'primary.dark',
    },
};

const AdminDashboard = () => {
    const { roles } = useAuth();
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);

    const [currencyName, setCurrencyName] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [estateTypeName, setEstateTypeName] = useState("");
    const [statusName, setStatusName] = useState("");

    useEffect(() => {
        if (roles.length > 0) {
            if (!roles.some(role => role.toLowerCase() === "administrator")) {
                navigate("/forbidden");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [roles, navigate]);


    const handleAddCurrency = async () => {
        if (!currencyName || !exchangeRate) {
            alert("Please fill out both fields.");
            return;
        }
        try {
            await AddCurrency({ name: currencyName, valueAsTl: exchangeRate });
            alert("Currency added successfully!");
            setCurrencyName('');
            setExchangeRate('');
            navigate(0);

        } catch (error) {
            console.error("Error adding currency:", error);
            alert("Failed to add currency.");
        }
    };
    const handleAddEstateType = async () => {
        if (!estateTypeName) {
            alert("Please fill the field.");
            return;
        }
        try {
            await AddEstateType({ name: estateTypeName });
            alert("Estate type added successfully!");
            setEstateTypeName('');
            navigate(0);

        } catch (error) {
            console.error("Error adding estate type:", error);
            alert("Failed to add estate type.");
        }
    };

    const handleAddStatus = async () => {
        if (!statusName) {
            alert("Please fill the field.");
            return;
        }
        try {
            await AddStatus({ name: statusName });
            alert("Status added successfully!");
            setStatusName('');
            navigate(0);

        } catch (error) {
            console.error("Error adding status:", error);
            alert("Failed to add status.");
        }
    };


    if (isAuthorized === null) {
        return null;
    }

    return (
        <Box>
            <CustomToolBar />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
                <CurrencyController />
                <Paper elevation={5} sx={stylePaper}>
                    <TextField
                        label="Name"
                        value={currencyName}
                        onChange={(e) => setCurrencyName(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: 'primary.dark',
                                '&.Mui-focused': {
                                    color: 'primary.dark',
                                },
                            },
                        }}
                        sx={styleInputField}
                    />
                    <TextField
                        label="Exchange Rate"
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: 'primary.dark',
                                '&.Mui-focused': {
                                    color: 'primary.dark',
                                },
                            },
                        }}
                        sx={styleInputField}
                    />
                    <Button sx={{ mr: 1 }} onClick={handleAddCurrency} disableRipple variant="outlined" color="success">Add</Button>
                </Paper>
                <StatusController />
                <Paper elevation={5} sx={stylePaper}>
                    <TextField
                        label="Name"
                        value={statusName}
                        onChange={(e) => setStatusName(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: 'primary.dark',
                                '&.Mui-focused': {
                                    color: 'primary.dark',
                                },
                            },
                        }}
                        sx={styleInputField}
                    />
                    <Button sx={{ mr: 1 }} onClick={handleAddStatus} disableRipple variant="outlined" color="success">Add</Button>
                </Paper>
                <EstateTypeController />
                <Paper elevation={5} sx={stylePaper}>
                    <TextField
                        label="Name"
                        value={estateTypeName}
                        onChange={(e) => setEstateTypeName(e.target.value)}
                        InputLabelProps={{
                            sx: {
                                color: 'primary.dark',
                                '&.Mui-focused': {
                                    color: 'primary.dark',
                                },
                            },
                        }}
                        sx={styleInputField}
                    />
                    <Button sx={{ mr: 1 }} onClick={handleAddEstateType} disableRipple variant="outlined" color="success">Add</Button>
                </Paper>
            </Container>
        </Box>
    );
};

export default AdminDashboard;
