import React, {forwardRef, useImperativeHandle, useState} from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import moment from "moment";
import {TextField} from "@mui/material";


export default forwardRef((props, ref) => {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleDateChange(d) {
        console.log(d)
        setSelectedDate(d);
    }


    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                let dateString = null;
                if (selectedDate) {
                    dateString = moment(selectedDate, 'MMMM Do YYYY');
                }
                return dateString;
            },
            isCancelAfterEnd: () => {
                return !selectedDate;
            },
            afterGuiAttached: () => {
                if (!props.value) {
                    return;
                }
                const dateAsString = props.value.slice(0, 10);
                const dateParts = dateAsString.split("-");
                var cellDate = new Date(
                    Number(dateParts[0]),
                    Number(dateParts[1]) - 1,
                    Number(dateParts[2])
                );
                console.log(cellDate,dateAsString)
                setSelectedDate(cellDate);
            }
        };
    });

    return (
        <div style={{padding: '5px'}}>
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                    label=""
                    inputFormat="MMMM Do YYYY"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField

                        fullWidth
                        variant="standard"
                        {...params} />}
                />
            </LocalizationProvider></div>
    )
});
