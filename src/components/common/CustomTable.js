import React, {useState} from "react";
import {
    Grid,
} from "@mui/material";
import {ColDef, TableColumns} from "../../utils/constants";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const CustomTable = () => {

    const rowData = [
        {
            "userId": "b7d77213-29c6-4edb-b8c8-35083b25b386",
            "firstName": "Abdallah",
            "lastName": "Chami",
            "phoneNumber": "71717171",
            "emailAddress": "abdallah.chami@lau.edu",
            "birthDate": "2007-05-02T19:58:47.1234567"
        },
        {
            "userId": "dbeea0d4-813b-4999-91e1-58f391196cdf",
            "firstName": "Marc",
            "lastName": "Maalouf",
            "phoneNumber": "71717171",
            "emailAddress": "marc.maalouf@lau.edu",
            "birthDate": "2007-05-02T19:58:47.1234567"
        }
    ]
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    // const [rowData, setRowData] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        console.log('grid is ready')
        console.log(params)
    }

    return (
        <Grid container style={{
            padding: '0px'
        }}>
            <Grid xs={12} sm={12} md={12} lg={12} item padding={1}>
                <div style={{
                    borderRadius: '2px',
                    padding: '8px',
                    height: '100%',
                    color: '#00614b',
                }}>
                    <div className="ag-theme-alpine">

                        <AgGridReact
                            autoGroupColumnDef={{
                                headerName: 'Group',
                                minWidth: 170,
                                field: 'athlete',
                                valueGetter: function (params) {
                                    if (params.node.group) {
                                        return params.node.key;
                                    } else {
                                        return params.data[params.colDef.field];
                                    }
                                },
                                headerCheckboxSelection: true,
                                cellRenderer: 'agGroupCellRenderer',
                                cellRendererParams: { checkbox: true },
                            }}
                            columnDefs={TableColumns}
                            groupSelectsChildren={true}
                            debug={true}
                            rowSelection={'multiple'}
                            rowGroupPanelShow={'always'}
                            pivotPanelShow={'always'}
                            enableRangeSelection={true}
                            paginationPageSize={10}
                            domLayout="autoHeight"
                            onGridReady={onGridReady}
                            rowData={rowData}
                            defaultColDef={ColDef}
                            paginationAutoPageSize={true}
                            pagination={true}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default CustomTable;