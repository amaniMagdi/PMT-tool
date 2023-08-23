import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'

export default function Profiles() {
    const [rows, setRows] = React.useState([]);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [profileParams, setProfileParams] = React.useState({
        id: "", name: "", phone: "", pop_name: "", speed: "", frame: "", dslam_hostname: "", attainable_speed: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/profiles/")
            .then((res) => {
                setRows(res.data)
            })
            .catch((err) => {
                console.log(err.request.status)
            });
    }, []);

    const {
        id, name, phone, pop_name, speed, frame, dslam_hostname, attainable_speed
    } = profileParams
    const handleCreateOpen = () => {
        setOpenCreate(true)
    }
    const handleUpdateOpen = (profile) => {
        setProfileParams({
            id: profile.id,
            name: profile.name,
            phone: profile.phone,
            pop_name: profile.pop_name,
            speed: profile.speed,
            frame: profile.frame,
            dslam_hostname: profile.dslam_hostname,
            attainable_speed: profile.attainable_speed
        })
        setOpenUpdate(true)
    }
    const handleClose = () => {
        setOpenCreate(false)
        setOpenUpdate(false)
        setProfileParams({
            id: "", name: "", phone: "", pop_name: "", speed: "", frame: "", dslam_hostname: "", attainable_speed: ""
        })
    }
    const handleChange = (event) => {
        setProfileParams({ ...profileParams, [event.target.name]: event.target.value });
    }
    const handleCreate = () => {
        console.log("create...")
        axios.post("http://localhost:8000/profiles/", { name, phone, pop_name, speed, frame, dslam_hostname, attainable_speed }).then(res => {
            setOpenCreate(false)
        }).catch(err => {
            console.log(err)
        });
    }
    const handleUpdate = () => {
        console.log("update...", id)
        axios.put(`http://localhost:8000/profiles/${id}/`, { name, phone, pop_name, speed, frame, dslam_hostname, attainable_speed }).then(res => {
            setOpenUpdate(false)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleDelete = (profile_id) => {
        console.log("delete...", profile_id)
        axios.delete(`http://localhost:8000/profiles/${profile_id}/`).then(res => {
        }).catch(err => {
            console.log(err)
        })
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log("logout...")
        navigate("/login/");
    }
    return (
        localStorage.getItem('token') ?
            <>
                <Button
                    type="submit"
                    onClick={handleLogout}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Logout
                </Button>
                <hr />
                <Button
                    type="submit"
                    onClick={handleCreateOpen}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Create Profile
                </Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">POP Name</TableCell>
                                <TableCell align="right">Speed</TableCell>
                                <TableCell align="right">Frame</TableCell>
                                <TableCell align="right">DSLAM Hostname</TableCell>
                                <TableCell align="right">Attainable Speed</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.pop_name}</TableCell>
                                    <TableCell align="right">{row.speed}</TableCell>
                                    <TableCell align="right">{row.frame}</TableCell>
                                    <TableCell align="right">{row.dslam_hostname}</TableCell>
                                    <TableCell align="right">{row.attainable_speed}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="outlined" size="small" onClick={() => handleUpdateOpen(row)}>
                                            Update
                                        </Button>
                                        <Button variant="outlined" size="small" onClick={() => handleDelete((row.id))}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*Create Dialog */}
                <Dialog open={openCreate} onClose={handleClose}>
                    <DialogTitle>Create</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pop_name"
                            label="POP Name"
                            name="pop_name"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="speed"
                            label="Speed"
                            name="speed"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="frame"
                            label="Frame"
                            name="frame"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dslam_hostname"
                            label="dslam hostname"
                            name="dslam_hostname"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="attainable_speed"
                            label="attainable speed"
                            name="attainable_speed"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleCreate}>Create</Button>
                    </DialogActions>
                </Dialog>
                {/*Update Dialog */}
                <Dialog open={openUpdate} onClose={handleClose}>
                    <DialogTitle>Update</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pop_name"
                            label="POP Name"
                            name="pop_name"
                            value={pop_name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="speed"
                            label="Speed"
                            name="speed"
                            value={speed}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="frame"
                            label="Frame"
                            name="frame"
                            value={frame}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dslam_hostname"
                            label="dslam hostname"
                            name="dslam_hostname"
                            value={dslam_hostname}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="attainable_speed"
                            label="attainable speed"
                            name="attainable_speed"
                            value={attainable_speed}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleUpdate}>Update</Button>
                    </DialogActions>
                </Dialog>
            </> : <Navigate to="/login/" replace />)
}


