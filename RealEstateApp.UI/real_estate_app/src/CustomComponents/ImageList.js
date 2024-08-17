import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteImage } from '../API/ImageService'; // Import your delete image function

const CustomImageList = ({ images, setImages }) => {

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await DeleteImage(id);

                const filteredImages = images.filter((image) => image.id !== id);
                setImages(filteredImages);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    };

    return (
        <List>
            {images.length > 0 ? (
                images.map((image) => (
                    <ListItem key={image.id} sx={{ bgcolor: "secondary.light", mb: 0.5, borderRadius: 4 }}>
                        <img src={image.base64} alt={image.alt || 'Estate Image'} width="100" style={{ marginRight: '16px' }} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(image.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            ) : (
                <ListItem>
                    <ListItemText primary="No images available." />
                </ListItem>
            )}
        </List>
    );
};

export default CustomImageList;
