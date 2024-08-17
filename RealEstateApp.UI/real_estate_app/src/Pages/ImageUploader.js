import React from 'react';
import { Button, Input, FormControl, Box, Typography } from '@mui/material';

const ImageUploader = ({ imagesBase64, setImagesBase64, customsx }) => {
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImages.push({
                    name: file.name,
                    base64: reader.result // Base64 encoded string
                });
                if (newImages.length === files.length) {
                    setImagesBase64((prev) => [...prev, ...newImages]);
                }
            };
            reader.readAsDataURL(file); // Convert file to base64
        });
    };

    const handleDelete = (name) => {
        setImagesBase64((prev) => prev.filter((image) => image.name !== name));
    };

    return (
        <Box sx={{ width: '100%', ...customsx }}>
            <Box
                sx={{
                    mt: 2,
                    border: '1px solid #1D1A39', // Black outline
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 5,
                    gap: '10px'
                }}
            >
                <FormControl fullWidth>
                    <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        sx={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color='secondary' component="span" sx={{ width: '100%' }}>
                            Select Images
                        </Button>
                    </label>
                </FormControl>
                {imagesBase64.map((image) => (
                    <Box
                        key={image.name}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid gray',
                            paddingBottom: '5px',
                            marginBottom: '5px'
                        }}
                    >
                        <Typography>{image.name}</Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(image.name)}
                        >
                            Delete
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ImageUploader;
