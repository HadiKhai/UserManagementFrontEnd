import moment from "moment";


export const TableColumns = [
    { headerName: "Id", field: "userId", filter: "agTextColumnFilter" },
    { headerName: "First Name", field: "firstName", filter: "agTextColumnFilter" },
    { headerName: "Last Name", field: "lastName", filter: "agTextColumnFilter" },
    { headerName: "Phone Number", field: "phoneNumber", filter: "agTextColumnFilter" },
    { headerName: "Email", field: "emailAddress", filter: "agTextColumnFilter" },
    { headerName: "Birthdate", field: "birthDate", filter: "agDateColumnFilter",cellRenderer: (data) => {
            return moment(data).format('MMMM Do YYYY')
        } },
]

export const ColDef = {
    editable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
}
