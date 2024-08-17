import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../API/AuthContext';
import { logout } from '../API/AuthService';

export default function CustomToolBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { userId, fullName, roles, updateAuthState } = useAuth();

    const loggedIn = () => userId !== null; // if dont work try useeffect

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }
    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        logout();
        updateAuthState();
        handleMenuClose();
        navigate('/');
    }

    const handleMyEstatesClick = () => {
        handleMenuClose();
        navigate('/my_estates');
    }

    const handleListClick = () => {
        navigate("/add_estate")
    }
    const handleAdministratorClick = () => {
        handleMenuClose();
        navigate("/admin_db")
    }

    var getInitials = function (string) {
        var names = string.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: "primary.dark" }}>
                <Toolbar>
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button disableRipple onClick={handleHomeClick} sx={{ textTransform: 'none', color: "#fff" }}>
                            <Typography variant="h2" component="div">
                                Estate Hunt
                            </Typography>
                        </Button>
                        <Box sx={{ flexGrow: 1 }}></Box>

                        {loggedIn() ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={handleListClick} disableTouchRipple variant='contained' color='secondary' sx={{ my: 0.75, mr: 3, width: 200, borderRadius: 2 }} >List&nbsp;Your&nbsp;Property</Button>
                                <IconButton onClick={handleMenuOpen} color="inherit">
                                    <Avatar>{getInitials(fullName)}</Avatar>
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMyEstatesClick}>My Properties</MenuItem>
                                    {roles.some(role => role.toLowerCase() === "administrator")
                                        ? <MenuItem onClick={handleAdministratorClick}>Admin Dashboard</MenuItem> : null}
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                <Button onClick={handleLoginClick} disableTouchRipple variant='contained' color='secondary' sx={{ my: 0.75, mr: 1.5, width: 100, borderRadius: 2 }} >Login</Button>
                                <Button onClick={handleRegisterClick} disableTouchRipple variant='contained' color='secondary' sx={{ my: 0.75, width: 100, borderRadius: 2 }}>Register</Button>
                            </>
                        )}
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
