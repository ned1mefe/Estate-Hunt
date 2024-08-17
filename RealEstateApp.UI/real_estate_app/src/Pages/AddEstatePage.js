import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomToolBar from '../CustomComponents/CustomToolBar';
import { GetAllCurrencies, GetAllEstateTypes, GetAllStatuses } from '../API/ParameterService';
import SelectStatus from '../CustomComponents/AddEstate/SelectStatus';
import SelectEstateType from '../CustomComponents/AddEstate/SelectEstateType';
import SelectCurrency from '../CustomComponents/AddEstate/SelectCurrency';
import { AddEstate } from '../API/EstateService';
import ImageUploader from './ImageUploader';
import { AddImages } from '../API/ImageService';

const customsx = {
    borderRadius: 4, // More rounded corners
    width: '70%',
    bgcolor: '#FFF',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'primary.dark', // Set border color when not focused
        },
        '&:hover fieldset': {
            borderColor: 'primary.dark', // Set border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'primary.dark', // Ensure border color stays dark when focused
        },
        borderRadius: 4, // Ensure the input itself is rounded
    },
};

const AddEstatePage = () => {
    const [errorMessage, SetError] = useState("");
    const [title, SetTitle] = useState("");
    const [description, SetDescription] = useState("");
    const [startDate, SetStartDate] = useState(null);
    const [endDate, SetEndDate] = useState(null);
    const [price, SetPrice] = useState(null);

    const [statuses, setStatuses] = useState([]);
    const [estateTypes, setEstateTypes] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedEstateType, setSelectedEstateType] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");

    const [imagesBase64, setImagesBase64] = useState([]);

    const handleUploadImages = (estateId) => {
        const imageDtos = imagesBase64.map(image => ({
            base64: image.base64,
            estateId: estateId
        }));

        AddImages(imageDtos);
    };

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const statusesData = await GetAllStatuses();
                const estateTypesData = await GetAllEstateTypes();
                const currenciesData = await GetAllCurrencies();

                setStatuses(statusesData);
                setEstateTypes(estateTypesData);
                setCurrencies(currenciesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);


    const checkFields = () => {
        let error = "";

        if (!title || !selectedStatus || !selectedEstateType || !price || !selectedCurrency) {
            error = "Please fill all required fields.";
        } else if (selectedStatus === 1 && (!endDate || !startDate)) {
            error = "Please fill dates.";
        }

        SetError(error);

        return !error;
    };


    const handleListClick = async () => {
        const isValid = checkFields(); // Check fields and get validation result

        if (!isValid) {
            return;
        }

        try {
            const response = await AddEstate({
                title,
                description,
                ownerId: "",
                statusId: selectedStatus,
                estateTypeId: selectedEstateType,
                price,
                currencyId: selectedCurrency,
                startDate: startDate ? startDate : "0001-01-01",
                endDate: endDate ? endDate : "0001-01-01"
            });

            if (response.status === 200) {
                handleUploadImages(response.data);
                navigate(`/details/${response.data}`); // Redirect on success
            }
        } catch (error) {
            SetError("Failed to list the estate.");
        }
    };


    return (
        <Box>
            <CustomToolBar />
            <Container component='form' sx={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
                <Paper
                    elevation={5}
                    sx={{
                        minHeight: 800,
                        width: '100%',
                        mx: 50,
                        maxWidth: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: "primary.main",
                        borderRadius: 6,
                        mt: 2
                    }}
                >
                    <ImageUploader imagesBase64={imagesBase64} setImagesBase64={setImagesBase64} customsx={{ ...customsx, mt: 3 }} />
                    <TextField
                        required
                        onChange={(e) => SetTitle(e.target.value)}
                        color='secondary'
                        type='text'
                        label="Title"
                        sx={{ ...customsx, mt: 3 }}
                    />
                    <TextField
                        onChange={(e) => SetDescription(e.target.value)}
                        color='secondary'
                        multiline
                        minRows={3}
                        maxRows={5}
                        type='text'
                        label="Description"
                        sx={{ ...customsx, mt: 3 }}
                    />
                    <SelectStatus
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        setSelectedStatus={setSelectedStatus}
                        customsx={customsx}
                    />

                    <SelectEstateType
                        estateTypes={estateTypes}
                        selectedEstateType={selectedEstateType}
                        setSelectedEstateType={setSelectedEstateType}
                        customsx={customsx}
                    />

                    <Box sx={{ width: "70%", display: "flex" }}>
                        <TextField
                            required
                            onChange={(e) => SetPrice(e.target.value)}
                            color='secondary'
                            type='text'
                            label="Price"
                            sx={{ ...customsx, mt: 3, mr: 1, width: "100%" }}
                        />
                        <SelectCurrency
                            currencies={currencies}
                            selectedCurrency={selectedCurrency}
                            setSelectedCurrency={setSelectedCurrency}
                            customsx={{ ...customsx, maxWidth: 115 }}
                        />
                    </Box>

                    {(selectedStatus === 1) ?
                        <>

                            <TextField
                                required
                                onChange={(e) => SetStartDate(e.target.value)}
                                color='secondary'
                                type='date'
                                focused
                                label="Start Date"
                                sx={{ ...customsx, mt: 3 }}
                            />
                            <TextField
                                required
                                onChange={(e) => SetEndDate(e.target.value)}
                                color='secondary'
                                type='date'
                                focused
                                label="End Date"
                                sx={{ ...customsx, mt: 3 }}
                            />
                        </> : <></>
                    }
                    <Button
                        onClick={handleListClick}
                        disableRipple
                        variant='contained'
                        color='secondary'
                        sx={{ width: '30%', my: 3 }}
                    >
                        List Property
                    </Button>
                    {errorMessage &&
                        <Typography color='error' sx={{ my: 2 }}>
                            {errorMessage}
                        </Typography>
                    }
                </Paper>
            </Container>
        </Box>
    );
};

export default AddEstatePage;
