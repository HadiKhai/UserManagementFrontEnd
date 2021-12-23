import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useComponentWillMount} from "../../utils/helper";
import {useMutation} from "../../query";
import {USER_DELETE, USER_UPDATE} from "../../query/config/keys";

export default (props) => {
    const [editing, setEditing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [beforeEdit, setBeforeEdit] = useState();
    const [edited, setEdited] = useState(false)

    const mutation = useMutation(USER_DELETE)
    const mutationEdit = useMutation(USER_UPDATE)

    useComponentWillMount(() => {
        let editingCells = props.api.getEditingCells();
        if (editingCells.length !== 0) {
            setDisabled(true);
        }
    })

    useEffect(() => {
        props.api.addEventListener('rowEditingStarted', onRowEditingStarted);
        props.api.addEventListener('rowEditingStopped', onRowEditingStopped);

        return () => {
            props.api.removeEventListener('rowEditingStarted', onRowEditingStarted);
            props.api.removeEventListener('rowEditingStopped', onRowEditingStopped);
        };
    }, []);

    const onRowEditingStarted = (params) => {
        if (props.node === params.node) {
            setEditing(true);
        } else {
            setDisabled(true);
        }
    };

    const onRowEditingStopped = (params) => {
        if (props.node === params.node) {
            if (isEmptyRow(params.data)) {
                deleteRow(true);
            } else {
                setEditing(false);
            }
        } else {
            setDisabled(false);
        }
    }

    const startEditing = () => {
        setBeforeEdit(props.data)
        props.api.startEditingCell({
            rowIndex: props.rowIndex,
            colKey: props.column.colId
        });
    }

    const updateRow = () => {
        console.log(props.data)
        mutationEdit.mutate(
            props.data
        )
        props.api.stopEditing(false);
    }


    const cancelEditing = () => {
        props.api.stopEditing(true)
        setEdited(false)
    }

    const deleteRow = (force = false) => {
        let confirm = true;
        if (!force) {
            confirm = window.confirm(`are you sure you want to delete this row?`)
        }
        if (confirm) {
            mutation.mutate({id: props.data.userId})
            // props.api.updateRowData({ remove: [data] });
            // props.api.refreshCells({ force: true });
        }
    };

    const isEmptyRow = (data) => {
        let dataCopy = {...data};
        delete dataCopy.id;
        return !Object.values(dataCopy).some(value => value);
    }


    return (
        <div>
            {editing
                ? <>
                    <Button onClick={updateRow} variant="outlined" style={{marginRight: '10px'}} color="primary"
                            disabled={disabled}>Update</Button>
                    <Button onClick={cancelEditing} variant="contained" color="error"
                            disabled={disabled}>Cancel</Button>

                </>
                : <>
                    <Button onClick={startEditing} variant="outlined" style={{marginRight: '10px'}} color="primary"
                            disabled={disabled}>Edit</Button>
                    <Button onClick={deleteRow} variant="contained" color="error" disabled={disabled}>Delete</Button>
                </>
            }
        </div>
    )
}
