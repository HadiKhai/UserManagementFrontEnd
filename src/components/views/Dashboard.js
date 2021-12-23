import React from "react";
import {Box, CssBaseline} from "@mui/material";
import CustomTable from "../common/CustomTable";

const Dashboard = () => {
    return (

        <Box sx={{display: 'flex',  height:'calc( 100vh - 50px - 64px)'}}>
            <CssBaseline/>
            <CustomTable/>
        </Box>
    )
}

export default Dashboard;