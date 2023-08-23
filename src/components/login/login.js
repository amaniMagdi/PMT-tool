import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Login() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            console.log("user is authorized")
            navigate("/");
        }
    }, []);
        const [openRegister, setOpenRegister] = React.useState(false);
        const [alert, setAlert] = React.useState("");
        const [registerAlert, setRegisterAlert] = React.useState("");
        const [registerParams, setRegisterParams] = React.useState({
            username: "", password: "", password2: ""
        });
        const [isLoading, setIsLoading] = React.useState({
            loginLoading: false, registerLoading: false
        });
        const navigate = useNavigate();

        const {
            username, password, password2
        } = registerParams
        const {
            loginLoading, registerLoading
        } = isLoading


       
    const handleChange = (event) => {
        setRegisterParams({ ...registerParams, [event.target.name]: event.target.value });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setAlert(false);
        const data = new FormData(event.currentTarget);
        if (data.get('username') === '' || data.get('password') === '') {
            setAlert("All fields are required!")
            return;
        }
        let username = data.get('username');
        let password = data.get('password');
        setIsLoading({ ...isLoading, loginLoading: true });
        axios.post("http://localhost:8000/api/token/", { username, password }).then(res => {
            setIsLoading({ ...isLoading, loginLoading: false });
            window.localStorage.setItem("token", res.data.access);
            navigate("/");
        }).catch(err => {
            setIsLoading({ ...isLoading, loginLoading: false });
            if (err.request.status === 401) {
                setAlert("Wrong Username or Password!")
            }
            else {
                setAlert("Login Error!")
            }
        });
    }

    const handleRegister = (event) => {
        event.preventDefault();
        setRegisterAlert(false);
        if (username === '' || password === '' || password2 === '') {
            setRegisterAlert("All fields are required!")
            return;
        }
        if (password != password2) {
            setRegisterAlert("Password fields don't match!")
            return;
        }
        setIsLoading({ ...isLoading, registerLoading: true })
        axios.post("http://localhost:8000/users/", { username, password }).then(res => {
            setIsLoading({ ...isLoading, registerLoading: false });
            setRegisterAlert("Please enter your credentials and login!")
        }).catch(err => {
            setIsLoading({ ...isLoading, registerLoading: false });
            setRegisterAlert("Registeraton Error!")
        });

    };

    const handleClickOpen = () => {
        setOpenRegister(true);
        setAlert(false);
        setRegisterAlert(false);
    };

    const handleClose = () => {
        setOpenRegister(false);
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                {loginLoading || registerLoading ?
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box> : null}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        {alert ?
                            <Alert severity="error">{alert}</Alert>
                            : null}
                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleClickOpen}>
                                {"Don't have an account? Register"}
                            </Link>
                        </Grid>

                    </Box>
                </Box>
            </Container>
            <div>
                <Dialog open={openRegister} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Confirm Password"
                            type="password"
                            id="password2"
                            onChange={handleChange}
                        />
                        {registerAlert ?
                            <Alert severity="error">{registerAlert}</Alert>
                            : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleRegister}>Register</Button>
                    </DialogActions>
                </Dialog>
            </div></>

    )

}
