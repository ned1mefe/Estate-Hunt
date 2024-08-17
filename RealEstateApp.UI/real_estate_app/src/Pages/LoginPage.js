import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../API/AuthService';
import { useAuth } from '../API/AuthContext';

const customsx =
{
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

const LoginPage = () => {

    const [errorOccured, SetError] = useState(false);
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const { updateAuthState } = useAuth();

    useEffect(() => { updateAuthState() }, []
    );

    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleHomeClick = () => {
        navigate('/');
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        var hasAt = /[@]/
        if (!hasAt.test(email)) {
            SetError(true);
            return;
        }
        SetError(false);

        try {
            const response = await login({ email, password });
            // Assuming the response contains user data, you can handle redirection here
            if (response) {
                updateAuthState()
                navigate('/');
            }
        } catch (error) {
            SetError(true);
        }
    }

    return (
        <Container sx={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
            <Button disableRipple onClick={handleHomeClick} sx={{ my: 8, textTransform: 'none', color: "primary.dark" }}>
                <Typography variant="h2" component="div">
                    Estate Hunt
                </Typography>
            </Button>
            <Paper
                elevation={5}
                sx={{
                    height: 480,
                    width: '100%',
                    mx: 50,
                    maxWidth: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: "primary.main",
                    borderRadius: 6,
                }}>
                <TextField onKeyDown={handleKeyDown} onChange={(e) => SetEmail(e.target.value)} color='secondary' type='email' label="E-mail" sx={{ ...customsx, mt: 10 }} />
                <TextField onKeyDown={handleKeyDown} onChange={(e) => SetPassword(e.target.value)} color='secondary' type='password' label="Password" sx={{ ...customsx, mt: 3, mb: 5 }} />
                <Button disableRipple onClick={handleLogin} variant='contained' color='secondary' sx={{ width: '30%', mb: 1 }}>
                    Log In
                </Button>
                <Typography>
                    or
                </Typography>
                <Button disableRipple color="secondary" onClick={handleRegisterClick}>
                    Create an account
                </Button>
                {errorOccured ?
                    <Typography color='error' sx={{ mt: 4 }}>
                        Incorrect E-mail or password. Please, try again.
                    </Typography> :
                    null}
            </Paper>
        </Container>
    )
};

export default LoginPage;