import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, ImageList, Paper, TextField, Typography } from '@mui/material';
import CustomToolBar from '../CustomComponents/CustomToolBar';
import CustomCarousel from '../CustomComponents/CustomCarousel';
import pic1 from '../Images/EstatePicture.png';
import pic2 from '../Images/ThumbnailPlaceholder.png';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteEstate, EditEstate, GetEstateInfo } from '../API/EstateService';
import { useAuth } from '../API/AuthContext';
import { GetAllCurrencies, GetAllEstateTypes, GetAllStatuses } from '../API/ParameterService';
import SelectStatus from '../CustomComponents/AddEstate/SelectStatus';
import SelectCurrency from '../CustomComponents/AddEstate/SelectCurrency';
import SelectEstateType from '../CustomComponents/AddEstate/SelectEstateType';
import { AddImages, GetImagesOfEstate } from '../API/ImageService';
import placeholder from '../Images/ThumbnailPlaceholder.png'
import ImageUploader from './ImageUploader';
import CustomImageList from '../CustomComponents/ImageList';

const customsx = {
    borderRadius: 4,
    width: '70%',
    bgcolor: '#FFF',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'primary.dark',
        },
        '&:hover fieldset': {
            borderColor: 'primary.dark',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'primary.dark',
        },
        borderRadius: 4,
    },
};

const EstateDetails = () => {
    const { estateId } = useParams();
    const [estate, setEstate] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { userId, roles } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [startDate, SetStartDate] = useState("");
    const [endDate, SetEndDate] = useState("");

    const [statuses, setStatuses] = useState([]);
    const [estateTypes, setEstateTypes] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedEstateType, setSelectedEstateType] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");

    const [images, setImages] = useState([]);
    const [imagesBase64, setImagesBase64] = useState([]);

    const navigate = useNavigate();

    const handleUploadImages = (estateId) => {
        const imageDtos = imagesBase64.map(image => ({
            base64: image.base64,
            estateId: estateId
        }));
        if (imageDtos.length > 0)
            AddImages(imageDtos);
    };


    const fetchEstateInfo = async () => {
        try {
            const estateResponse = await GetEstateInfo(estateId);
            const imagesResponce = await GetImagesOfEstate(estateId);

            setEstate(estateResponse);
            setTitle(estateResponse.title);
            setDescription(estateResponse.description);
            setPrice(estateResponse.price);
            SetStartDate(estateResponse.startDate);
            SetEndDate(estateResponse.endDate);

            setImages(imagesResponce);

            const statusesData = await GetAllStatuses();
            const estateTypesData = await GetAllEstateTypes();
            const currenciesData = await GetAllCurrencies();

            setStatuses(statusesData);
            setEstateTypes(estateTypesData);
            setCurrencies(currenciesData);

            const matchingStatus = statusesData.find(s => s.name === estateResponse.status);
            if (matchingStatus) {
                setSelectedStatus(matchingStatus.id);
            }
            const matchingCurrency = currenciesData.find(c => c.name === estateResponse.currency);
            if (matchingCurrency) {
                setSelectedCurrency(matchingCurrency.id);
            }
            const matchingEstateType = estateTypesData.find(e => e.name === estateResponse.estateType);
            if (matchingEstateType) {
                setSelectedEstateType(matchingEstateType.id);
            }


        } catch (error) {
            console.error('Error fetching estate:', error);
        }
    };

    useEffect(() => {
        fetchEstateInfo();
    }, [estateId]);

    const handleEditClick = () => {
        setEditMode(true);
    };
    function formatMoney(amount) {

        const formattedIntegerPart = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return formattedIntegerPart;
    }

    const handleSaveClick = async () => {

        try {
            const response = await EditEstate({
                id: estate.id,
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
            handleUploadImages(estateId);


        } catch (error) {
            console.error(error);
        }

        setEditMode(false);
        fetchEstateInfo();
    };

    const handleCancelClick = () => {
        setTitle(estate.title);
        setDescription(estate.description);
        setPrice(estate.price);
        setEditMode(false);

        const matchingStatus = statuses.find(s => s.name === estate.status);
        if (matchingStatus) {
            setSelectedStatus(matchingStatus.id);
        }
        const matchingCurrency = currencies.find(c => c.name === estate.currency);
        if (matchingCurrency) {
            setSelectedCurrency(matchingCurrency.id);
        }
        const matchingEstateType = estateTypes.find(e => e.name === estate.estateType);
        if (matchingEstateType) {
            setSelectedEstateType(matchingEstateType.id);
        }

    };

    const handleDeleteClick = async () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await DeleteEstate(estateId);
                navigate("/my_estates")

            } catch (error) {
                console.error("Error deleting estate type:", error);
            }
        }
    }

    const perMonth = () => { return estate.status === "For Rent" ? "/mo" : "" };
    const isOwnerOrAdmin = () => { return (userId === estate.ownerId || roles.includes("Administrator")) };

    if (!estate) {
        return (
            <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
                <CustomToolBar />
                <Container sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexGrow: 1
                }}>
                    <CircularProgress color='secondary' />
                </Container>
            </Box>
        );
    }

    return (
        <Box>
            <CustomToolBar />
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                <Paper
                    elevation={5}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        pt: 2,
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: "primary.main",
                        borderRadius: 7,
                        mb: 2,
                        minHeight: 775
                    }}>
                    {editMode ? (
                        <TextField
                            color='secondary'
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            sx={{ ...customsx, mb: 2 }}
                        />
                    ) : (
                        <Typography variant="h2" >
                            {estate.title}
                        </Typography>
                    )}
                    {editMode ? (
                        <SelectEstateType
                            estateTypes={estateTypes}
                            selectedEstateType={selectedEstateType}
                            setSelectedEstateType={setSelectedEstateType}
                            customsx={{ ...customsx, mb: 2 }}
                        />
                    ) : (
                        <Typography color={"secondary.main"} variant="h3" gutterBottom>
                            {estate.estateType}
                        </Typography>)}
                    {editMode ? (<>
                        <CustomImageList images={images} setImages={setImages} />
                        <ImageUploader imagesBase64={imagesBase64} setImagesBase64={setImagesBase64} customsx={{ ...customsx, mt: 3 }} />
                    </>)
                        : (
                            <Box sx={{ mb: 2, mx: 5 }}>
                                <CustomCarousel images={images ? images.map(i => i.base64) : [placeholder]} />
                            </Box>

                        )}
                    {editMode ? (
                        <>
                            <SelectStatus
                                statuses={statuses}
                                selectedStatus={selectedStatus}
                                setSelectedStatus={setSelectedStatus}
                                customsx={customsx}
                            />
                            {statuses.find(s => s.name === "For Rent")?.id === selectedStatus &&
                                <>
                                    <TextField
                                        required
                                        onChange={(e) => SetStartDate(e.target.value)}
                                        color='secondary'
                                        type='date'
                                        value={startDate}
                                        focused
                                        label="Start Date"
                                        sx={{ ...customsx, mt: 3 }}
                                    />
                                    <TextField
                                        required
                                        onChange={(e) => SetEndDate(e.target.value)}
                                        color='secondary'
                                        value={endDate}
                                        type='date'
                                        focused
                                        label="End Date"
                                        sx={{ ...customsx, mt: 3 }}
                                    />
                                </>
                            }
                        </>)
                        : (<>
                            <Typography variant="h4">
                                {estate.status}
                            </Typography>
                            {estate.status === "For Rent" && (
                                <Typography variant="h6">
                                    Start Date: {estate["startDate"]} &nbsp;&nbsp;&nbsp; End Date: {estate["endDate"]}
                                </Typography>
                            )}
                        </>)}


                    {editMode ? (

                        <Box sx={{ display: 'flex', width: '100%', justifyContent: "center", alignItems: "center" }}>
                            <TextField
                                label="Price"
                                color='secondary'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                sx={{ ...customsx, mt: 3, mr: 1, mb: 2, maxWidth: 600 }}
                            />
                            <SelectCurrency
                                currencies={currencies}
                                selectedCurrency={selectedCurrency}
                                setSelectedCurrency={setSelectedCurrency}
                                customsx={{ ...customsx, mt: 1.5, mb: 2, maxWidth: 200 }} />

                        </Box>
                    ) : (
                        <Typography sx={{ mt: 1.5 }} variant="h4">
                            {formatMoney(estate.price)} {estate.currency} {perMonth()}
                        </Typography>
                    )}
                    {editMode ? (
                        <TextField
                            label="Description"
                            color='secondary'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ ...customsx, my: 2 }}
                        />
                    ) : (
                        <Typography variant="body1" sx={{ my: 3 }}>
                            {estate.description}
                        </Typography>
                    )}

                    {isOwnerOrAdmin() && !editMode && (
                        <Box>
                            <Button onClick={handleEditClick} disableTouchRipple variant='contained' color='warning' sx={{ width: 150, mb: 3, mr: 2, borderRadius: 2 }}>
                                Edit
                            </Button>
                            <Button onClick={handleDeleteClick} disableTouchRipple variant='contained' color='error' sx={{ width: 150, mb: 3, borderRadius: 2 }}>
                                Delete
                            </Button>
                        </Box>
                    )}
                    {editMode && (
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Button onClick={handleSaveClick} disableTouchRipple variant='outlined' color='success' sx={{ width: 100, borderRadius: 2 }}>
                                Save
                            </Button>
                            <Button onClick={handleCancelClick} disableTouchRipple variant='outlined' color='error' sx={{ width: 100, borderRadius: 2 }}>
                                Cancel
                            </Button>
                        </Box>
                    )}


                    <Box sx={{ flexGrow: 1 }} />
                    <Paper elevation={10} sx={{ width: 'calc(100% - 46px)', p: 3, bgcolor: "secondary.light", mb: 0, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                        <Typography variant='h3'>Contact:</Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            Owner: {estate.ownerName}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            Phone: {estate.ownerPhone ? estate.ownerPhone : "---"}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            E-Mail: {estate.ownerEmail}
                        </Typography>
                    </Paper>

                </Paper>
            </Container>
        </Box >
    );
};

export default EstateDetails;
