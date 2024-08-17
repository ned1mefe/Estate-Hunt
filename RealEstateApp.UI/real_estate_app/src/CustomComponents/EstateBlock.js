import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import Thumbnail from './Thumbnail';
import { useNavigate } from 'react-router-dom';
import { GetImagesOfEstate } from '../API/ImageService';

const EstateBlock = ({ estate }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [thumbNail, setThumbNail] = useState("");

    const perMonth = estate.status === "For Rent" ? "/mo" : "";
    const navigate = useNavigate()

    useEffect(() => {
        const fetchThumbnail = async () => {
            try {
                const imageResponse = await GetImagesOfEstate(estate.id);
                if (imageResponse && imageResponse.length > 0) {
                    setThumbNail(imageResponse[0].base64);
                } else {
                    setThumbNail("");
                }
            } catch (error) {
                console.error("Error fetching estate images:", error);
                setThumbNail("");
            }
        };

        fetchThumbnail();
    }, [estate.id]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleButtonClick = () => {
        navigate(`/details/${estate["id"]}`)
    }
    function formatMoney(amount) {

        const formattedIntegerPart = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return formattedIntegerPart;
    }

    return (
        <Paper
            elevation={5}
            sx={{
                height: 400,
                width: '100%',
                display: 'flex',
                pt: 2,
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: "primary.main",
                borderRadius: 7,
            }}>
            <Thumbnail picture={thumbNail} />
            <Typography variant="h5">{estate.title}</Typography>
            <Typography variant="h6">{estate.estateType} / {estate.status}</Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ width: 'calc(100% - 16px)', mb: 1 }}>
                <Button
                    onClick={handleButtonClick}
                    fullWidth
                    disableRipple
                    color='secondary'
                    variant='contained'
                    sx={{ borderRadius: 6, textTransform: "none" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {isHovered ? "More details..." : `${formatMoney(estate.price)} ${estate.currency} ${perMonth}`}
                </Button>
            </Box>
        </Paper>
    );
};

export default EstateBlock;
