import React, {useEffect, useState} from "react";
import {CircularProgress,} from "@mui/material";
import {defaultColDef, TableColumns} from "../../utils/constants";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {hooks} from "../../query";
import ActionsRenderer from "./ButtonAction";
import {DateEditor, TextEditor} from "../editors";

const CustomTable = () => {

    const {data: AllUsers, isLoading} = hooks.useAllUsers()
    const [gridApi, setGridApi] = useState(null);

    const frameworkComponents = {
        TextEditor,
        ActionsRenderer: ActionsRenderer,
        DateEditor
    };

    const onGridReady = (params) => {
        setGridApi(params.api);

        params.api.setRowData(AllUsers)
    }


    useEffect(() => {
        if (gridApi) {
            gridApi.setRowData(AllUsers)
        }
    }, [AllUsers,gridApi])

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <div style={{width: '100%', height: '100%', padding: '20px 20px 0px 20px'}}>
            <div
                id="myGrid"
                style={{
                    height: '100%',
                    width: '100%',
                }}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    columnDefs={TableColumns}
                    defaultColDef={defaultColDef}
                    getRowNodeId={data => data.id}
                    onGridReady={onGridReady}
                    frameworkComponents={frameworkComponents}
                    editType="fullRow"
                    suppressClickEdit
                    pagination={true}
                    paginationAutoPageSize={true}
                >
                </AgGridReact>
            </div>
        </div>
    )
}

export default CustomTable;