import { Box } from '@mui/material';
import React from 'react';
import placeholder from '../Images/ThumbnailPlaceholder.png'

const Thumbnail = ({ picture }) => {

    if (!picture)
        picture = placeholder

    return (
        <Box sx={{
            mx: 2, mb: 1, borderRadius: 5,
            Height: 260,
            width: "calc(100% - 32px)"
        }}>
            <Box
                component="img"
                src={picture}
                sx={{
                    width: '100%',
                    height: 200,
                    borderRadius: 5,


                }}
                alt="Placeholder"
            />
        </Box>
    )
}


export default Thumbnail