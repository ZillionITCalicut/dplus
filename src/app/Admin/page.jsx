"use client"
import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import BASE_URL from '../../../config';

const Admin = () => {
    const [defaultTheme] = useState(createTheme());
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Convert email to lowercase
        const lowercasedValue = name === 'email' ? value.toLowerCase() : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: lowercasedValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/Login-Project-SuperAdmin`, formData);
            const token = response.data.token;
            const userId = response.data.userId;

            sessionStorage.setItem('userId', userId);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('verify', token);
            sessionStorage.setItem('email', formData.email);

            sessionStorage.setItem('username', formData.email);
            window.location.href = '/Admin/Dashboard';
        } catch (error) {
            alert(error.response.data.message);
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    useEffect(() => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('id91');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('verify');
    }, []);
    return (
        <div>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)', backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900], backgroundSize: 'cover', backgroundPosition: 'center',
                        }} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <i className="fa-solid fa-lock"></i>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="validationCustom01">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />

                                </Form.Group>
                                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <div className="mt-2 mb-2 text-danger">
                                    {errorMessage}
                                </div>
                                <div className='btn btn-success w-100 mt-3' type="button" onClick={handleSubmit} variant="contained" sx={{ mt: 3, mb: 2 }} >
                                    Sign In
                                </div>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
};

export default Admin;
