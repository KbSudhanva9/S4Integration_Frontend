import React, { useEffect, useState } from 'react'
import './Create.css'
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { RiShare2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdOutlineCopyAll } from "react-icons/md";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import api from '../../../Utils/ApiCalls/Api';
// import api from '../../../Utils/ApiCalls/Api';

const Create = () => {

    // const data = [
    //     { id: 1, costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
    // ]

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 100 },
    //     { field: 'costcenter', headerName: 'Cost Center', width: 130 },
    //     { field: 'expense', headerName: 'Expense', width: 130 },
    //     { field: 'currency', headerName: 'Currency', width: 130 },
    //     { field: 'amount', headerName: 'Amount', width: 130 },
    //     { field: 'requested', headerName: 'Requested', width: 130 },
    // ];

    const [tdata, setTData] = useState([]);                 //table data
    const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    // const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    // const [id, setId] = useState(1);                        //auto increment for id in tdata
    // const [formData, setFormData] = useState([]);           //pop-up table row data
    // const [openAddExpense, setOpenAddExpense] = useState(false);    //pop-up open/close
    // const [errors, setErrors] = useState([]);               //handeling pop-up error
    // const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar

    // const [cocode, setcocode] = useState([]);
    // const [costce, setcostce] = useState([]);

    // on selecting or un-selecting the rows in table live change
    const handleSelectionChange = (selection) => {
        setSubmitExp(selection);
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        // console.log(selectedData);
        // setSRows(selectedData);
    };

    // open add expense pop-up
    const handleClickOpenExpense = () => {
        setFormData([]);
        setOpenAddExpense(true);
    };


    const columns = [
        {
            field: 'Material',
            headerName: 'Material',
            width: 170,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'Quantity',
            headerName: 'Qty',
            width: 90,
            renderCell: (params) => (
                <TextField
                    type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        // calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'Uom',
            headerName: 'UOM',
            width: 110,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {uom.length > 0 ? (
                        uom.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value} ({option.label})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
            ),
        },
    ];

    const handleAddRow = () => {
        const newRow = {
            id: tdata.length + 1, // Ensure unique ID for each row
            Material: "",
            Quantity: "",
            Uom: "",
        };
        setTData([...tdata, newRow]);
    };

    const handleCellChange = (e, params) => {
        const updatedLineItems = [...tdata];
        const index = updatedLineItems.findIndex(item => item.id === params.id);
        if (index !== -1) {
            updatedLineItems[index][params.field] = e.target.value;
            setTData(updatedLineItems);
        }
    };

    //delete the selected row in tdata in main table
    const deleteSelected = () => {
        const remainingData = tdata.filter(row => !submitExp.includes(row.id));
        setTData(remainingData);
        setSubmitExp([]);
        console.log(remainingData);
    };

    const submitExpense = () => {

        const cleanedLineItems = tdata.map(({ id, ...rest }) => rest);

        console.log(cleanedLineItems);
    }

    const getCalling = async (url) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            // if (url.includes('costCenter')) {
            //     console.log(response);
            //     console.log(response.data.data);
            //     setcostce(response.data.data);
            // } else if (url.includes('cmpCodes')) {
            //     console.log(response.data.data);
            //     setcocode(response.data.data);
            // }
        } catch (error) {
            console.error('unable to get the response', error);
        }
    };

    const uom = [
        { value: '%', label: 'Percentage' },
        { value: 'D', label: 'Day' },
    ]

    // useEffect(() => {
    //     handleCostCenter();
    //     handleCompanyCode();
    // }, [])

    return (
        <div className='maincomponent'>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Customer Number</p>
                    <TextField
                        id="companycode"
                        // select
                        size='small'
                        style={{ width: '221px' }}
                    >
                        {/* {cocode.length > 0 ? (
                            cocode.map((option) => (
                                <MenuItem key={option.code} value={option.code}>
                                    {option.code} ({option.companyText})
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No options available</MenuItem>
                        )} */}
                    </TextField>
                </div>
                <div className='basic-margin'>
                    <p>Customer Name</p>
                    <TextField size='small' />
                </div>
                <div className='basic-margin'>
                    <p>Date</p>
                    <input className='date' type='date' style={{ width: '221px' }} />
                </div>
            </div>
            {/* <div className='df'>
                <div className='basic-margin'>
                    <p>Refrence Number</p>
                    <TextField size='small' />
                </div>
                <div className='basic-margin'>
                    <p>Document Header Text</p>
                    <TextField size='small' />
                </div>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlinePostAdd />} onClick={handleAddRow}>Add</Button>
                {/* <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineCopyAll />} color='warning' onClick={copySeletedRowsIds}>Copy</Button> */}
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineDeleteOutline />} color="error" onClick={deleteSelected}>Delete</Button>
            </div>
            {/* table */}
            <div style={{ marginTop: '10px' }}>
                <div style={{ height: 400, width: '100%' }}>
                    {/* table data from use state automatically updated from usestate => tdata */}
                    <DataGrid
                        rows={tdata}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                </div>
            </div>
            {/* table */}
            <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<RiShare2Fill />} onClick={submitExpense}>Submit Expense</Button>
            </div>
        </div>
    );
}

export default Create;