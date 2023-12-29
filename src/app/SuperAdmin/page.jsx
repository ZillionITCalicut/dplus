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
import BASE_URL from '../../../config';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const SuperAdmin = () => {
    const [defaultTheme] = useState(createTheme());
    const [errorMessage, setErrorMessage] = useState('');


    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        /* console.log(formData); */

        try {
            const response = await axios.post(`${BASE_URL}/SuperAdminLogin`, formData);
            const token = response.data.token;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('verify', token);
            sessionStorage.setItem('username', formData.username);
            console.log(response.data);
            window.location.href = '/SuperAdmin/Dashboard/home';
        } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message)
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };
    useEffect(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('verify');
        localStorage.removeItem('verify');
        sessionStorage.removeItem('username');
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
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={formData.username}
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

export default SuperAdmin;
