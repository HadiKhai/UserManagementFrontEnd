import moment from "moment";


export const TableColumns = [
    {
        headerName: "Id",
        field: "userId",
        editable: false,
        width: 100
    },
    {headerName: "First Name", field: "firstName", cellEditor: "TextEditor", width: 150},
    {headerName: "Last Name", field: "lastName", cellEditor: "TextEditor", width:150},
    {headerName: "Phone Number", field: "phoneNumber", cellEditor: "TextEditor"},
    {headerName: "Email", field: "emailAddress", cellEditor: "TextEditor"},
    {
        headerName: "Birthdate", field: "birthDate",
        cellEditor: "DateEditor",
        filter: "agDateColumnFilter",
        cellRenderer: (data) => {
            return moment(data.value).format('MMMM Do YYYY')
        },
        filterParams: {
            clearButton: true,
            suppressAndOrCondition: true,
            comparator: (filterLocalDateAtMidnight, cellValue) => {
                const dateAsString = cellValue.slice(0, 10);
                const dateParts = dateAsString.split("-");
                var cellDate = new Date(
                    Number(dateParts[0]),
                    Number(dateParts[1]) - 1,
                    Number(dateParts[2])
                );
                if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                    return 0;
                }
                if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                }
                if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                }
            }
        }
    },
    {
        headerName: "Actions",
        colId: "actions",
        cellRenderer: "ActionsRenderer",
        editable: false,
        filter: false,
        minWidth: 220
    }
]


export const defaultColDef = {
    editable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
    sortable: true,
    suppressKeyboardEvent: params => params.editing
};

export const EMAIL_ADDRESS = "EMAIL_ADDRESS"
export const FIRST_NAME = "FIRST_NAME"
export const LAST_NAME = "LAST_NAME"
export const PHONE_NUMBER = "PHONE_NUMBER"
