import React from 'react';
import {AppBar, Box, FormControl, Toolbar, Typography,} from "@mui/material";
import InfoCubedLogo from '../../assets/info3Logo1.jpeg';
import './Main.css';
import styled from "@emotion/styled";

export const CustomFormControl = styled(FormControl)({
    '& .MuiFilledInput-root': {
        borderRadius: '20px !important',
    },
    '& .MuiSelect-select':{
        padding: '8px !important'
    },
    '& .MuiFilledInput-underline:before': {
        borderBottom: 'none !important',
    },
    '& .MuiFilledInput-underline:after': {
        borderBottom: 'none !important',
    },
});

const Main = ({children}) => {

    return (
        <Box>
            <AppBar position="sticky" className="header">
                <Toolbar sx={{paddingLeft: '0 !important'}}>
                    <img className={"logo"} src={InfoCubedLogo} height={40} alt="logo"
                          style={{pointerEvents: "all", cursor: 'pointer'}}/>
                </Toolbar>
            </AppBar>
            <div style={{
                backgroundColor:"rgba(47, 119, 142, 1);"
            }}>
            {children}
            </div>
            <footer>
                <Typography variant="body1">
                    UserManagement CRUD by HadiKhairallah
                </Typography>
            </footer>
        </Box>
    )
}

export default Main;
