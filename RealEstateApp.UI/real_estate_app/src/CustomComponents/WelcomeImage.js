import { Box } from '@mui/material';
import React from 'react';
import picture from '../Images/EstatePicture.png'

const WelcomeImage = () => (<Box
    component="img"
    src={picture}
    sx={{
        maxWidth: '38%',
        height: 'auto',
        maxHeight: '38%',
        borderRadius: 12
    }}
    alt="Estate"
/>)

export default WelcomeImage