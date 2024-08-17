import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CustomCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: '800px', height: '450px', overflow: 'hidden', borderRadius: 5 }}>
            <Box
                component="img"
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', }}
            />
            <IconButton
                onClick={goToPrevious}
                sx={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(0, -50%)', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton
                onClick={goToNext}
                sx={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(0, -50%)', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
};

export default CustomCarousel;
