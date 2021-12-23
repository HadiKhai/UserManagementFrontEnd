import React, {useState} from "react";
import {
    Box,
    Button,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField
} from "@mui/material";
import CustomTable from "../common/CustomTable";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import DateAdapter from '@mui/lab/AdapterMoment';
import {EMAIL_ADDRESS, FIRST_NAME, LAST_NAME, PHONE_NUMBER} from "../../utils/constants";
import {useMutation} from "react-query";
import {USER_CREATE} from "../../query/config/keys";
import moment from "moment";

const Dashboard = () => {
    const mutation = useMutation(USER_CREATE);
    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = React.useState(moment().format());

    const handleChange = (newValue) => {
        setBirthDate(newValue);

    };

    const handleFieldChange = (newValue, type) => {
        const {target: {value}} = newValue
        switch (type) {
            case FIRST_NAME:
                setFirstName(value)
                break;
            case LAST_NAME:
                setLastName(value)
                break;
            case EMAIL_ADDRESS:
                setEmailAddress(value)
                break;
            case PHONE_NUMBER:
                setPhoneNumber(value)
                break;
            default:
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        mutation.mutate(
            {
                firstName,
                lastName,
                phoneNumber,
                emailAddress,
                birthDate
            }
        )
        setEmailAddress('')
        setLastName('')
        setFirstName('')
        setBirthDate(Date.now())
        setPhoneNumber('')
        setOpen(false)
    }


    return (

        <Box sx={{display: 'flex', flexDirection: 'column', height: 'calc( 100vh - 40px - 64px)', padding: '20px'}}>
            <CssBaseline/>
            <CustomTable/>
            <div style={{
                height: '50px',
                margin: '0px 20px 20px 20px',
                padding: '10px',
                display: 'flex',
                placeContent: 'end',
                backgroundColor: '#ffffff'
            }}>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill the fields bellow
                    </DialogContentText>
                    <Grid container>
                        <Grid item xs={6} paddingRight={1}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="fname"
                                label="First Name"
                                type="string"
                                value={firstName}
                                onChange={(newValue) => handleFieldChange(newValue, FIRST_NAME)}
                                fullWidth
                                variant="standard"
                                style={{
                                    marginRight: '5px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} paddingLeft={1}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="lname"
                                value={lastName}
                                onChange={(newValue) => handleFieldChange(newValue, LAST_NAME)}
                                label="Last Name"
                                type="string"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="emadd"
                                value={emailAddress}
                                onChange={(newValue) => handleFieldChange(newValue, EMAIL_ADDRESS)}
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="emadd"
                                value={phoneNumber}
                                onChange={(newValue) => handleFieldChange(newValue, PHONE_NUMBER)}
                                label="Phone Number"
                                type="int"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MMMM Do YYYY"
                                    value={birthDate}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField

                                        fullWidth
                                        variant="standard"
                                        {...params} />}
                                />
                            </LocalizationProvider>

                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!firstName || !lastName || !phoneNumber || !birthDate || !emailAddress}
                    >Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>

    )
}

export default Dashboard;