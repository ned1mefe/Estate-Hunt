import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../API/AuthService';

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

const RegisterPage = () => {
    const [errorMessage, SetError] = useState("");
    const [fullName, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [phoneNumber, SetPhone] = useState("");
    const [password, SetPassword] = useState("");
    const [passwordAgain, SetPasswordAgain] = useState("");

    const navigate = useNavigate();

    const checkFields = () => {
        SetError("");


        if (!fullName || !email || !password || !passwordAgain) {
            SetError("Please fill all required fields.");
            return;
        }

        const passwordRequirements = {
            minLength: 6,
            hasDigit: /\d/,
            hasLowercase: /[a-z]/,
            hasUppercase: /[A-Z]/,
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
            hasAt: /[@]/
        };

        if (!passwordRequirements.hasAt.test(email)) {
            SetError("Please enter a valid E-Mail.");
            return;
        }

        if (password.length < passwordRequirements.minLength) {
            SetError("Password should be at least 6 characters long.");
            return;
        }

        if (!passwordRequirements.hasDigit.test(password)) {
            SetError("Password must contain at least one numeric character.");
            return;
        }

        if (!passwordRequirements.hasLowercase.test(password)) {
            SetError("Password must contain at least one lowercase letter.");
            return;
        }

        if (!passwordRequirements.hasUppercase.test(password)) {
            SetError("Password must contain at least one uppercase letter.");
            return;
        }

        if (!passwordRequirements.hasSpecialChar.test(password)) {
            SetError("Password must contain at least one special character.");
            return;
        }
        SetError("");

        if (password !== passwordAgain) {
            SetError("Passwords do not match.");
            return;
        }
        SetError("");
    }

    const handleRegister = async () => {

        checkFields();
        if (errorMessage)
            return;

        try {
            const response = await register({ email, password, phoneNumber, fullName });

            if (response) {
                navigate('/login');
            }
        } catch (error) {
            SetError("Something went wrong, try again later.");
        }

    };

    const handleHomeClick = () => {
        navigate('/');
    };
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <Container component='form' sx={{ display: 'flex', height: '100vh', flexDirection: 'column', alignItems: 'center' }}>
            <Button disableRipple onClick={handleHomeClick} sx={{ my: 6, textTransform: 'none', color: "primary.dark", }}>
                <Typography variant="h2" component="div">
                    Estate Hunt
                </Typography>
            </Button>
            <Paper
                elevation={5}
                sx={{
                    height: 620,
                    width: '100%',
                    mx: 50,
                    maxWidth: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: "primary.main",
                    borderRadius: 6,
                }}
            >
                <TextField
                    required
                    onChange={(e) => SetName(e.target.value)}
                    color='secondary'
                    type='text'
                    label="Full Name"
                    sx={{ ...customsx, mt: 7 }}
                />
                <TextField
                    onChange={(e) => SetPhone(e.target.value)}
                    color='secondary'
                    type='text'
                    label="Phone"
                    sx={{ ...customsx, mt: 3 }}
                />
                <TextField
                    required
                    onChange={(e) => SetEmail(e.target.value)}
                    color='secondary'
                    type='email'
                    label="E-mail"
                    sx={{ ...customsx, mt: 3 }}
                />
                <TextField
                    required
                    onChange={(e) => SetPassword(e.target.value)}
                    color='secondary'
                    type='password'
                    label="Password"
                    sx={{ ...customsx, mt: 3 }}
                />
                <TextField
                    required
                    onChange={(e) => SetPasswordAgain(e.target.value)}
                    color='secondary'
                    type='password'
                    label="Password Again"
                    sx={{ ...customsx, mt: 3, mb: 5 }}
                />
                <Button
                    onClick={handleRegister}
                    disableRipple
                    variant='contained'
                    color='secondary'
                    sx={{ width: '30%', mb: 1 }}
                >
                    Register
                </Button>
                <Button disableRipple color="secondary" onClick={handleLoginClick}>
                    <Typography fontSize={14} sx={{ textTransform: "none" }}>
                        Already have an account?
                        Sign In
                    </Typography>
                </Button>
                {errorMessage &&
                    <Typography color='error' sx={{ mt: 5 }}>
                        {errorMessage}
                    </Typography>
                }
            </Paper>
        </Container>
    );
};

export default RegisterPage;
